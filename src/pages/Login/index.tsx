import { useEffect, FormEvent, useState, ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useAuthStore } from 'utils/auth';
import Input from 'components/Input';
import { requestLogin, LoginErrRes, LoginRes } from 'services/auth';

interface LoginStateType {
  username: string;
  password: string;
}

function LoginPage() {
  const [state, setState] = useState<LoginStateType>({
    username: '',
    password: '',
  });
  const location = useLocation();
  const locationState = location.state;
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { mutate: loginUser } = useMutation(requestLogin, {
    onSuccess: (res: LoginRes) => {
      // TODO: 이전 페이지 이동
      // TODO: accessToken 로그인 처리
      login(res.accessToken);
      navigate(locationState?.redirectPath || '/', { replace: true });
    },
    onError: (e: AxiosError<LoginErrRes>) => {
      console.log('error:', e);
      alert(e.response?.data.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = state;
    if (username && password) {
      loginUser(state);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    if (!type) return;
  }, [location]);

  return (
    <div className="m-10 flex flex-col gap-4">
      <h1 className="text-xl">로그인</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="아이디"
        />
        <Input
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="비밀번호"
        />
        <button className="button mt-3 bg-slate-300" type="submit">
          로그인
        </button>
      </form>
      <Link to="/signup" className="link-button bg-slate-400">
        회원가입
      </Link>
    </div>
  );
}

export default LoginPage;
