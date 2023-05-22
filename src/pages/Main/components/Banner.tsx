import { useQuery } from 'react-query';

import { GET_BANNER, getBannerList } from 'services/banner';

const STALE_TIME = 5 * 1000;

function Banner() {
  const { data } = useQuery(GET_BANNER, getBannerList, {
    staleTime: STALE_TIME,
  });
  return (
    <div className="h-[15rem] md:h-[20rem] bg-sky-600">
      {data?.banners.map((b) => (
        <div key={b.id}>{b.banner_type_name}</div>
      ))}
    </div>
  );
}

export default Banner;
