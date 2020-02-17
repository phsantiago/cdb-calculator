export type datePrice = {
  date: string;
  unitPrice: number;
};

export type CalculationResult = Array<datePrice>;

export type InputCDBcalculation = {
  investmentDate: string;
  cdbRate: number;
  currentDate: string;
  price?: number;
};
