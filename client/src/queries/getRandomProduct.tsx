import axios from "axios";
import { Product } from "../GamePage";

const getRandomProduct = (cnt: number): any => {
  var queryResponse;
  axios
    .get("http://localhost:5000/getRandomItem?count=2")
    .then((response) => {
      // console.log("something good happened");
      // console.log(response);
      queryResponse = response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return queryResponse;
};

export default getRandomProduct;
