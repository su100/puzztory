import { ApiClient } from 'utils/api';

export const GET_BANNER = ['banner'];

export const getBannerList = () =>
  ApiClient.get<GetBannerListRes>(`/v1/banner/`);

export const getBanner = (banner_id: number) =>
  ApiClient.get<IBannerDetail>(`/v1/banner`, { banner_id });

export interface GetBannerListRes {
  banners: IBanner[];
}

export interface IBanner {
  id: number;
  title: string;
  background_image: string;
  background_color: string;
  banner_type_name: string;
}

export interface IBannerDetail extends IBanner {
  description: string;
  created_at: string;
}
