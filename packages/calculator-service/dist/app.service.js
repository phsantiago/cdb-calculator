"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const marketData = require("./marketData.json");
let AppService = class AppService {
    getHello() {
        return 'Health check ok!';
    }
    calculateTCDI(CDI) {
        const TCDI = Math.pow((CDI / 100) + 1, 1 / 252) - 1;
        return Number(TCDI.toFixed(8));
    }
    acumulatedTCDI({ n, tcdi, tcdb, price }) {
        let resultTCDI = 1;
        for (let i = 0; i <= n; i++) {
            resultTCDI *= (1 + tcdi * tcdb / 100);
        }
        return Number(resultTCDI * price);
    }
    calculateCDB({ investmentDate, currentDate, cdbRate, price = 1000 }) {
        const momentInvestmentDate = moment_1.default(investmentDate, "YYYY-MM-DD");
        const momentCurrentDate = moment_1.default(currentDate, "YYYY-MM-DD");
        const treatedMarketData = marketData
            .map((_a) => {
            var { dtDate } = _a, rest = __rest(_a, ["dtDate"]);
            return (Object.assign({ date: moment_1.default(dtDate, "DD/MM/YYYY") }, rest));
        })
            .map((_a) => {
            var { sSecurityName } = _a, rest = __rest(_a, ["sSecurityName"]);
            return rest;
        });
        const marketDataSlice = treatedMarketData.filter(({ date }) => {
            if (date.isSameOrAfter(momentInvestmentDate) && date.isSameOrBefore(momentCurrentDate))
                return true;
        });
        const sorted = marketDataSlice.sort(({ date: dateA }, { date: dateB }) => dateA.unix() - dateB.unix());
        const calculated = sorted.map((_a, index) => {
            var { dLastTradePrice } = _a, rest = __rest(_a, ["dLastTradePrice"]);
            return (Object.assign({ unitPrice: this.acumulatedTCDI({
                    n: index,
                    tcdi: this.calculateTCDI(dLastTradePrice),
                    tcdb: cdbRate,
                    price
                }) }, rest));
        });
        const formated = calculated
            .map((_a) => {
            var { date } = _a, rest = __rest(_a, ["date"]);
            return (Object.assign({ date: date.format('YYYY-MM-DD') }, rest));
        })
            .map((_a) => {
            var { unitPrice } = _a, rest = __rest(_a, ["unitPrice"]);
            return (Object.assign({ unitPrice: Number(unitPrice.toFixed(5)) }, rest));
        });
        return formated;
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map