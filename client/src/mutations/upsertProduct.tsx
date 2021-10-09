import axios from "axios";
import { ROOT_API_URL } from "../publicConstants";

const upsertProduct = async (product: any) => {
  await axios
    .post(ROOT_API_URL + "/upsertProduct", {
      product,
    })
    .then((result) => {
      return "product updated";
    })
    .catch((error) => {
      console.log(error);
    });
};

export default upsertProduct;
