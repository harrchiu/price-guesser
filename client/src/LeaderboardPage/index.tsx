import axios from "axios";
import { useEffect, useState } from "react";
import HeaderSection, { FooterSection } from "../HeaderSection";
import getLeaderboard from "../queries/getLeaderboard";
import classNames from "classnames";
import { MONTHS } from "../publicConstants";

import "./index.css";

const PLAYERS_TO_DISPLAY = 10;

type Leaderboard = {
  names: string[];
  dates: number[];
  scores: number[];
};

const extractDateWithTz = (unixTimeStamp: number, tzString: string) => {
  var dateArr: string[] = [];
  const rawDate = new Date(unixTimeStamp * 1000);
  dateArr = dateArr.concat(
    rawDate
      .toLocaleDateString("en-US", {
        timeZone: tzString,
      })
      .split("/")
  );
  dateArr = dateArr.concat(
    rawDate
      .toLocaleTimeString("en-US", {
        timeZone: tzString,
      })
      .split(" ")
  );
  return dateArr;
};

const formatDate = (unixTimeStamp: number, tzString: string) => {
  const nownow = Math.round(Date.now() / 1000);
  var dateArr = [];

  try {
    dateArr = extractDateWithTz(unixTimeStamp, tzString);
  } catch {
    dateArr = extractDateWithTz(unixTimeStamp, "America/Toronto");
  }
  console.log(dateArr);

  var retString =
    dateArr[1] +
    " " +
    MONTHS[parseInt(dateArr[0]) - 1] +
    " " +
    dateArr[2] +
    ", " +
    dateArr[3] +
    " " +
    dateArr[4];

  return retString;
};

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();
  const [tzString, setTzString] = useState<string>("America/Toronto");

  useEffect(() => {
    setTzString(Intl.DateTimeFormat().resolvedOptions().timeZone);

    var response = getLeaderboard();

    response.then((res) => {
      setLeaderboard({
        names: res.names.slice(0, PLAYERS_TO_DISPLAY),
        scores: res.scores.slice(0, PLAYERS_TO_DISPLAY),
        dates: res.dates.slice(0, PLAYERS_TO_DISPLAY),
      });
    });
  }, []);

  if (leaderboard === undefined) {
    return <></>;
  } else
    return (
      <>
        <div className="leaderboard-page">
          <table className="leaderboard-table">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
              {leaderboard.names.map((name: string, index) => {
                return (
                  <tr className={`leaderboard-table-${index + 1}-place`}>
                    <td>{index + 1}</td>
                    <td
                      className={classNames({
                        "leaderboard-table-bold": index < 3,
                      })}
                    >
                      {leaderboard.names[index]}
                    </td>
                    <td>{leaderboard.scores[index]}</td>
                    <td className="leaderboard-table__date">
                      {formatDate(leaderboard.dates[index], tzString)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <FooterSection
          component={
            <div className="timezone-statement">
              You're in {tzString ? ` (${tzString})` : ""}, right?
            </div>
          }
        />
        <HeaderSection isLeaderboards={true} />
      </>
    );
};

export type { Leaderboard };
export default LeaderboardPage;
