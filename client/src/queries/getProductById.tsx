import axios from "axios";
import { ROOT_API_URL } from "../publicConstants";

const getProductById = (id: string) => {
  return axios
    .get(`${ROOT_API_URL}/getProductById/${id}`)
    .then((response) => response.data);
};

export default getProductById;
