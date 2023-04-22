import { Link } from 'react-router-dom';
import { IStory } from 'services/story';
import defaultImg from 'assets/img/default.png';

interface StoryCardProps {
  story: IStory;
}

function StoryCard({ story }: StoryCardProps) {
  return (
    <Link to={`/story/${story.id}`} className="flex align-center gap-2">
      <img
        className="rounded-[5px]"
        src={story.image || defaultImg}
        width="64"
        height="64"
        alt={`${story.title} 썸네일`}
      />
      <div className="w-[calc(100%-64px)]">
        <h3 className="font-bold text-sm ellipsis">{story.title}</h3>
        <p className="text-xs multi-ellipsis line-clamp-3">
          {story.description}
        </p>
      </div>
    </Link>
  );
}

export default StoryCard;
