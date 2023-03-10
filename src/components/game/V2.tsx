import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getQuestions } from '../../features/gameSlice';

const V2 = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.game);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

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
    const { question, options } = questions[currentQuestion];

    return (
      <div>
        <p>{question}</p>
        {options.map((option) => (
          <p
            key={option}
            style={{
              color:
                selectedOption === option
                  ? answered &&
                    selectedOption !== questions[currentQuestion].answer
                    ? 'red'
                    : 'green'
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
        {questions.map((question, index) => (
          <div
            key={question.question}
            style={{
              backgroundColor: incorrectAnswers.includes(index)
                ? 'red'
                : 'green',
            }}
          >
            <p>{question.question}</p>
            {question.options.map((option) => (
              <p
                key={option}
                style={{
                  color: option === question.answer ? 'green' : 'black',
                }}
              >
                {option}
              </p>
            ))}
          </div>
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

export default V2;
