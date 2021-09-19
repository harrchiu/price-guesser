import axios from "axios";
import { GameInfo } from "../GameLostPage";
import { Leaderboard } from "../LeaderboardPage";
import getLeaderboard from "../queries/getLeaderboard";

// for an array that is ~decreasing~
// returns the first index that "insert" can belong (newest scores go first)
const binarySearch = (arr: number[], insert: number): number => {
  // empty array
  if (arr.length === 0) return 0;

  var lb = 0,
    rb = arr.length - 1,
    mb = -1;
  while (lb <= rb) {
    mb = Math.floor((rb - lb) / 2 + lb);
    if (insert >= arr[mb] && mb !== 0 && insert < arr[mb - 1]) {
      return mb;
    }
    if (insert >= arr[mb]) {
      rb = mb - 1;
    } else {
      lb = mb + 1;
    }
  }

  if (mb === arr.length - 1 && insert < arr[mb]) {
    // need to pop off :(
    return mb + 1;
  }
  return mb;
};

const upsertLeaderboard = (game: GameInfo) => {
  //   const arr = [12, 12, 8, 8, 8, 3, 1];
  //   const key = 7;
  //   console.log("bin result", arr, arr.splice(binarySearch(arr, key), 0, key));

  var response = getLeaderboard();
  response.then((res) => {
    const indexToInsert = binarySearch(res.scores, game.score);

    res.names.splice(indexToInsert, 0, game.name.toString());
    res.scores.splice(indexToInsert, 0, game.score.toString());
    res.dates.splice(indexToInsert, 0, game.unixDate.toString());

    var leaderboard: Leaderboard = {
      names: res.names,
      scores: res.scores,
      dates: res.dates,
    };

    console.log("inside res", res);
    console.log("inside", leaderboard);

    axios
      .post("http://localhost:5000/upsertLeaderboard", {
        names_1: leaderboard.names,
        scores_1: leaderboard.scores,
        dates_1: leaderboard.dates,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export default upsertLeaderboard;
