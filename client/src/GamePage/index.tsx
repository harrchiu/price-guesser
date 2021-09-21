import { useEffect, useState } from "react";
import cookie from "cookie";
import getRandomProduct from "../queries/getRandomProduct";
import GameSlot from "./GameSlot";
import GameLostPage from "../GameLostPage";
import NewPlayerModal from "../NewPlayerModal";
import HeaderSection from "../HeaderSection";
import {
  CORRECT_TIMEOUT,
  INCORRECT_TIMEOUT,
  MINIMUM_VISIT_GAP_FOR_MODAL,
  JEFF_WAITING_SRC,
  AMAZON_PHOTO_LINK,
} from "../publicConstants";

import "./index.css";
import upsertProduct from "../mutations/upsertProduct";
import getProductById from "../queries/getProductById";

const LOADING_STRING = "Loading...";

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
      title: LOADING_STRING,
      imageSrc: JEFF_WAITING_SRC,
      price: 1,
    },
    {
      title: LOADING_STRING,
      imageSrc: JEFF_WAITING_SRC,
      price: 1,
    },
  ]);
  const [curScore, setCurScore] = useState(0);
  const [gameState, setGameState] = useState(GameState.WAITING_FOR_RESPONSE);
  const [isGuideModalVisible, setIsGuideModalVisible] = useState(true);

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
        var response = getRandomProduct(1);
        response.then((newProduct) => {
          setCurProducts([
            curProducts[1],
            {
              title: newProduct[0].title,
              price: newProduct[0].price,
              imageSrc: AMAZON_PHOTO_LINK(newProduct[0].img),
            },
          ]);
        });
        setGameState(GameState.WAITING_FOR_RESPONSE);
      }, CORRECT_TIMEOUT);
    } else {
      try {
        getProductById("-1").then((siteStats) => {
          siteStats.gamesPlayed += 1;
          upsertProduct(siteStats);
        });
      } catch (error) {
        console.log(error);
      }

      setGameState(GameState.DISPLAYING_PRICE);
      setTimeout(() => {
        setGameState(GameState.LOST);
      }, INCORRECT_TIMEOUT);
    }
  };

  // render two products on page load
  useEffect(() => {
    try {
      getProductById("-1").then((siteStats) => {
        siteStats.siteVisits += 1;
        upsertProduct(siteStats);
      });
    } catch (error) {
      console.log(error);
    }

    getRandomProduct(2).then((newProduct) => {
      setCurProducts([
        {
          title: newProduct[0].title,
          price: newProduct[0].price,
          imageSrc: AMAZON_PHOTO_LINK(newProduct[0].img),
        },
        {
          title: newProduct[1].title,
          price: newProduct[1].price,
          imageSrc: AMAZON_PHOTO_LINK(newProduct[1].img),
        },
      ]);
    });

    const cookies = cookie.parse(document.cookie);
    var lastVisitedTime;

    if (cookies.lastVisit !== undefined) {
      lastVisitedTime = parseInt(cookies.lastVisit);
    } else {
      lastVisitedTime = 0;
    }
    const timeSinceLastVisit = Math.round(Date.now() / 1000) - lastVisitedTime;
    setIsGuideModalVisible(timeSinceLastVisit > MINIMUM_VISIT_GAP_FOR_MODAL);
  }, []);

  // return either in-game or lost page
  const gameSlotIndexArray = [0, 1];
  if (gameState === GameState.LOST) {
    return (
      <>
        <HeaderSection />
        <GameLostPage score={curScore} />
      </>
    );
  }
  return (
    <>
      <div className="game-container">
        <HeaderSection />

        <div className="prompt-section">
          <div className="prompt-section__title">So, which one costs more?</div>
          <div className="prompt-section__score">Score: {curScore}</div>
        </div>
        {gameSlotIndexArray.map((index) => {
          return (
            <GameSlot
              product={curProducts[index]}
              buttonClick={buttonClick}
              gameState={gameState}
              isButtonDisabled={curProducts[index].title === LOADING_STRING}
            />
          );
        })}
      </div>
      <NewPlayerModal
        isVisible={isGuideModalVisible}
        setVisible={setIsGuideModalVisible}
      />
    </>
  );
};

export type { Product };
export { GameState };
export default GamePage;
