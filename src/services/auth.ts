import { ApiClient } from 'utils/api';

export const login = (data: LoginReq) =>
  ApiClient.post<LoginRes>('/account/login', data);

export const signUpValidate = (data: SignUpValidateReq) =>
  ApiClient.post<SignUpValidateRes>('/account/sign-up-validation', data);

export const signUpCheck = (data: SignUpCheckReq) =>
  ApiClient.post<SignUpCheckRes>('/account/sign-up-check', data);

export const signUpValidateToken = (data: SignUpValidateTokenReq) =>
  ApiClient.post<SignUpValidateTokenRes>(
    '/account/sign-up-validate-token',
    data,
  );

interface LoginReq {
  username: string;
  password: string;
}

interface LoginRes {
  accessToken: string;
}

export interface SignUpValidateReq {
  username: string;
  nickname: string;
  password1: string;
  password2: string;
  email: string;
}

type SignUpValidateRes = {
  [key in keyof SignUpValidateReq]: string[];
};

interface SignUpCheckReq extends Omit<SignUpValidateReq, 'password1'> {}

interface SignUpCheckRes {
  message: string;
}

export interface SignUpValidateTokenReq {
  email: string;
  one_time_token: string;
}

interface SignUpValidateTokenRes {
  message: string;
}
