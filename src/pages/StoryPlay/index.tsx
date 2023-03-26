import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { playStory } from 'services/story';

function StoryPlayPage() {
  const { id } = useParams();
  const { data: sheet } = useQuery([], () => playStory(Number(id)));
  return (
    <div>
      <div className="px-2 py-3">hint icon</div>
      <h1 className="px-2 h-10 bg-slate-400 leading-10 text-white font-bold text-sm text-center border-sky-600 border-t border-b">
        {sheet?.title}
      </h1>
      <div className="relative flex justify-center bg-sky-100">
        {sheet?.background_image && (
          <img
            src={sheet?.background_image}
            alt={`${sheet?.title} 배경 이미지`}
          />
        )}
        {sheet?.image && (
          <img
            className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
            src={sheet?.image}
            alt={`${sheet?.title} 이미지`}
          />
        )}
      </div>
      <h2 className="p-2 min-h-10 bg-slate-200 font-bold border-slate-300 border-t border-b">
        {sheet?.question}
      </h2>
      <div className="p-8 flex flex-col items-center justify-center gap-5 text-center">
        <input
          className="rounded-xl px-3 py-1 w-[50%] border border-slate-300"
          placeholder="정답"
        />
        <button className="w-[110px] px-2 py-1 bg-slate-400 rounded-md">
          확인
        </button>
      </div>
    </div>
  );
}

export default StoryPlayPage;
