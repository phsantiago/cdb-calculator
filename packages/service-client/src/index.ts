import axios, { AxiosPromise } from "axios";
import { CalculationResult } from "@cdb-calculator/typings";
import CONFIG from "./config";

const instance = axios.create({
  baseURL: CONFIG.PRODUCTION_HOST
});

const cdbCalculation = (): AxiosPromise<CalculationResult> =>
  axios.post("/cdb/post-fixed", {});

export default cdbCalculation;
