import axios from "axios";
import { Product } from "../GamePage";

// const getRandomProduct = async (cnt: number) => {
//   return await axios
//     .get(`http://localhost:5000/getRandomItem/${cnt}`)
//     .then((response) => response.data);
// };
const getRandomProduct = async (cnt: number) => {
  return await axios
    .get(`http://localhost:5000/getRandomItem/${cnt}`)
    .then((response) => response.data);
};

export default getRandomProduct;
