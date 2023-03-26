import PlayModal from './PlayModal';

interface AnswerModalProps {
  answerReply: string;
  answer: string;
  handleClose: () => void;
  handleNextSheet: () => void;
}

function AnswerModal({
  answerReply,
  answer,
  handleClose,
  handleNextSheet,
}: AnswerModalProps) {
  return (
    <PlayModal handleClose={handleClose}>
      <div className="p-4 border border-slate-300 rounded-sm">
        {answerReply}
      </div>
      <div className="text-center">
        <p className="my-4 text-sm text-green-600 font-bold">정답: {answer}</p>
        <button
          className="mx-auto px-3 py-1 rounded-md w-[100px] text-sm bg-slate-300"
          onClick={handleNextSheet}
        >
          다음
        </button>
      </div>
    </PlayModal>
  );
}

export default AnswerModal;
