import axios from "axios";
import { Product } from "../GamePage";
import { ROOT_API_URL } from "../publicConstants";

// const getRandomProduct = async (cnt: number) => {
//   return await axios
//     .get(`http://localhost:5000/getRandomItem/${cnt}`)
//     .then((response) => response.data);
// };
const getRandomProduct = (cnt: number) => {
  return axios
    .get(`${ROOT_API_URL}/getRandomItem/${cnt}`)
    .then((response) => response.data);
};

export default getRandomProduct;
