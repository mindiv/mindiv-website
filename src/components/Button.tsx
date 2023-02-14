import React from 'react';
import styled from 'styled-components';

interface OptionBtnProps {
  children: React.ReactNode;
  className?: string;
  click?: any;
}

export const OptionButton = ({
  children,
  className,
  click,
}: OptionBtnProps) => {
  return (
    <ButtonWrap onClick={click} className={className}>
      <span>
        <div className="animate__animated animate__zoomIn">{children}</div>
      </span>
    </ButtonWrap>
  );
};

export const Button = ({ children, click }: OptionBtnProps) => {
  return (
    <button
      onClick={click}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      <span>{children}</span>
    </button>
  );
};

export const Button3D = ({ children, click }: OptionBtnProps) => {
  return (
    <button onClick={click} className="button">
      <span>{children}</span>
    </button>
  );
};

const ButtonWrap = styled.button`
  display: flex;
  display: flex;
  justify-content: center;
  color: #fff;
  box-shadow: 0 8px 0 #115798, 0 10px 15px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;

  span {
    width: 100%;
    height: 100%;
    padding: 13px;
    background-image: linear-gradient(#2e89e5, #2f7fd0);
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-shadow: 0 -1px 1px rgba(7, 51, 34, 0.8);
  }

  :active {
    box-shadow: 0 8px 0 #115798, 0 7px 10px rgba(0, 0, 0, 0.25);
  }

  :active span {
    transform: translateY(4px);
  }
`;
