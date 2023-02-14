import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getQuestions } from '../features/gameSlice';
import { Button, OptionButton } from './Button';

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
    dispatch(getQuestions())
      .unwrap()
      .then(() => setLoading(false));
  }, [dispatch]);

  const handleOptionClick = (option: string) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);

      if (option === questions[currentQuestion].answer) {
        setCorrectAnswers([...correctAnswers, currentQuestion]);
      } else {
        setIncorrectAnswers([...incorrectAnswers, currentQuestion]);
      }
    }
  };

  const handleNextClick = () => {
    if (answered) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
      setAnswered(false);
    }
  };

  const renderQuestion = () => {
    const { question, options, answer } = questions[currentQuestion];
    return (
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-2/3">
          <div className=" mb-10 relative flex justify-center">
            <div className="absolute bg-gray-700 shadow_g h-20 w-full z-4 paper1  rounded-lg" />
            <div className="absolute bg-gray-700 shadow_g h-20  w-full z-1 paper2 rounded-lg" />
            <div className="bg-gray-700 p-10 text-center rounded-lg  shadow_g relative z-3 w-full font-bold flex  flex-col justify-center items-center">
              <p className="text-lg mb-10 animate__animated animate__zoomIn text-gray-200">
                {question}
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                {options.map((option) => (
                  <OptionButton
                    key={option}
                    click={() => handleOptionClick(option)}
                    className={`${
                      answered && option === answer
                        ? 'correct animate__animated animate__pulse'
                        : option === selectedOption
                        ? 'wrong animate__animated animate__headShake'
                        : ''
                    }`}
                  >
                    {option}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderResult = () => {
    return <div>Result</div>;
  };

  return (
    <div className="h-screen flex flex-col items-center w-full justify-center">
      {currentQuestion < questions.length ? renderQuestion() : renderResult()}
      {answered && currentQuestion < questions.length && (
        <Button click={handleNextClick}>
          {currentQuestion + 1 === questions.length
            ? 'Show Result'
            : 'Next Question'}
        </Button>
      )}
    </div>
  );
};

export default GameLayout;
