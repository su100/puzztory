import PlayModal from './PlayModal';

interface AnswerModalProps {
  answerReply: string;
  answer: string;
  isEnd: boolean;
  handleClose: () => void;
  handleNextSheet: () => void;
}

function AnswerModal({
  answerReply,
  answer,
  isEnd,
  handleClose,
  handleNextSheet,
}: AnswerModalProps) {
  const handleNext = () => {
    handleClose();
    handleNextSheet();
  };

  return (
    <PlayModal handleClose={handleClose}>
      <div className="whitespace-pre-wrap max-h-[40vh] p-4 border scrollbar border-slate-300 rounded-sm overflow-auto text-sm">
        {answerReply}
      </div>
      <div className="text-center min-h-[80px]">
        <p className="my-4 text-sm text-green-600 font-bold">정답: {answer}</p>
        <button
          className="mx-auto px-3 py-1 rounded-md w-[100px] text-sm bg-slate-300"
          onClick={handleNext}
        >
          {isEnd ? '결과 확인' : '다음'}
        </button>
      </div>
    </PlayModal>
  );
}

export default AnswerModal;
