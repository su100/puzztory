import { Link } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import SearchInput from 'components/SearchInput';
import StoryCard from 'components/StoryCard';

import { getStoryList, GET_STORY_LIST } from 'services/story';

function MainPage() {
  const { data } = useInfiniteQuery(GET_STORY_LIST, () => getStoryList());

  return (
    <>
      <div className="h-[15rem] md:h-[20rem] bg-sky-600">캐러셀</div>
      <div className="p-4">
        <SearchInput />
        <h2 className="font-bold text-lg my-2 flex justify-between items-end">
          전체 Puzzle
          <Link
            to="/story"
            className="text-right text-neutral-400 underline text-sm"
          >
            더보기 &gt;
          </Link>
        </h2>
        <ul className="flex flex-col gap-4">
          {data?.pages.map((p) =>
            p.stories.map((s) => (
              <li key={s.id}>
                <StoryCard story={s} />
              </li>
            )),
          )}
        </ul>
      </div>
    </>
  );
}

export default MainPage;
