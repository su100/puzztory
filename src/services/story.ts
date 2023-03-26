import { UserClient } from 'utils/api';

export const GET_STORY_LIST = ['story'];
export const GET_STORY_SHEET = ['story', 'sheet'];

export const getStoryList = (data?: GetStroyListReq) =>
  UserClient.get<GetStroyListRes>(`/v1/story/`, data);

export const getStory = (id: number) =>
  UserClient.get<IStoryDetail>(`/v1/story/${id}`);

export const likeStory = (id: number) =>
  UserClient.post(`/v1/story/${id}/like`);

export const unlikeStory = (id: number) =>
  UserClient.delete(`/v1/story/${id}/like`);

export const playStory = (id: number) =>
  UserClient.get<ISheet>(`/v1/story/${id}/play`);

export const getStorySheet = (id: number) =>
  UserClient.get<ISheet>(`/v1/story/sheet/${id}/play`);

export const submitSheetAnswer = (data: SubmitSheetAnswerReq) =>
  UserClient.post<SubmitSheetAnswerRes>(`/v1/story/submit_answer`, data);

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

// TODO: optional 체크, previous_sheet 인터페이스
export interface ISheet {
  sheet_id: number;
  title: string;
  question: string;
  image: string | null;
  background_image: string | null;
  previous_sheet_infos: IPreviousSheet[];
  next_sheet_id: number | null;
  answer: string | null;
  answer_reply: string | null;
  is_solved: boolean;
}

interface IPreviousSheet {
  sheet_id: number;
  title: string;
}

interface SubmitSheetAnswerReq {
  sheet_id: number;
  answer: string;
}

export interface SubmitSheetAnswerRes {
  is_valid: boolean;
  next_sheet_id: number | null;
  answer_reply: string | null;
}
