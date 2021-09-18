import {
  HOME_PAGE_URL,
  AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER,
  LOW_SCORE_LOSING_PHRASES,
  LOSING_PHRASES,
} from "../publicConstants";
import upsertLeaderboard from "../mutations/upsertLeaderboard";
import cookie from "cookie";
import { useEffect, useState } from "react";

import "./index.css";

const GameLostPage: React.FC<{ score: number }> = ({ score }) => {
  var curUnixTime;

  const [playerName, setPlayerName] = useState<string>("");
  const [holdingPlayerName, setHoldingPlayerName] = useState<string>("");

  const [losingPhrase, setLosingPhrase] = useState("");
  const [pageBackground, setPageBackground] = useState("");

  useEffect(() => {
    const theJeffFactor =
      Math.floor(
        Math.random() * AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER
      ) + 1;
    const losingPhraseArr =
      score <= 2 ? LOW_SCORE_LOSING_PHRASES : LOSING_PHRASES;
    setLosingPhrase(
      losingPhraseArr[Math.floor(Math.random() * losingPhraseArr.length)]
    );

    try {
      setPageBackground(
        require(`../media/jeff-bezos-${theJeffFactor}.gif`).default
      );
    } catch (error) {
      console.log(error);
    }

    const cookies = cookie.parse(document.cookie);
    var lastVisitedTime, lastScore, cookieName;
    try {
      lastVisitedTime = parseInt(cookies?.lastVisit);
    } catch (error) {
      lastVisitedTime = -1;
      console.log(error);
    }
  }, []);

  return (
    <div
      className="game-lost-page"
      style={{
        backgroundImage: `url(${pageBackground})`,
      }}
    >
      <div className="game-lost-page__mask">
        <div className="game-lost-prompt">
          <div className="game-lost-prompt__message">You lost.</div>
          <div className="game-lost-prompt__score">
            You price guessed {score} product{score !== 1 ? "s" : ""} correctly{" "}
            {losingPhrase}
          </div>

          <div className="play-again-button-wrapper">
            <button
              className="play-again-button"
              onClick={() => {
                window.location.replace(HOME_PAGE_URL);
              }}
            >
              Play again!
            </button>
          </div>

          <div className="name-collection">
            <div className="name-collection__prompt">
              <i>save your score!</i>
            </div>
            <div className="name-collection__entry">
              <input
                className="name-collection__input"
                onChange={(event) => {
                  setHoldingPlayerName(event.target.value);
                }}
                placeholder={!!playerName ? playerName : "Your name"}
                maxLength={10}
              />
              <div className="name-collection__button-wrapper">
                <button
                  className="name-collection__button"
                  onClick={() => {
                    if (!holdingPlayerName) {
                      return;
                    }
                    setPlayerName(holdingPlayerName);
                    console.log(playerName);
                    cookie.serialize("playerName", playerName);
                    upsertLeaderboard();
                  }}
                >
                  {!playerName ? "Submit" : "Change Name"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLostPage;
