import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StoryCard from 'components/StoryCard';
import { useInfiniteQuery } from 'react-query';
import SearchInput from 'components/SearchInput';

import { GET_STORY_LIST, getStoryList } from 'services/story';

const SIZE = 20;
const STALE_TIME = 5 * 1000;

function StoryListPage() {
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const search = qs.get('q');

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [...GET_STORY_LIST, search],
    ({ pageParam = 1 }) =>
      getStoryList({ search: search!, page: pageParam, size: SIZE }),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.stories.length < SIZE ? undefined : allPages.length + 1,
      staleTime: STALE_TIME,
    },
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <SearchInput />
      <h1 className="title">
        {search ? '&apos;{search}&apos; 검색 결과' : '전체 Puzzle'}
      </h1>
      {data?.pages.map((s) =>
        s.stories.map((story) => <StoryCard key={story.id} story={story} />),
      )}
      {hasNextPage && (
        <button
          className="button text-slate-500 border border-slate-400"
          onClick={() => fetchNextPage()}
        >
          더보기
        </button>
      )}
    </div>
  );
}

export default StoryListPage;
