import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useModal from 'utils/hooks/useModal';
import QuestionSheet from './components/QuestionSheet';
import AnswerModal from './components/AnswerModal';
import { MessageRes } from 'services/type';
import {
  getStorySheet,
  GET_STORY_SHEET,
  playStory,
  submitSheetAnswer,
  SubmitSheetAnswerRes,
} from 'services/story';

const STALE_TIME = 5 * 1000;

// TODO: 최적화 memo
function StoryPlayPage() {
  const { id } = useParams();
  const [sheetId, setSheetId] = useState<number>();
  const [answer, setAnswer] = useState('');
  const [answerReply, setAnswerReply] = useState('');
  const [isWrong, setIsWrong] = useState(false);

  const navigate = useNavigate();

  const {
    isModalOpen: isAnswerModalOpen,
    openModal: openAnswerModal,
    closeModal: closeAnswerModal,
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

  const sheet = useMemo(() => data || startSheet, [data, startSheet]);

  const { mutate: submitAnswer } = useMutation(submitSheetAnswer, {
    onSuccess: (r: SubmitSheetAnswerRes) => {
      if (!r.is_valid) {
        setIsWrong(true);
        return;
      }
      setIsWrong(false);
      setAnswerReply(r.answer_reply ?? '');
      openAnswerModal();
      console.log('모달 띄우고 확인 누르면 다음 시트 가져오기');
    },
    onError: (e: AxiosError<MessageRes>) => {
      console.log('error:', e.response?.data.message);
    },
  });

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    console.log('제출', answer);
    if (answer.trim() === '') {
      alert('정답을 입력해주세요');
      return;
    }

    const sheet_id = sheet?.sheet_id || startSheet?.sheet_id;
    if (!sheet_id) return;
    submitAnswer({ sheet_id, answer });
  };

  const handleAnswerModal = () => {
    openAnswerModal();
  };

  const handlePrevSheet = () => {
    if (!sheet) return;
    const { previous_sheet_infos } = sheet;
    setSheetId(previous_sheet_infos[previous_sheet_infos.length - 1].sheet_id);
  };

  const handleNextSheet = () => {
    console.log('handleNextSheet');
    if (sheet?.next_sheet_id) {
      setSheetId(sheet?.next_sheet_id);
      return;
    }
    navigate(`/story/${id}`);
  };

  useEffect(() => {
    if (sheet) {
      setAnswer(sheet.answer || '');
      setAnswerReply(sheet.answer_reply || '');
    }
  }, [sheet]);

  return (
    <div>
      <div className="px-2 py-3">hint icon</div>
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
            onClick={handleAnswerModal}
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
    </div>
  );
}

export default StoryPlayPage;
