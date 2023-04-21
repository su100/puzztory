import SearchInput from 'components/SearchInput';
import StoryCard from 'components/StoryCard';
import { useInfiniteQuery } from 'react-query';
import { getStoryList, GET_STORY_LIST } from 'services/story';

function MainPage() {
  const { data } = useInfiniteQuery(GET_STORY_LIST, () => getStoryList());

  return (
    <>
      <div className="h-[15rem] md:h-[20rem] bg-sky-600">캐러셀</div>
      <div className="p-4">
        <SearchInput />
        <h2 className="font-bold text-lg my-2">전체 Puzzle</h2>
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
