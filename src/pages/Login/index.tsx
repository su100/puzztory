import { useEffect, FormEvent, useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('제출');
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
        <input
          className="border w-40 border-neutral-500"
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="아이디"
        />
        <input
          className="border w-40 border-neutral-500 "
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
