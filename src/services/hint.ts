import { UserClient } from 'utils/api';

export const GET_HINT = ['hint'];

export const getHintList = (id: number) =>
  UserClient.get<GetHintRes>(`/v1/hint/sheet/${id}`);

export const buyHint = (id: number) =>
  UserClient.post<IHint>(`/v1/hint/sheet/${id}`);

interface GetHintRes {
  user_sheet_hint_infos: IHint[];
}

interface IHint {
  id: number;
  hint: string;
  point: number;
  image: string;
  has_history: boolean;
}
