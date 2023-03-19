import { useMutation } from 'react-query';
import Input from 'components/Input';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  signUpCheck,
  signUpValidate,
  SignUpValidateReq,
  SignUpValidateTokenReq,
} from 'services/auth';
import { AxiosError } from 'axios';

interface FormStateType extends SignUpValidateReq, SignUpValidateTokenReq {}
type FormErrorStateType = {
  [K in keyof SignUpValidateReq]: SignUpValidateReq[K][];
};

function SignupPage() {
  const [formState, setFormState] = useState<FormStateType>({
    username: '',
    password1: '',
    password2: '',
    nickname: '',
    email: '',
    one_time_token: '',
  });
  const [formErrorState, setFormErrorState] = useState<FormErrorStateType>();
  const [isChecked, setIsChecked] = useState(false);

  const { mutate: sendCode } = useMutation(signUpCheck, {
    onSuccess: () => {
      setIsChecked(true);
    },
    onError: () => console.log('error send code'),
  });

  const { mutate: validateForm } = useMutation(signUpValidate, {
    onSuccess: () => {
      const { password1, ...rest } = formState;
      sendCode(rest);
    },
    onError: (e: AxiosError) => {
      console.log(e.code);
      // TODO: 에러 key에 따라 input에 error field 추가
      console.log('error');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit');
    e.preventDefault();
    validateForm(formState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  return (
    <div>
      <form
        className="flex flex-col mx-auto my-10 gap-4 max-w-[800px]"
        onSubmit={handleSubmit}
      >
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
          className="rounded-[5px] p-2 border-2 border-solid border-gray-300"
          type="submit"
          value="이메일 인증번호 전송"
        />
      </form>
      {isChecked && (
        <div>
          <Input
            type="text"
            name="one_time_token"
            onChange={handleInputChange}
            placeholder="인증번호"
          />
          <button>확인</button>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
