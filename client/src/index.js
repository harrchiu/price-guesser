import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import GamePage from "./GamePage";
import LeaderboardPage from "./LeaderboardPage";
import { Helmet } from "react-helmet";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Helmet
      link={[
        {
          rel: "icon",
          type: "image/png",
          href: "src/media/dollar-bag.png",
        },
      ]}
    >
      <title>Price Guesser</title>
    </Helmet>
    <Router>
      <Switch>
        <Route path="/" exact render={() => <GamePage />} />
        <Route
          path={["/leaderboard", "/leaderboards"]}
          exact
          render={() => <LeaderboardPage />}
        />
        <Route render={() => <GamePage />} />
      </Switch>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
