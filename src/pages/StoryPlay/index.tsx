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

const BUTTON_STYLE = 'w-[110px] px-2 py-1 bg-slate-400 rounded-md';
const OUTLINE_BUTTON_STYLE =
  'w-[110px] px-2 py-1 rounded-md rounded-md border border-slate-400';

const STALE_TIME = 5 * 1000;

// TODO: 최적화 memo
function StoryPlayPage() {
  const { id } = useParams();
  const [sheetId, setSheetId] = useState<number | null>();
  const [answer, setAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [answerReply, setAnswerReply] = useState('');
  const [nextSheetId, setNextSheetId] = useState<number | null>(null);
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
    { staleTime: STALE_TIME, enabled: !!sheetId, keepPreviousData: true },
  );

  const { mutate: purchaseHint } = useMutation(
    (id: number) => buyHint(sheet!.sheet_id, id),
    {
      onSuccess: (r: IHint) => {
        setHintList((s) => s?.map((hint) => (hint.id === r.id ? r : hint)));
      },
      onError: (e: AxiosError<MessageRes>) => {
        console.log('error:', e.message);
        alert(e.response?.data.message);
      },
    },
  );

  const sheet = useMemo(() => data || startSheet, [data, startSheet]);

  console.log('sheet', sheet);

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
      setNextSheetId(r.next_sheet_id);
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
    if (nextSheetId) {
      setSheetId(nextSheetId);
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
      setNextSheetId(sheet.next_sheet_id);
      setIsWrong(false);
    }
  }, [sheet]);

  return (
    <div className="pb-20">
      <div className="px-2 py-3 text-right">
        <button onClick={openHintModal}>
          <img src={hintIcon} width="32" height="32" alt="hint" />
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
          <button className={BUTTON_STYLE} onClick={openAnswerModal}>
            답변 확인
          </button>
        ) : (
          <button className={BUTTON_STYLE} onClick={handleSubmitAnswer}>
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
        {(sheet?.previous_sheet_infos.length || 0) > 0 && (
          <button className={OUTLINE_BUTTON_STYLE} onClick={handlePrevSheet}>
            이전
          </button>
        )}
        {sheet?.next_sheet_id && (
          <button className={OUTLINE_BUTTON_STYLE} onClick={handleNextSheet}>
            다음
          </button>
        )}
      </div>
      {isAnswerModalOpen && (
        <AnswerModal
          answerReply={answerReply}
          answer={answer}
          isEnd={!nextSheetId}
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
