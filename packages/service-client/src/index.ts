import axios, { AxiosPromise } from "axios";
import {
  CalculationResult,
  InputCDBcalculation
} from "@cdb-calculator/typings";
import CONFIG from "./config";

const instance = axios.create({
  baseURL: CONFIG.PRODUCTION_HOST
});

const cdbCalculation = (
  data: InputCDBcalculation
): AxiosPromise<CalculationResult> => instance.post("/cdb/post-fixed", data);

export default cdbCalculation;
