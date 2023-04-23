import { useEffect, FormEvent, useState, ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useAuthStore } from 'utils/auth';
import Input from 'components/Input';

import { requestLogin, LoginErrRes, LoginRes } from 'services/auth';
import kakaoIcon from 'assets/img/login/kakao.svg';
import naverIcon from 'assets/img/login/naver.png';

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
    <div className="px-7 mx-auto max-w-[600px] flex flex-col gap-3 pt-[50px]">
      <h1 className="title">로그인</h1>
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
      <h2 className="center-line mt-5 text-neutral-400 text-center">
        <span className="center-line-text ">소셜 로그인</span>
      </h2>
      <div className="flex flex-row flex-wrap gap-2">
        <button className="kakao-color login-btn">
          <img src={kakaoIcon} width="56" height="56" alt="카카오" />
          <span className="login-btn-text">카카오 로그인</span>
        </button>
        <button className="naver-color login-btn">
          <img src={naverIcon} width="56" height="56" alt="네이버" />
          <span className="login-btn-text">네이버 로그인</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
