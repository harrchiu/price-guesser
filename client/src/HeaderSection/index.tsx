import classNames from "classnames";

import "./index.css";

const HeaderSection: React.FC<{ isLeaderboards?: Boolean }> = ({
  isLeaderboards = false,
}) => {
  return (
    <div
      className={classNames("header-wrapper", {
        "header-wrapper--dark": isLeaderboards,
      })}
    >
      {isLeaderboards && <a href="/">Home</a>}
      {!isLeaderboards && <a href="/leaderboard">Leaderboards</a>}
      <a href="https://github.com/harrchiu/price-guesser" target="_blank">
        Github
      </a>
      <a href="mailto:harrchiu@gmail.com" target="_blank" className="me-me-me">
        @harrchiu
      </a>
    </div>
  );
};

export default HeaderSection;
