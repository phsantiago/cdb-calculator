import { CalculationResult } from '@cdb-calculator/typings';
export declare class CdbService {
    calculateTCDI(CDI: any): number;
    acumulatedTCDI({ n, tcdi, tcdb }: {
        n: any;
        tcdi: any;
        tcdb: any;
    }): number;
    calculateCDB({ investmentDate: receivedInvestmentDate, currentDate: receivedCurrentDate, cdbRate, price, }: {
        investmentDate: any;
        currentDate: any;
        cdbRate: any;
        price?: number;
    }): CalculationResult;
}
