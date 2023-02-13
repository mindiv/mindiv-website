import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const GameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  margin-bottom: 30px;

  .main-top {
    position: relative;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card1,
    .card2 {
      height: 100px;
      position: absolute;
      z-index: 99;
      top: 0;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
        rgba(17, 17, 26, 0.1) 0px 0px 8px;
      border-radius: 10px;
      background-color: #fff;
    }

    .card1 {
      margin-top: -20px;
      z-index: 2;
      border: 5px;

      width: 90%;
    }

    .card2 {
      margin-top: -40px;
      z-index: 1;
      border: 5px;
      width: 80%;
    }
  }
`;

export const QuestionWrap = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  z-index: 9;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;

  p {
    font-size: 25px;
  }
`;

export const OptionsWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .correct,
  .correct:hover {
    background-color: green;
    color: white;
  }

  .wrong,
  .wrong:hover {
    background-color: red;
    color: white;
  }
`;
export const OptionBtn = styled.button`
  background-color: transparent;
  color: #fff;
  width: 200px;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #fff;
  font-weight: 600;
  :hover {
    background-color: #fff;
    color: #333;
  }
`;
