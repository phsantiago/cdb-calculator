import { AxiosPromise } from "axios";
import { CalculationResult, InputCDBcalculation } from "@cdb-calculator/typings";
declare const cdbCalculation: (data: InputCDBcalculation) => AxiosPromise<CalculationResult>;
export default cdbCalculation;
