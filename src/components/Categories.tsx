import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setGameCategories, setView } from '../features/gameSlice';
import { CategoryData } from '../interfaces/game.interface';
import { Button } from './Button';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.game);
  const [allCategories, setAllCategories] = useState<CategoryData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setAllCategories([
      {
        _id: 'all',
        name: 'All Categories',
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
              <div className="absolute flex justify-center bg-black/50 items-center w-full h-full t-0 hover:opacity-0">
                {category.name}
              </div>
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
    <div className=" flex flex-col mb-10">
      <h1 className="font-bold text-3xl text-gray-200 mb-2 ">
        Select Your Trivia Categories
      </h1>
      <p className="text-gray-200 text-sm">
        Choose up to 5 categories to test your knowledge! Make sure to pick the
        ones you're confident about or want to learn more about. Mix and match
        to create a unique trivia experience every time. Have fun!
      </p>
    </div>
  );
};

export default Categories;
