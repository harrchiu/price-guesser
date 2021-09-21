import React from "react";
import cookie from "cookie";

import "./index.css";

const NewPlayerModal: React.FC<{
  isVisible: Boolean;
  setVisible: Function;
}> = ({ isVisible, setVisible }) => {
  return (
    isVisible && (
      <div className="new-player-modal-mask">
        <div className="new-player-modal">
          <div className="new-player-modal__title">
            Welcome to Price Guesser!
          </div>
          <div className="new-player-modal__description">
            Two Amazon-listed products will appear at a time. Choose which one
            is more expensive and aim to get the highest score.
            <br />
            <br />
            <i>any leaderboarders?</i>
          </div>
          <button
            className="new-player-modal__proceed"
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
