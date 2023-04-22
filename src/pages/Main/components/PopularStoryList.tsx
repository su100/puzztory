import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { GET_POPULAR_STORY_LIST, getPopularStoryList } from 'services/story';
import defaultImg from 'assets/img/default.png';

function PopularStoryList() {
  const { data } = useQuery(GET_POPULAR_STORY_LIST, getPopularStoryList);

  return (
    <div className="mb-6">
      <h2 className="font-extrabold text-lg my-2 flex justify-between items-end">
        인기 Puzzle
      </h2>
      <ul className="flex gap-4 overflow-x-auto flex-nowrap scrollbar">
        {data?.popular_stories?.map((s) => (
          <li key={s.title} className="min-w-[120px] rounded-md">
            <Link to={`/story/${s.story_id}`}>
              <img
                width="120"
                height="120"
                src={s.image || defaultImg}
                alt={`${s.story_id} 썸네일`}
              />
              <h3 className="mt-1 text-center text-sm font-bold ellipsis">
                {s.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularStoryList;
