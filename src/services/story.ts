import { UserClient } from 'utils/api';

export const GET_STORY_LIST = ['story'];

export const getStoryList = (data?: GetStroyListReq) =>
  UserClient.get<GetStroyListRes>(`/v1/story/`, data);

export const getStory = (id: number) =>
  UserClient.get<IStoryDetail>(`/v1/story/${id}`);

export const likeStory = (id: number) =>
  UserClient.post(`/v1/story/${id}/like`);

export const unlikeStory = (id: number) =>
  UserClient.delete(`/v1/story/${id}/like`);

interface GetStroyListReq {
  search?: string;
  page?: number;
  size?: number;
}

interface GetStroyListRes {
  stories: IStory[];
}

export interface IStory {
  id: number;
  title: string;
  description: string;
  image: string;
  background_image: string;
}

interface IStoryDetail extends IStory {
  played_count: number;
  like_count: number;
  review_rate: number;
  playing_point: number;
  free_to_play_sheet_count: number;
  level: '상' | '중' | '하' | '?';
  is_liked: boolean;
}
