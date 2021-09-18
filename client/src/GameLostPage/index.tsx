import {
  HOME_PAGE_URL,
  AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER,
  LOW_SCORE_LOSING_PHRASES,
  LOSING_PHRASES,
} from "../publicConstants";

import "./index.css";

const GameLostPage: React.FC<{ score: number }> = ({ score }) => {
  const theJeffFactor =
    Math.floor(
      Math.random() * AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER
    ) + 1;

  const losingPhraseArr =
    score <= 2 ? LOW_SCORE_LOSING_PHRASES : LOSING_PHRASES;
  const losingPhrase =
    losingPhraseArr[Math.floor(Math.random() * losingPhraseArr.length)];

  var pageBackground;

  try {
    pageBackground =
      require(`../media/jeff-bezos-${theJeffFactor}.gif`).default;
  } catch (error) {
    console.log(error);
  }

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
        </div>
      </div>
    </div>
  );
};

export default GameLostPage;
