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

type GameInfo = {
  name: string;
  score: number;
  unixDate: number;
};

const GameLostPage: React.FC<{ score: number }> = ({ score }) => {
  const [playerName, setPlayerName] = useState<string>("");

  const [losingPhrase, setLosingPhrase] = useState("");
  const [pageBackground, setPageBackground] = useState("");

  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

  const submitName = () => {
    if (!playerName.trim()) {
      alert("Enter a valid name and try again.");
      return;
    }

    document.cookie = cookie.serialize("playerName", playerName.trim());
    upsertLeaderboard({
      name: playerName.trim(),
      score: score,
      unixDate: Math.floor(Date.now() / 1000),
    });
    setIsScoreSubmitted(true);
  };

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
    setPlayerName(cookie.parse(document.cookie).playerName);
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
                  setPlayerName(event.target.value);
                }}
                placeholder="Your name"
                defaultValue={cookie.parse(document.cookie).playerName}
                disabled={isScoreSubmitted}
                maxLength={10}
              />
              <div className="name-collection__button-wrapper">
                <button
                  className="name-collection__button"
                  onClick={() => {
                    submitName();
                  }}
                  disabled={isScoreSubmitted}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { GameInfo };
export default GameLostPage;
