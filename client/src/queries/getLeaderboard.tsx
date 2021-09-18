import axios from "axios";

const getLeaderboard = () => {
  return axios
    .get(`http://localhost:5000/getLeaderboard/`)
    .then((response) => response.data);
};

export default getLeaderboard;
