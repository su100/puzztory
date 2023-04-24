import { Link } from 'react-router-dom';
import StoryCard from 'components/StoryCard';
import { IStory } from 'services/story';
import SkeletonStoryList from 'components/skeleton/SkeletonStoryList';

interface StoryListProps {
  title: string;
  stories?: IStory[];
  isLoading?: boolean;
  link: string;
}

function StoryList({ title, stories, isLoading, link }: StoryListProps) {
  return (
    <>
      <h2 className="font-extrabold text-lg my-2 flex justify-between items-baseline">
        {title}
        <Link
          to={link}
          className="text-right text-neutral-400 underline text-sm"
        >
          더보기 &gt;
        </Link>
      </h2>
      {isLoading ? (
        <SkeletonStoryList />
      ) : (
        <ul className="flex flex-col gap-4">
          {stories?.map((s) => (
            <li key={s.id}>
              <StoryCard story={s} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default StoryList;
