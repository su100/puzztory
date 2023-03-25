import StoryCard from 'components/StoryCard';
import { useInfiniteQuery } from 'react-query';
import { getStoryList, GET_STORY_LIST } from 'services/story';

function MainPage() {
  const { data } = useInfiniteQuery(GET_STORY_LIST, () => getStoryList());

  return (
    <>
      <div className="h-[15rem] md:h-[20rem] bg-sky-600">캐러셀</div>
      <div className="p-4">
        <input
          className="px-2 py-1 w-[100%] rounded-lg border-gray-300 border"
          placeholder="검색어를 입력하세요(제목, 내용)"
        />
        <h2 className="font-bold text-lg my-2">전체 Puzzle</h2>
        {data?.pages.map((p) =>
          p.stories.map((s) => <StoryCard key={s.id} story={s} />),
        )}
      </div>
    </>
  );
}

export default MainPage;
