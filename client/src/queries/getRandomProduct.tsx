import axios from "axios";
import { ROOT_API_URL } from "../publicConstants";

const getRandomProduct = (cnt: number) => {
  return axios
    .get(`${ROOT_API_URL}/getRandomItem/${cnt}`)
    .then((response) => response.data);
};

export default getRandomProduct;
