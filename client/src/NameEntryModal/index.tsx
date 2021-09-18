import React from "react";
import cookie from "cookie";

import "./index.css";

const NameEntry: React.FC<{
  isVisible: Boolean;
  setVisible: Function;
}> = ({ isVisible, setVisible }) => {
  console.log(typeof setVisible);
  return (
    isVisible && (
      <div className="name-entry-modal-mask">
        <div className="name-entry-modal">
          <div className="name-entry-modal__title">
            Welcome to Price Guesser!
          </div>
          <div className="name-entry-modal__description">
            Two Amazon-listed products will appear at a time. Choose which one
            is more expensive and aim to get the highest score.
            <br />
            <br />
            <i>any leaderboarders?</i>
          </div>
          <button
            className="name-entry-modal__proceed"
            onClick={() => {
              document.cookie = cookie.serialize(
                "lastVisit",
                Math.round(Date.now() / 1000).toString()
              );
              setVisible(false);
            }}
          >
            Okay!
          </button>
        </div>
      </div>
    )
  );
};

export default NewPlayerModal;
