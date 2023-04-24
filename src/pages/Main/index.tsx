import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import SearchInput from 'components/SearchInput';
import StoryList from './components/StoryList';
import PopularStoryList from './components/PopularStoryList';

import { getStoryList, GET_STORY_LIST } from 'services/story';

const STALE_TIME = 5 * 1000;

function MainPage() {
  const { data: allStory, isLoading } = useQuery(
    GET_STORY_LIST,
    () => getStoryList(),
    {
      staleTime: STALE_TIME,
    },
  );

  return (
    <>
      <div className="h-[15rem] md:h-[20rem] bg-sky-600">캐러셀</div>
      <div className="p-4">
        <SearchInput />
        <PopularStoryList />
        <StoryList
          isLoading={isLoading}
          title="전체 Puzzle"
          stories={allStory?.stories}
          link="/story"
        />
      </div>
    </>
  );
}

export default MainPage;
