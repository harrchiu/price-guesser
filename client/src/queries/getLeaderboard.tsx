import axios from "axios";
import { ROOT_API_URL } from "../publicConstants";

const getLeaderboard = () => {
  return axios
    .get(`${ROOT_API_URL}/getLeaderboard/`)
    .then((response) => response.data);
};

export default getLeaderboard;
