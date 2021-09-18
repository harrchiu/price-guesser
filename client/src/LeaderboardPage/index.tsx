import axios from "axios";
import { useEffect, useState } from "react";
import HeaderSection from "../HeaderSection";
import getLeaderboard from "../queries/getLeaderboard";

import "./index.css";

type Leaderboard = {
  names: string[];
  dates: number[];
  scores: number[];
};

const formatDate = (unixTimeStamp: number) => {
  var retString = "";

  const date = new Date(unixTimeStamp * 1000);
  console.log("ddadfalskj", date);
  retString += date.toUTCString();
  retString = retString.substring(0, retString.length - 4);

  return retString;
};

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard>({
    names: [],
    dates: [],
    scores: [],
  });
  var response = getLeaderboard();

  // render two products on page load
  useEffect(() => {
    response.then((res) => {
      setLeaderboard(res);
    });

    console.log(leaderboard);
  }, []);

  return (
    <>
      <div className="leaderboard-page">
        <table className="leaderboard-table">
          <tbody>
            <tr>
              <th>Place</th>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
            {leaderboard.names.map((name: string, index) => {
              console.log("id", index);
              console.log(leaderboard.names[index]);
              console.log(
                new Date(leaderboard.dates[index] * 1000).toDateString()
              );
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{leaderboard.names[index]}</td>
                  <td>{leaderboard.scores[index]}</td>
                  <td>{formatDate(leaderboard.dates[index])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <HeaderSection isLeaderboards={true} />
    </>
  );
};

export default LeaderboardPage;
