import React from "react";
import { Product } from "./index";
import "./index.css";

const GameSlot: React.FC<{ product: Product; buttonClick: () => void }> = ({
  product,
  buttonClick,
}) => {
  return (
    <div
      className="game-slot"
      style={{
        backgroundImage: `url(${product.imageSrc})`,
      }}
    >
      <div className="game-slot__mask">
        <div className="product-info">
          <div className="product-info__title">{product.title}</div>
          <div className="product-info__price">${product.price}</div>
        </div>
        <button
          className="product-info__button"
          onClick={() => {
            buttonClick();
          }}
        >
          This one!
        </button>
      </div>
    </div>
  );
};

export default GameSlot;
