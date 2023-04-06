import { ISheet } from 'services/story';

interface SheetProps {
  sheet?: ISheet;
}

function QuestionSheet({ sheet }: SheetProps) {
  const hasImage = !!(sheet?.background_image || sheet?.image);
  return (
    <>
      <h1 className="px-2 h-10 bg-slate-400 leading-10 text-white font-bold text-sm text-center border-sky-600 border-t border-b">
        {sheet?.title}
      </h1>
      {hasImage && (
        <div className="relative h-[35vh] flex justify-center bg-sky-100">
          {sheet?.background_image && (
            <img
              className="max-w-full max-h-full"
              src={sheet?.background_image}
              alt={`${sheet?.title} 배경 이미지`}
            />
          )}
          {sheet?.image && (
            <img
              className="absolute top-[50%] left-[50%] max-w-full max-h-full transform -translate-x-1/2 -translate-y-1/2"
              src={sheet?.image}
              alt={`${sheet?.title} 이미지`}
            />
          )}
        </div>
      )}
      <div className="whitespace-pre-wrap p-2 min-h-10 bg-slate-200 font-bold border-slate-300 border-t border-b">
        {sheet?.question || ''}
      </div>
    </>
  );
}

export default QuestionSheet;
