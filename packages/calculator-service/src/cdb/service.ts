import { Injectable } from '@nestjs/common';
import moment from 'moment';
import marketData = require('./marketData.json');

type datePrice = {
  date: string,
  unitPrice: number
}

type cdbCalcResult = Array<datePrice>;


    const DATE_SQL_FORMAT = "YYYY-MM-DD";
    const DATE_BR_FORMAT = "DD-MM-YYYY";
    
    const property = prop => ({ toMoment: obj => ({
      ...obj,
      [prop]: moment(obj[prop], DATE_BR_FORMAT),
      }),
    });
    const renameProperty = prop => ({ into: name => obj => {
        const hold = obj[prop];
        delete obj[prop];
        obj[name] = hold;
        return obj;
      }
    })
    const removeProperty = prop => obj => {
      delete obj[prop]
      return obj;
    };
    const dateBetween = (start, end) => ({ date }) => {
      if(date.isSameOrAfter(start) && date.isSameOrBefore(end)) return true
    }
    const dateDescending = ({date: dateA}, {date: dateB}) => dateA.unix() - dateB.unix() 

@Injectable()
export class AppService {
  calculateTCDI(CDI) {
    const TCDI = Math.pow((CDI/100)+1, 1/252) - 1
    return Number(TCDI.toFixed(8));
  }

  acumulatedTCDI({ n, tcdi, tcdb }) {
    let resultTCDI = 1;
    for(let i = 0; i <= n; i++) {
      resultTCDI *= (1 + tcdi * tcdb / 100)
    }
    return Number(resultTCDI);
  }


  calculateCDB({
    investmentDate: receivedInvestmentDate,
    currentDate: receivedCurrentDate,
    cdbRate,
    price = 1000 
  }): cdbCalcResult {
    const investmentDate = moment(receivedInvestmentDate, DATE_SQL_FORMAT);
    const currentDate = moment(receivedCurrentDate, DATE_SQL_FORMAT);

    return marketData
      .map(property('dtDate').toMoment)
      .map(renameProperty('dtDate').into('date'))
      .filter(dateBetween(investmentDate, currentDate)) 
      .sort(dateDescending)
      .map((({ dLastTradePrice, ...rest }, index) => ({ 
        unitPrice: this.acumulatedTCDI({
          n: index,
          tcdi: this.calculateTCDI(dLastTradePrice),
          tcdb: cdbRate,
        }),
        ...rest,
      })))
      .map(({ date, ...rest }) => ({ date: date.format(DATE_SQL_FORMAT), ...rest }))
      .map(removeProperty('sSecurityName'))
      .map(({ unitPrice, ...rest }) => ({ unitPrice: price * unitPrice, ...rest }))
      .map(({ unitPrice, ...rest }) => ({ unitPrice: Number(unitPrice.toFixed(5)), ...rest }))
  }
}



