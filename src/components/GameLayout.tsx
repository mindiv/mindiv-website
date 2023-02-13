import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getQuestions } from '../features/gameSlice';
import { Button } from './Button';
import Question from './Question';

const GameLayout = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.game);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getQuestions());
  }, [dispatch]);

  const renderQuestion = () => {
    const { question, options, answer } = questions[currentQuestion];
    return <Question question={question} options={options} answer={answer} />;
  };
  const renderResult = () => {
    return <div>Result</div>;
  };

  return (
    <div className="h-screen flex flex-col items-center w-full justify-center">
      {currentQuestion < questions.length ? renderQuestion() : renderResult()}
      {currentQuestion < questions.length && <Button>Next Question</Button>}
    </div>
  );
};

export default GameLayout;
