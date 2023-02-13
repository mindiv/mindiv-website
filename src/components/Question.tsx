import { OptionButton } from './Button';

interface QuestionProps {
  question: string;
  options: string[];
  answer: string;
}

const Question = ({ question, options, answer }: QuestionProps) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col w-2/3">
        <div className=" mb-10 relative flex justify-center">
          <div className="absolute bg-white shadow_g h-20 w-full z-4 paper1  rounded-lg" />
          <div className="absolute bg-white shadow_g h-20  w-full z-1 paper2 rounded-lg" />
          <div className="bg-white p-10 text-center rounded-lg  shadow_g relative z-3 w-full font-bold flex  flex-col justify-center items-center border border-gray-200">
            <p className="text-lg mb-10">{question}</p>
            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((option, index) => (
                <OptionButton>{option}</OptionButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
