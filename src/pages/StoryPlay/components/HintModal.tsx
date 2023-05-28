import { IHint } from 'services/hint';
import PlayModal from './PlayModal';

interface AnswerModalProps {
  hintList?: IHint[];
  purchaseHint: (hintId: number) => void;
  handleClose: () => void;
}

function Hint({
  hint,
  purchaseHint,
}: {
  hint: IHint;
  purchaseHint: (hintId: number) => void;
}) {
  if (hint.has_history) {
    return (
      <div className="p-3 border border-slate-300 rounded-md text-center">
        <h3 className="text-sm text-zinc-700 font-bold">{hint.point} point</h3>
        <p className="text-sm my-3">{hint.hint}</p>
        {hint.image && <img src={hint.image} alt={`${hint.hint}`} />}
      </div>
    );
  }

  return (
    <div className="p-3 border border-slate-300 rounded-md flex justify-between items-center">
      <h3 className="text-sm font-bold text-zinc-700 ">
        {hint.point} point 힌트
      </h3>
      {hint.hint}
      <button
        className="p-2 border border-slate-300 rounded-sm text-sm"
        onClick={() => purchaseHint(hint.id)}
      >
        구매
      </button>
    </div>
  );
}

function HintModal({ hintList, purchaseHint, handleClose }: AnswerModalProps) {
  if (!hintList) return <></>;
  return (
    <PlayModal handleClose={handleClose}>
      <div className="h-[100%] flex flex-col justify-between gap-4">
        <h2 className="font-bold text-xl text-center">힌트</h2>
        <div className="h-[90%] flex flex-col gap-3 overflow-y-auto">
          {hintList.length === 0 ? (
            <div>힌트가 없습니다.</div>
          ) : (
            hintList.map((h) => (
              <Hint key={h.id} hint={h} purchaseHint={purchaseHint} />
            ))
          )}
        </div>
      </div>
    </PlayModal>
  );
}

export default HintModal;
