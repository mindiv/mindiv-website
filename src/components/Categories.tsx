import { useEffect, useState } from 'react';
import { IoCheckmarkCircle, IoFilter, IoOptions } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setCount,
  setDifficulty,
  setGameCategories,
  setView,
} from '../features/gameSlice';
import { CategoryData } from '../interfaces/game.interface';
import { Button } from './Button';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.game);
  const [allCategories, setAllCategories] = useState<CategoryData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setAllCategories([
      {
        _id: 'all',
        name: 'Random',
        cover:
          'https://res.cloudinary.com/dwhg0s0hw/image/upload/v1676375138/mindiv/chess1_iqq0c7.jpg',
      },
      ...categories,
    ]);
  }, [categories]);

  const handleCategorySelect = (category: string) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else if (selectedCategories.includes('all')) {
      setSelectedCategories(selectedCategories.filter((c) => c !== 'all'));
      setSelectedCategories([category]);
    } else {
      if (selectedCategories.length < 5) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleCategoryDeselect = (category: string) => {
    setSelectedCategories(
      selectedCategories.filter(
        (selectedCategory) => selectedCategory !== category
      )
    );
  };

  const handleGamePresets = () => {
    dispatch(setGameCategories(selectedCategories));
    dispatch(setView('game'));
  };

  return (
    <div className="lg:w-3/4 mx-auto w-full">
      <Heading />
      <div className="flex justify-end mb-10 relative">
        <button
          onClick={() => setMenu(!menu)}
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center"
        >
          Configurations
          <span className="ml-4 text-xl">
            <IoOptions />
          </span>
        </button>
        {menu && <DropdownCustom />}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {allCategories.map((category) => (
          <div
            key={category._id}
            onClick={() =>
              selectedCategories.includes(category._id)
                ? handleCategoryDeselect(category._id)
                : handleCategorySelect(category._id)
            }
            className={` text-gray-200 p-2 rounded-lg cursor-pointer border-gray-600 border-2 ${
              selectedCategories.includes(category._id) ? 'border-blue-400' : ''
            }`}
          >
            <div
              className={`relative h-40 bg-gray-700 text-gray-200 rounded-lg cursor-pointer flex flex-col justify-center items-center overflow-hidden`}
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src={category.cover}
              />
              <div className="absolute flex justify-center bg-black/50 items-center w-full h-full t-0 hover:opacity-0 font-bold text-lg">
                {category.name}
              </div>
              {selectedCategories.includes(category._id) && (
                <div className="absolute right-3 bottom-3 text-blue-300 text-2xl">
                  <IoCheckmarkCircle />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center h-20">
        {!!selectedCategories.length && (
          <Button click={handleGamePresets}>Save and Continue</Button>
        )}
      </div>
    </div>
  );
};

const Heading = () => {
  return (
    <div className=" flex flex-col mb-5">
      <h1 className="font-bold text-4xl text-gray-200 mb-2 ">
        Customize Trivia
      </h1>
      <p className="text-gray-300 text-md md:w-3/4">
        Here, you can select the categories of trivia questions you want to play
        and customize the number of questions and difficulty level to suit your
        needs. Make your game experience easier and more enjoyable!
      </p>
    </div>
  );
};

const DropdownCustom = () => {
  const dispatch = useAppDispatch();
  const { difficulty, count } = useAppSelector((state) => state.game);
  const difficulties = [
    { name: 'Easy', alias: 'easy' },
    { name: 'Medium', alias: 'medium' },
    { name: 'Hard', alias: 'hard' },
    { name: 'Random', alias: 'random' },
  ];

  const counts = [
    { name: '5', alias: 5 },
    { name: '10', alias: 10 },
    { name: '15', alias: 15 },
    { name: '20', alias: 20 },
  ];

  const handleSetMode = (alias: string) => {
    dispatch(setDifficulty(alias));
  };

  const handleSetCount = (alias: number) => {
    dispatch(setCount(alias));
  };

  return (
    <div className="z-10 absolute py-4 px-3 right-0 mt-20 bg-white divide-y divide-gray-100 rounded shadow-2xl w-96 dark:bg-gray-800 dark:divide-gray-600 text-gray-200">
      <div className="flex flex-col py-3 justify-center items-center">
        <h3>Difficulty</h3>
        <div className="grid grid-cols-4 gap-2 py-2 text-sm text-gray-700 dark:text-gray-200">
          {difficulties.map((mode) => (
            <button
              className={`px-4 py-2 rounded-3xl border-2 text-xs font-bold ${
                difficulty === mode.alias
                  ? 'border-blue-400'
                  : 'border-gray-300'
              }`}
              onClick={() => handleSetMode(mode.alias)}
            >
              {mode.name}
            </button>
          ))}
        </div>
      </div>
      <div className="py-3 flex flex-col justify-center items-center">
        <h3>Number of Questions</h3>
        <div className="grid grid-cols-4 gap-2 py-2 text-sm text-gray-700 dark:text-gray-200">
          {counts.map((val) => (
            <button
              className={`px-4 py-2 rounded-3xl border-2 text-xs font-bold ${
                count === val.alias ? 'border-blue-400' : 'border-gray-300'
              }`}
              onClick={() => handleSetCount(val.alias)}
            >
              {val.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
