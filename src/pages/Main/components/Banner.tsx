import { useQuery } from 'react-query';

import { GET_BANNER, getBannerList } from 'services/banner';

const STALE_TIME = 5 * 1000;

function Banner() {
  const { data } = useQuery(GET_BANNER, getBannerList, {
    staleTime: STALE_TIME,
  });

  return (
    <div className="h-[10rem] md:h-[20rem] bg-neutral-200">
      {data?.banners.map((b) => (
        <div
          key={b.id}
          className={`relative h-full md:h-[20rem] bg-[${
            b.background_color || '#fff'
          }]`}
        >
          {b.background_image && (
            <img
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
              src={b.background_image}
              alt={b.banner_type_name}
            />
          )}
          <h3 className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-3/4 tracking-wider rounded-md px-2 py-1 text-sm bg-[rgba(0,0,0,0.5)] text-white font-semibold">
            {b.banner_type_name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Banner;
