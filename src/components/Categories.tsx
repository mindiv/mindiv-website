import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';

const Categories = () => {
  const { categories } = useAppSelector((state) => state.game);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategories.length === 2) {
      return;
    }

    setSelectedCategories([...selectedCategories, categoryId]);
  };

  return (
    <div className="lg:w-2/3 mx-auto w-full">
      <Heading />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 ">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className={` text-gray-200 p-1 rounded-lg cursor-pointer border-gray-900 border-2 ${
              selectedCategories.includes(category._id) ? 'border-gray-600' : ''
            }`}
          >
            <div
              className={`bg-gray-700 text-gray-200 p-4 rounded-lg cursor-pointer`}
            >
              {category.name}
            </div>
          </div>
        ))}
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
