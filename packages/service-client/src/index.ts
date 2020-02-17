import axios from "axios";
import CONFIG from "./config";

const instance = axios.create({
  baseURL: CONFIG.PRODUCTION_HOST
});

const cdbCalculation = () => {
  axios.post("/cdb/post-fixed", {});
};

export default cdbCalculation;
