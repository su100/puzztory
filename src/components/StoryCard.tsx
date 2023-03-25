import { Link } from 'react-router-dom';
import { IStory } from 'services/story';

interface StoryCardProps {
  story: IStory;
}
function StoryCard({ story }: StoryCardProps) {
  return (
    <Link to={`/story/${story.id}`} className="flex align-center gap-2">
      <img
        className="rounded-[5px]"
        src={story.image}
        width="64"
        height="64"
        alt={`${story.title} 썸네일`}
      />
      <div>
        <h3 className="font-bold text-sm">{story.title}</h3>
        <p className="text-xs">{story.description}</p>
      </div>
    </Link>
  );
}

export default StoryCard;
