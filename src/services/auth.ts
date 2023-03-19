import { ApiClient } from 'utils/api';
import { MessageRes } from './type';

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

export interface LoginRes {
  accessToken: string;
}

export interface LoginErrRes extends MessageRes {}

export interface SignUpValidateReq {
  username: string;
  nickname: string;
  password1: string;
  password2: string;
  email: string;
}

export interface SignUpValidateRes {
  result: 'success';
}

export type SignUpValidateErrRes = {
  [key in keyof SignUpValidateReq]: string[];
};

interface SignUpCheckReq extends Omit<SignUpValidateReq, 'password1'> {}

interface SignUpCheckRes extends MessageRes {}

export interface SignUpValidateTokenReq {
  email: string;
  one_time_token: string;
}

export interface SignUpValidateTokenRes extends MessageRes {}
