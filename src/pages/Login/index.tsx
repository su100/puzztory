import { useEffect, FormEvent, useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import Input from 'components/Input';
import { login, LoginErrRes, LoginRes } from 'services/auth';

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
  const navigate = useNavigate();

  const { mutate: loginUser } = useMutation(login, {
    onSuccess: (res: LoginRes) => {
      // TODO: 이전 페이지 이동
      // TODO: accessToken 로그인 처리
      console.log(res.accessToken);
      navigate('/');
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
    <div>
      <h1 className="m-10 text-xl">로그인</h1>
      <form className="flex flex-col m-10 gap-2" onSubmit={handleSubmit}>
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
        <input className="w-20 bg-slate-600" type="submit" value="로그인" />
      </form>
    </div>
  );
}

export default LoginPage;
