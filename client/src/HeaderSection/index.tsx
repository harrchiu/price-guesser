import classNames from "classnames";
import { ReactElement } from "react";

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
      {isLeaderboards ? (
        <a href="/">Home</a>
      ) : (
        <a href="/leaderboard">Leaderboards</a>
      )}
      <a href="https://github.com/harrchiu/price-guesser" target="_blank">
        Github
      </a>
      <a href="mailto:harrchiu@gmail.com" target="_blank" className="me-me-me">
        @harrchiu
      </a>
    </div>
  );
};

const FooterSection: React.FC<{ component: ReactElement }> = ({
  component,
}) => {
  return <div className={"footer-wrapper"}>{component}</div>;
};

export { HeaderSection, FooterSection };
export default HeaderSection;
