import { Injectable } from '@nestjs/common';
import moment from 'moment';
import marketData = require('./marketData.json');

type datePrice = {
  date: string,
  unitPrice: number
}

type postFixedCdbDTO = {
  investmentDate: string,
  cdbRate: number,
  currentDate: string,
  price?: number
}

/* type cdbCalcResult = Array<datePrice>; */
const calculateUnitPrice = a => a;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Health check ok!';
  }
  calculateTCDI(CDI) {
    return 1
  }
  calculateCDB({ investmentDate, currentDate })/*: cdbCalcResult*/ {
    const momentInvestmentDate = moment(investmentDate, "YYYY-MM-DD");
    const momentCurrentDate = moment(currentDate, "YYYY-MM-DD");
    const treatedMarketData = marketData
      .map(({ dtDate, ...rest }) => ({ date: moment(dtDate, "DD/MM/YYYY"), ...rest}))
      .map(({ sSecurityName, ...rest }) => rest);
 
    const marketDataSlice = treatedMarketData.filter(({ date }) => {
      if(date.isSameOrAfter(momentInvestmentDate) && date.isSameOrBefore(momentCurrentDate)) return true
    }) 

    const sorted = marketDataSlice.sort(({date: dateA}, {date: dateB}) => dateA.unix() - dateB.unix())

    const calculated = sorted.map(({ dLastTradePrice, ...rest }) => ({ unitPrice: calculateUnitPrice(dLastTradePrice), ...rest}))

    const dateFormated = calculated.map(({ date, ...rest }) => ({ date: date.format('YYYY-MM-DD'), ...rest }));
    return dateFormated;
  }
}



