import { useEffect, useState } from "react";
import getRandomProduct from "../queries/getRandomProduct";
import GameSlot from "./GameSlot";
import GameLostPage from "../GameLostPage";
import {
  CORRECT_TIMEOUT,
  INCORRECT_TIMEOUT,
  JEFF_WAITING_SRC,
} from "../publicConstants";

import "./index.css";

interface Product {
  title: string;
  price: number;
  imageSrc: string;
}

enum GameState {
  WAITING_FOR_RESPONSE = "WAITING FOR RESPONSE",
  DISPLAYING_PRICE = "DISPLAYING PRICE",
  LOST = "LOST",
}

// sub-root component
const GamePage = () => {
  const [curProducts, setCurProducts] = useState<Product[]>([
    {
      title: "Loading...",
      imageSrc: JEFF_WAITING_SRC,
      price: 1,
    },
    {
      title: "Loading...",
      imageSrc: JEFF_WAITING_SRC,
      price: 1,
    },
  ]);
  const [curScore, setCurScore] = useState(0);
  const [gameState, setGameState] = useState(GameState.WAITING_FOR_RESPONSE);

  const buttonClick = async (productPrice: number) => {
    if (gameState === GameState.DISPLAYING_PRICE) return;

    // game logic
    if (
      productPrice >= curProducts[0].price &&
      productPrice >= curProducts[1].price
    ) {
      setCurScore(curScore + 1);
      setGameState(GameState.DISPLAYING_PRICE);

      setTimeout(() => {
        var response: any = getRandomProduct(1);
        response.then((newProduct: any) => {
          console.log(newProduct);
          setCurProducts([
            curProducts[1],
            {
              title: newProduct[0].title,
              price: newProduct[0].price,
              imageSrc: newProduct[0].img,
            },
          ]);
        });
        setGameState(GameState.WAITING_FOR_RESPONSE);
      }, CORRECT_TIMEOUT);
    } else {
      setGameState(GameState.DISPLAYING_PRICE);
      setTimeout(() => {
        setGameState(GameState.LOST);
      }, INCORRECT_TIMEOUT);
    }
  };

  // render two products on page load
  useEffect(() => {
    var response: any = getRandomProduct(2);

    response.then((newProduct: any) => {
      console.log(newProduct);
      setCurProducts([
        {
          title: newProduct[0].title,
          price: newProduct[0].price,
          imageSrc: newProduct[0].img,
        },
        {
          title: newProduct[1].title,
          price: newProduct[1].price,
          imageSrc: newProduct[1].img,
        },
      ]);
    });
  }, []);

  // return either in-game or lost page
  const gameSlotIndexArray = [0, 1];
  if (gameState === GameState.LOST) {
    return <GameLostPage score={curScore} />;
  }
  return (
    <div className="game-container">
      <div className="prompt-section">
        <div className="prompt-section__title">Which one costs more?</div>
        <div className="prompt-section__score">Score: {curScore}</div>
      </div>
      {gameSlotIndexArray.map((index) => {
        return (
          <GameSlot
            product={curProducts[index]}
            buttonClick={buttonClick}
            gameState={gameState}
          />
        );
      })}
    </div>
  );
};

export type { Product };
export { GameState };
export default GamePage;
