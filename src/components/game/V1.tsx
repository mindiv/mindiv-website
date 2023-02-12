import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getQuestions } from '../../features/gameSlice';

const V1 = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.game);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);

    if (option === questions[currentQuestion].answer) {
      setCorrectAnswers([...correctAnswers, currentQuestion]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestion]);
    }
  };

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption('');
  };
  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const renderQuestion = () => {
    const { question, options } = questions[currentQuestion];

    return (
      <div>
        <p>{question}</p>
        {options.map((option) => (
          <p
            key={option}
            style={{
              color:
                selectedOption === option &&
                selectedOption !== questions[currentQuestion].answer
                  ? 'red'
                  : 'black',
            }}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </p>
        ))}
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div>
        <p>Correct Answers: {correctAnswers.length}</p>
        <p>Incorrect Answers: {incorrectAnswers.length}</p>
        {incorrectAnswers.map((questionIndex) => (
          <p>
            Question: {questions[questionIndex].question} - Correct Answer:{' '}
            {questions[questionIndex].answer}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      {currentQuestion < questions.length ? renderQuestion() : renderResult()}
      {currentQuestion < questions.length && (
        <button onClick={handleNextClick}>Next</button>
      )}
    </div>
  );
};

const Button = ({ children }: { children: any }) => {
  return <button className="bg-green-200 p-3">{children}</button>;
};

export default V1;
