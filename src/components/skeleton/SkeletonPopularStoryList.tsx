import { SKELETON_STYLE, SKELETON_ANIMATION_STYLE } from './SkeletonStoryList';
function SkeletonPopularStory() {
  return (
    <li className="w-[100px] min-w-[100px] rounded-md">
      <div className={`${SKELETON_STYLE} w-full h-[100px] rounded-md`}>
        <div className={`${SKELETON_ANIMATION_STYLE} rounded-md`} />
      </div>
      <h3 className={`${SKELETON_STYLE} mt-1 w-full h-4 rounded-sm`}>
        <div className={`${SKELETON_ANIMATION_STYLE} rounded-sm`} />
      </h3>
    </li>
  );
}

function SkeletonPopularStoryList() {
  return (
    <ul className="pb-1 flex gap-4 overflow-x-auto flex-nowrap scrollbar">
      <SkeletonPopularStory />
      <SkeletonPopularStory />
      <SkeletonPopularStory />
    </ul>
  );
}

export default SkeletonPopularStoryList;
