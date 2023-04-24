export const SKELETON_STYLE = 'bg-slate-300 relative';

export const SKELETON_ANIMATION_STYLE =
  'absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-gray-200';

function SkeletonStory() {
  return (
    <div className="flex items-center gap-2 relative">
      <div className={`${SKELETON_STYLE} rounded-[5px] w-[64px] h-[64px]`}>
        <div className={`${SKELETON_ANIMATION_STYLE} rounded-[5px]`}></div>
      </div>
      <div className="w-[calc(100%-64px)] relative">
        <h3 className={`${SKELETON_STYLE} mb-1 w-4/5 h-4 rounded-sm`}>
          <span className={`${SKELETON_ANIMATION_STYLE} rounded-sm`}></span>
        </h3>
        <p className={`${SKELETON_STYLE} w-full h-9 rounded-sm`}>
          <span className={`${SKELETON_ANIMATION_STYLE} rounded-sm`}></span>
        </p>
      </div>
    </div>
  );
}

function SkeletonStoryList() {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonStory />
      <SkeletonStory />
      <SkeletonStory />
    </div>
  );
}

export default SkeletonStoryList;
