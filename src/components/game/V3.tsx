import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getQuestions } from '../../features/gameSlice';
import {
  GameBox,
  OptionBtn,
  OptionsWrap,
  QuestionWrap,
  Wrapper,
} from './style';

const V3 = () => {
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
    const { question, options, answer } = questions[currentQuestion];

    return (
      <GameBox>
        <div className="main-top">
          <div className="card1"></div>
          <div className="card2"></div>
          <QuestionWrap>
            <p>{question}</p>
          </QuestionWrap>
        </div>
        <OptionsWrap>
          {options.map((option) => (
            <OptionBtn
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`${
                answered && option === answer
                  ? 'correct flash'
                  : option === selectedOption
                  ? 'wrong'
                  : ''
              }`}
            >
              {option}
            </OptionBtn>
          ))}
        </OptionsWrap>
      </GameBox>
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
    <Wrapper>
      {currentQuestion < questions.length ? renderQuestion() : renderResult()}
      {currentQuestion < questions.length && (
        <button onClick={handleNextClick}>Next</button>
      )}
    </Wrapper>
  );
};

export default V3;
