import { useMutation } from 'react-query';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Input from 'components/Input';
import {
  signUpCheck,
  signUpValidate,
  SignUpValidateErrRes,
  SignUpValidateReq,
  signUpValidateToken,
  SignUpValidateTokenReq,
} from 'services/auth';
import { MessageRes } from 'services/type';

interface FormStateType extends SignUpValidateReq, SignUpValidateTokenReq {}
function SignupPage() {
  const [formState, setFormState] = useState<FormStateType>({
    username: '',
    password1: '',
    password2: '',
    nickname: '',
    email: '',
    one_time_token: '',
  });
  const [formErrorState, setFormErrorState] = useState<SignUpValidateErrRes>();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { mutate: sendCode } = useMutation(signUpCheck, {
    onSuccess: () => {
      setIsChecked(true);
    },
    onError: () => console.log('error send code'),
  });

  const { mutate: validateForm } = useMutation(signUpValidate, {
    onSuccess: () => {
      const { password1, ...rest } = formState;
      setFormErrorState(undefined);
      sendCode(rest);
    },
    onError: (e: AxiosError<SignUpValidateErrRes>) => {
      console.log('error:', e);
      setFormErrorState(e.response?.data);
    },
  });

  const { mutate: validateToken } = useMutation(signUpValidateToken, {
    onSuccess: (res) => {
      alert(res.message);
      navigate('/login');
    },
    onError: (e: AxiosError<MessageRes>) => {
      alert(e.response?.data.message);
    },
  });

  const hasAllValue = useMemo(() => {
    const { one_time_token, ...form } = formState;
    return Object.values(form).every((v) => v !== '');
  }, [formState]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm(formState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const handleCodeSubmit = () => {
    const { email, one_time_token } = formState;
    if (!one_time_token) {
      alert('인증 번호를 입력해주세요.');
      return;
    }
    validateToken({ email, one_time_token });
  };

  return (
    <div className="w-[90%] max-w-[800px] mx-auto pt-[50px]">
      <h1 className="title">회원가입</h1>
      <form className="flex flex-col my-10 gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          onChange={handleInputChange}
          disabled={isChecked}
          placeholder="아이디"
          errorMsg={formErrorState?.username}
        />
        <Input
          type="password"
          name="password1"
          onChange={handleInputChange}
          disabled={isChecked}
          placeholder="비밀번호"
          errorMsg={formErrorState?.password1}
        />
        <Input
          type="password"
          name="password2"
          onChange={handleInputChange}
          disabled={isChecked}
          placeholder="비밀번호 확인"
          errorMsg={formErrorState?.password2}
        />
        <Input
          type="text"
          name="nickname"
          onChange={handleInputChange}
          disabled={isChecked}
          placeholder="닉네임"
          errorMsg={formErrorState?.nickname}
        />
        <Input
          type="text"
          name="email"
          onChange={handleInputChange}
          disabled={isChecked}
          placeholder="이메일"
          errorMsg={formErrorState?.email}
        />
        <input
          className={`rounded-[5px] p-2 border-2 border-solid border-slate-300 text-slate-400 ${
            !hasAllValue ? 'bg-slate-200' : ''
          }`}
          type="submit"
          disabled={!hasAllValue}
          value="이메일 인증번호 전송"
        />
      </form>
      {isChecked && (
        <>
          <Input
            type="text"
            name="one_time_token"
            onChange={handleInputChange}
            placeholder="인증번호"
          />
          <button
            className={`w-full rounded-[5px] p-2 border-2 border-solid border-slate-400 text-slate-400  mt-[10px] ${
              formState.one_time_token === '' ? 'bg-slate-200' : ''
            }`}
            disabled={formState.one_time_token === ''}
            onClick={handleCodeSubmit}
          >
            확인
          </button>
        </>
      )}
    </div>
  );
}

export default SignupPage;
