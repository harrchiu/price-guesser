import { Button, Typography } from "antd";
import React, { FC, useState } from "react";

import "./index.css";

const { Title } = Typography;

// const buttonClick = (slotNumber: number) => {
//   console.log("hello");
//   console.log(slotNumber);
//   setImageSrcs();
// };

const GameSlot: React.FC<{
  imageSrc: string;
  productTitle?: string;
  slotNumber: number;
  buttonClick: () => void;
}> = ({ imageSrc, productTitle, slotNumber, buttonClick }) => {
  return (
    <div
      className="game-slot"
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
    >
      <div className="game-slot__mask">
        <div className="product-info">
          <Title className="product-info__title">{productTitle}</Title>
          <Button
            className="product-info__button"
            type="primary"
            onClick={() => {
              buttonClick();
            }}
          >
            click me!
          </Button>
        </div>
      </div>
    </div>
  );
};

const GamePage = () => {
  const [imageSrcs, setImageSrcs] = useState([
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
    "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  ]);

  const buttonClick = () => {
    console.log("hello");
    console.log(imageSrcs);
    setImageSrcs([imageSrcs[1], imageSrcs[0]]);
  };

  const gameSlotArray = [0, 1];
  return (
    <div className="game-container">
      {gameSlotArray.map((index) => {
        return (
          <GameSlot
            imageSrc={imageSrcs[index]}
            slotNumber={index}
            buttonClick={buttonClick}
          />
        );
      })}
    </div>
  );
};

export default GamePage;
