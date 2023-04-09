import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import heartIcon from 'assets/img/heart.png';
import heartFullIcon from 'assets/img/heart-full.png';
import pointIcon from 'assets/img/point.png';
import {
  GET_STORY_LIST,
  getStory,
  likeStory as _likeStory,
  unlikeStory as _unlikeStory,
  solveStoryHistory,
} from 'services/story';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { MessageRes } from 'services/type';

const STALE_TIME = 5 * 1000;
const UP = 'up' as const;
const DOWN = 'down' as const;

type UpdateType = typeof UP | typeof DOWN;

function StoryDetailPage() {
  const location = useLocation();
  const { id } = useParams();

  const { data } = useQuery(
    [...GET_STORY_LIST, id],
    () => getStory(Number(id)),
    { staleTime: STALE_TIME, enabled: !!id },
  );

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { mutate: likeStory } = useMutation(() => _likeStory(Number(id)), {
    onSuccess: () => {
      alert('좋아요 성공');
      updateLike(UP);
    },
    onError: (e: AxiosError) => {
      console.log(e);
    },
  });

  const { mutate: unlikeStory } = useMutation(() => _unlikeStory(Number(id)), {
    onSuccess: () => {
      alert('좋아요 취소 성공');
      updateLike(DOWN);
    },
    onError: (e: AxiosError) => {
      console.log(e);
    },
  });

  const { mutate: removeStoryHistory } = useMutation(
    () => solveStoryHistory(Number(id)),
    {
      onSuccess: () => {
        alert('플레이 기록 초기화 성공');
      },
      onError: (e: AxiosError<MessageRes>) => {
        console.log(e);
        alert(e.response?.data.message);
      },
    },
  );

  const updateLike = (type: UpdateType) => {
    setLikeCount((s) => s + (type === UP ? 1 : -1));
    setIsLiked(type === UP);
  };

  useEffect(() => {
    if (data) {
      setLikeCount(data.like_count);
      setIsLiked(data.is_liked);
    }
  }, [data]);

  if (!data) return <></>;

  return (
    <div className="w-[100%]">
      <div className="bg-slate-400">
        {data.background_image && (
          <img
            className="mx-auto max-h-[300px]"
            src={data.background_image}
            alt={`${data.title} 배경 이미지`}
          />
        )}
      </div>
      <div className="p-3">
        <h1 className="my-3 font-bold">{data.title}</h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xs">플레이 수: {data.played_count}</span>
            <span className="mt-1 text-xs">난이도: {data.level}</span>
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-center">
              <img src={pointIcon} alt="point" />
              <span className="text-xs">{data.playing_point}p</span>
            </div>
            <div className="text-center">
              <button onClick={() => (isLiked ? unlikeStory : likeStory)()}>
                <img
                  src={isLiked ? heartFullIcon : heartIcon}
                  width="24"
                  height="24"
                />
              </button>
              <span className="text-xs block">{likeCount}</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs">{data.description}</p>
        {/* TODO: 말줄임 넣고 더보기 */}
        <Link
          to={`/story/${id}/play`}
          className="link-button mt-4 bg-slate-300"
        >
          플레이
        </Link>
        {'플레이한 적 있는지' && (
          <button className="button" onClick={() => removeStoryHistory()}>
            플레이 초기화
          </button>
        )}
      </div>
    </div>
  );
}

export default StoryDetailPage;
