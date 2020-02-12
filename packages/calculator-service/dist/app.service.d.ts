declare type datePrice = {
    date: string;
    unitPrice: number;
};
declare type cdbCalcResult = Array<datePrice>;
export declare class AppService {
    getHello(): string;
    calculateTCDI(CDI: any): number;
    acumulatedTCDI({ n, tcdi, tcdb, price }: {
        n: any;
        tcdi: any;
        tcdb: any;
        price: any;
    }): number;
    calculateCDB({ investmentDate, currentDate, cdbRate, price }: {
        investmentDate: any;
        currentDate: any;
        cdbRate: any;
        price?: number;
    }): cdbCalcResult;
}
export {};
