import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useModal from 'utils/hooks/useModal';
import QuestionSheet from './components/QuestionSheet';
import AnswerModal from './components/AnswerModal';
import hintIcon from 'assets/img/hint.png';
import { MessageRes } from 'services/type';
import {
  getStorySheet,
  GET_STORY_SHEET,
  playStory,
  submitSheetAnswer,
  SubmitSheetAnswerRes,
} from 'services/story';
import HintModal from './components/HintModal';
import { buyHint, getHintList, GET_HINT, IHint } from 'services/hint';

const STALE_TIME = 5 * 1000;

// TODO: 최적화 memo
function StoryPlayPage() {
  const { id } = useParams();
  const [sheetId, setSheetId] = useState<number>();
  const [answer, setAnswer] = useState('');
  const [answerReply, setAnswerReply] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [hintList, setHintList] = useState<IHint[]>();

  const navigate = useNavigate();

  const {
    isModalOpen: isAnswerModalOpen,
    openModal: openAnswerModal,
    closeModal: closeAnswerModal,
  } = useModal();

  const {
    isModalOpen: isHintModalOpen,
    openModal: openHintModal,
    closeModal: closeHintModal,
  } = useModal();

  const { data: startSheet } = useQuery(
    [...GET_STORY_SHEET, id, 'start'],
    () => playStory(Number(id)),
    { staleTime: STALE_TIME },
  );

  const { data } = useQuery(
    [...GET_STORY_SHEET, id, sheetId],
    () => getStorySheet(sheetId!),
    { staleTime: STALE_TIME, enabled: !!sheetId },
  );

  const { mutate: purchaseHint } = useMutation(
    (id: number) => buyHint(sheet!.sheet_id, id),
    {
      onSuccess: (r: IHint) => {
        setHintList((s) => s?.map((hint) => (hint.id === r.id ? r : hint)));
      },
      onError: (e: AxiosError<MessageRes>) => {
        console.log('error:', e.message);
      },
    },
  );

  const sheet = useMemo(() => data || startSheet, [data, startSheet]);

  const { data: hint } = useQuery(
    [...GET_HINT, sheetId],
    () => getHintList(sheet!.sheet_id), // sheetId 사용시 첫 시트에서는 빈값
    {
      staleTime: STALE_TIME,
      enabled: !!sheet && isHintModalOpen,
    },
  );

  const { mutate: submitAnswer } = useMutation(submitSheetAnswer, {
    onSuccess: (r: SubmitSheetAnswerRes) => {
      if (!r.is_valid) {
        setIsWrong(true);
        return;
      }
      setIsWrong(false);
      setAnswerReply(r.answer_reply ?? '');
      openAnswerModal();
    },
    onError: (e: AxiosError<MessageRes>) => {
      console.log('error:', e.response?.data.message);
    },
  });

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (answer.trim() === '') {
      alert('정답을 입력해주세요');
      return;
    }

    if (!sheet?.sheet_id) return;
    submitAnswer({ sheet_id: sheet?.sheet_id, answer });
  };

  const handlePrevSheet = () => {
    if (!sheet) return;
    const { previous_sheet_infos } = sheet;
    setSheetId(previous_sheet_infos[previous_sheet_infos.length - 1].sheet_id);
  };

  const handleNextSheet = () => {
    if (sheet?.next_sheet_id) {
      setSheetId(sheet.next_sheet_id);
      return;
    }
    navigate(`/story/${id}`);
  };

  useEffect(() => {
    setHintList(hint?.user_sheet_hint_infos);
  }, [hint]);

  useEffect(() => {
    if (sheet) {
      setAnswer(sheet.answer || '');
      setAnswerReply(sheet.answer_reply || '');
    }
  }, [sheet]);

  return (
    <div>
      <div className="px-2 py-3 text-right">
        <button onClick={openAnswerModal}>
          <img src={hintIcon} alt="hint" />
        </button>
      </div>
      <QuestionSheet sheet={sheet} />
      <div className="p-8 flex flex-col items-center justify-center gap-5 text-center">
        <input
          className="rounded-xl px-3 py-1 w-[50%] border border-slate-300"
          value={answer}
          onChange={handleAnswerChange}
          disabled={sheet?.is_solved}
          placeholder="정답"
        />
        {sheet?.is_solved ? (
          <button
            className="w-[110px] px-2 py-1 bg-slate-400 rounded-md"
            onClick={openAnswerModal}
          >
            답변 확인
          </button>
        ) : (
          <button
            className="w-[110px] px-2 py-1 bg-slate-400 rounded-md"
            onClick={handleSubmitAnswer}
          >
            확인
          </button>
        )}
        {isWrong && (
          <span className="text-red-500 font-bold text-sm">
            정답이 아니에요
          </span>
        )}
      </div>
      <div className="flex justify-center gap-3">
        {sheet?.previous_sheet_infos && (
          <button
            className="w-[110px] px-2 py-1rounded-md rounded-md border border-slate-400"
            onClick={handlePrevSheet}
          >
            이전
          </button>
        )}
        {sheet?.next_sheet_id && (
          <button
            className="w-[110px] px-2 py-1 rounded-md border border-slate-400"
            onClick={handleNextSheet}
          >
            다음
          </button>
        )}
      </div>
      {isAnswerModalOpen && (
        <AnswerModal
          answerReply={answerReply}
          answer={answer}
          isEnd={!sheet?.next_sheet_id}
          handleClose={closeAnswerModal}
          handleNextSheet={handleNextSheet}
        />
      )}
      {isHintModalOpen && (
        <HintModal
          hintList={hintList}
          purchaseHint={purchaseHint}
          handleClose={closeHintModal}
        />
      )}
    </div>
  );
}

export default StoryPlayPage;
