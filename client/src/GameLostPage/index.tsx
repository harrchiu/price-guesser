import {
  PUBLIC_PAGE_URL,
  AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER,
  LOW_SCORE_LOSING_VERBS,
  LOSING_VERBS,
} from "../publicConstants";

import "./index.css";

const GameLostPage: React.FC<{ score: number }> = ({ score }) => {
  const theJeffFactor =
    Math.floor(
      Math.random() * AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER
    ) + 1;

  const losingVerbArr = score <= 2 ? LOW_SCORE_LOSING_VERBS : LOSING_VERBS;
  const losingVerb =
    losingVerbArr[Math.floor(Math.random() * losingVerbArr.length)];

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
        <div className="game-lost-page__message">you lost :(</div>
        <div className="game-lost-page__score">
          You price guessed {score} product{score !== 1 ? "s" : ""} correctly
          after {losingVerb}
        </div>
        <button
          onClick={() => {
            window.location.replace(PUBLIC_PAGE_URL);
          }}
        >
          Play again!
        </button>
      </div>
    </div>
  );
};

export default GameLostPage;
