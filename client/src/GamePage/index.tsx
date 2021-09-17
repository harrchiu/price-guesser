import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

import getRandomProduct from "../queries/getRandomProduct";

import "./index.css";
import GameSlot from "./GameSlot";
import { couldStartTrivia } from "typescript";

interface Product {
  title?: string;
  price?: number;
  imageSrc?: string;
}

const GamePage = () => {
  const [curProducts, setCurProducts] = useState<Product[]>([
    { title: "f", imageSrc: "sd", price: 3 },
    { title: "g", imageSrc: "sd", price: 3 },
  ]);

  const buttonClick = async () => {
    var newProduct: any = await getRandomProduct(1);
    setCurProducts([
      curProducts[1],
      {
        title: newProduct[0].title,
        price: newProduct[0].price,
        imageSrc: newProduct[0].img,
      },
    ]);
  };

  // useEffect(() => {
  //   var newProduct: any = getRandomProduct(1).then(response);

  //   setCurProducts([
  //     curProducts[1],
  //     {
  //       title: newProduct[0].title,
  //       price: newProduct[0].price,
  //       imageSrc: newProduct[0].img,
  //     },
  //   ]);
  // }, []);

  const gameSlotIndexArray = [0, 1];
  return (
    <div className="game-container">
      <div className="prompt-box">
        <div className="prompt-box__title">Which one costs more?</div>
      </div>
      {gameSlotIndexArray.map((index) => {
        return (
          <GameSlot product={curProducts[index]} buttonClick={buttonClick} />
        );
      })}
    </div>
  );
};

export type { Product };
export default GamePage;
