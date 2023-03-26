import { ISheet } from 'services/story';

interface SheetProps {
  sheet?: ISheet;
}

function QuestionSheet({ sheet }: SheetProps) {
  return (
    <>
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
    </>
  );
}

export default QuestionSheet;
