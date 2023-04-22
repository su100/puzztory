import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import SearchInput from 'components/SearchInput';
import StoryCard from 'components/StoryCard';

import {
  getStoryList,
  GET_STORY_LIST,
  GET_POPULAR_STORY_LIST,
  getPopularStoryList,
} from 'services/story';
import StoryList from './components/StoryList';
import PopularStoryList from './components/PopularStoryList';

const STALE_TIME = 5 * 1000;

function MainPage() {
  const { data: allStory } = useQuery(GET_STORY_LIST, () => getStoryList(), {
    staleTime: STALE_TIME,
  });

  return (
    <>
      <div className="h-[15rem] md:h-[20rem] bg-sky-600">캐러셀</div>
      <div className="p-4">
        <SearchInput />
        <PopularStoryList />
        <StoryList
          title="전체 Puzzle"
          stories={allStory?.stories}
          link="/story"
        />
      </div>
    </>
  );
}

export default MainPage;
