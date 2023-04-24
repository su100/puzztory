function SkeletonStory() {
  return (
    <div className="flex items-center gap-2 relative">
      <div className="rounded-[5px] w-[64px] h-[64px] bg-slate-300 relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-gray-200 rounded-[5px]"></div>
      </div>
      <div className="w-[calc(100%-64px)] relative">
        <h3 className="mb-1 w-4/5 h-4 bg-slate-300 rounded-sm relative">
          <span className="absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-gray-200 rounded-sm"></span>
        </h3>
        <p className="w-full h-9 bg-slate-300 rounded-sm relative">
          <span className="absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-gray-200 rounded-sm"></span>
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
