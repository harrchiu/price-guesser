import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

import getRandomProduct from "../queries/getRandomProduct";

import "./index.css";
import GameSlot from "./GameSlot";

interface Product {
  title?: string;
  price?: number;
  imageSrc?: string;
}

const GamePage = () => {
  const [curProducts, setCurProducts] = useState<Product[]>([
    { title: "f" },
    { title: "g" },
  ]);

  const buttonClick = () => {
    // var newDualQuery = await getRandomItem(2);
    // console.log(newDualQuery);

    // var newProduct: any = getRandomProduct(2);
    var reqData = {
      count: 2,
    };

    var newProduct: any = getRandomProduct(2);
    // axios
    //   .get("http://localhost:5000/getRandomItem?count=2",
    //     // params: {
    //     //   count: 2,
    //     // },
    //     data: $.param(reqData)
    //   )
    //   .then((response) => {
    //     console.log("something really good happened");
    //     console.log(response);
    //     newProduct = response;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios({
      method: "get",
      url: "http://localhost:5000/getRandomItem",
      data: $.param(reqData),
    })
      .then((response) => {
        console.log("something really good happened");
        console.log(response);
        newProduct = response;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("alskdjfalksdjf", newProduct);

    setCurProducts([
      curProducts[1],
      {
        title: newProduct[0].title,
        price: newProduct[0].price,
        imageSrc: newProduct[0].img,
        // title: newProduct.title,
        // price: newProduct.price,
        // imageSrc: newProduct.img,
      },
    ]);
  };

  // useEffect(() => {
  //   var newProduct = getRandomItem(2);

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
