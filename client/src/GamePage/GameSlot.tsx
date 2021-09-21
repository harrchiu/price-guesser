import classNames from "classnames";
import React from "react";
import { Product, GameState } from "./index";

import "./index.css";

const GameSlot: React.FC<{
  product: Product;
  gameState: GameState;
  isButtonDisabled: boolean;
  isHigherPrice: boolean;
  buttonClick: (price: number) => void;
}> = ({ product, gameState, isButtonDisabled, isHigherPrice, buttonClick }) => {
  const isPriceVisible = gameState !== GameState.WAITING_FOR_RESPONSE;

  return (
    <div
      className="game-slot"
      style={{
        backgroundImage: `url(${product.imageSrc})`,
      }}
    >
      <div className="game-slot__mask">
        <div className="product-info-roof" />
        <div className="product-info-upper">
          <div className="product-info__title">{product.title}</div>
        </div>
        <div className="product-info-lower">
          {isPriceVisible ? (
            <div
              className={classNames("product-info__price", {
                "product-info__price--higher": isHigherPrice,
              })}
            >
              ${product.price.toFixed(2)}
            </div>
          ) : (
            <div className="product-info__price--dummy">$nice try</div>
          )}
          <button
            className="product-info__button"
            onClick={() => {
              buttonClick(product.price);
            }}
            disabled={isButtonDisabled}
          >
            This one!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSlot;
