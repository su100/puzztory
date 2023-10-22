import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { GET_BANNER, getBannerList } from 'services/banner';

const STALE_TIME = 5 * 1000;

function Banner() {
  const { data } = useQuery(GET_BANNER, getBannerList, {
    staleTime: STALE_TIME,
  });

  return (
    <Swiper
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      onSlideChange={() => console.log('slide change')}
      onSwiper={() => console.log()}
    >
      {data?.banners.map((b) => (
        <SwiperSlide key={b.id}>
          {b.background_image && (
            <img
              className="m-auto h-full"
              src={b.background_image}
              alt={b.banner_type_name}
            />
          )}
          <h3 className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-3/4 tracking-wider rounded-md px-2 py-1 text-sm bg-[rgba(0,0,0,0.5)] text-white font-semibold">
            {b.banner_type_name}
          </h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
