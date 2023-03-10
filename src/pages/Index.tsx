import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import Layout from '../components/Layout';
import { setView } from '../features/gameSlice';

const Index = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setView('categories'));
  }, []);
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="heading text-white font-bold text-center">
          The Ultimate Trivia Challenge!
        </h1>
        <p className="text-white text-center md:w-1/2 mb-4">
          Mindiv is the ultimate trivia challenge for anyone who loves learning
          and loves to have fun. With a wide range of categories and questions.
        </p>
        <Link
          to="/game"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Play Trivia Now
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
