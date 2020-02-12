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

type cdbCalcResult = Array<datePrice>;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Health check ok!';
  }
  calculateTCDI(CDI) {
    const TCDI = Math.pow((CDI/100)+1, 1/252) - 1
    return Number(TCDI.toFixed(8));
  }

  acumulatedTCDI({ n, tcdi, tcdb, price }) {
    let resultTCDI = 1;
    for(let i = 0; i <= n; i++) {
      resultTCDI *= (1 + tcdi * tcdb / 100)
    }
    return Number(resultTCDI * price);
  }

  calculateCDB({ investmentDate, currentDate, cdbRate, price = 1000 }): cdbCalcResult {
    const momentInvestmentDate = moment(investmentDate, "YYYY-MM-DD");
    const momentCurrentDate = moment(currentDate, "YYYY-MM-DD");
    const treatedMarketData = marketData
      .map(({ dtDate, ...rest }) => ({ date: moment(dtDate, "DD/MM/YYYY"), ...rest}))
      .map(({ sSecurityName, ...rest }) => rest);
 
    const marketDataSlice = treatedMarketData.filter(({ date }) => {
      if(date.isSameOrAfter(momentInvestmentDate) && date.isSameOrBefore(momentCurrentDate)) return true
    }) 

    const sorted = marketDataSlice.sort(({date: dateA}, {date: dateB}) => dateA.unix() - dateB.unix())

    const calculated = sorted.map(({ dLastTradePrice, ...rest }, index) =>
      ({ 
        unitPrice: this.acumulatedTCDI({
          n: index,
          tcdi: this.calculateTCDI(dLastTradePrice),
          tcdb: cdbRate,
          price
        }),
        ...rest,
      })
    );

    const formated = calculated
      .map(({ date, ...rest }) => ({ date: date.format('YYYY-MM-DD'), ...rest }))
      .map(({ unitPrice, ...rest }) => ({ unitPrice: Number(unitPrice.toFixed(5)), ...rest }));

    return formated;
  }
}



