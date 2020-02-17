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
const DATE_SQL_FORMAT = 'YYYY-MM-DD';
const DATE_BR_FORMAT = 'DD-MM-YYYY';
const property = prop => ({
    toMoment: obj => (Object.assign(Object.assign({}, obj), { [prop]: moment_1.default(obj[prop], DATE_BR_FORMAT) })),
});
const renameProperty = prop => ({
    into: name => obj => {
        const hold = obj[prop];
        delete obj[prop];
        obj[name] = hold;
        return obj;
    },
});
const removeProperty = prop => obj => {
    delete obj[prop];
    return obj;
};
const dateBetween = (start, end) => ({ date }) => {
    if (date.isSameOrAfter(start) && date.isSameOrBefore(end))
        return true;
};
const dateDescending = ({ date: dateA }, { date: dateB }) => dateA.unix() - dateB.unix();
let CdbService = class CdbService {
    calculateTCDI(CDI) {
        const TCDI = Math.pow(CDI / 100 + 1, 1 / 252) - 1;
        return Number(TCDI.toFixed(8));
    }
    acumulatedTCDI({ n, tcdi, tcdb }) {
        let resultTCDI = 1;
        for (let i = 0; i <= n; i++) {
            resultTCDI *= 1 + (tcdi * tcdb) / 100;
        }
        return Number(resultTCDI);
    }
    calculateCDB({ investmentDate: receivedInvestmentDate, currentDate: receivedCurrentDate, cdbRate, price = 1000, }) {
        const investmentDate = moment_1.default(receivedInvestmentDate, DATE_SQL_FORMAT);
        const currentDate = moment_1.default(receivedCurrentDate, DATE_SQL_FORMAT);
        return marketData
            .map(property('dtDate').toMoment)
            .map(renameProperty('dtDate').into('date'))
            .filter(dateBetween(investmentDate, currentDate))
            .sort(dateDescending)
            .map((_a, index) => {
            var { dLastTradePrice } = _a, rest = __rest(_a, ["dLastTradePrice"]);
            return (Object.assign({ unitPrice: this.acumulatedTCDI({
                    n: index,
                    tcdi: this.calculateTCDI(dLastTradePrice),
                    tcdb: cdbRate,
                }) }, rest));
        })
            .map((_a) => {
            var { date } = _a, rest = __rest(_a, ["date"]);
            return (Object.assign({ date: date.format(DATE_SQL_FORMAT) }, rest));
        })
            .map(removeProperty('sSecurityName'))
            .map((_a) => {
            var { unitPrice } = _a, rest = __rest(_a, ["unitPrice"]);
            return (Object.assign({ unitPrice: price * unitPrice }, rest));
        })
            .map((_a) => {
            var { unitPrice } = _a, rest = __rest(_a, ["unitPrice"]);
            return (Object.assign({ unitPrice: Number(unitPrice.toFixed(5)) }, rest));
        });
    }
};
CdbService = __decorate([
    common_1.Injectable()
], CdbService);
exports.CdbService = CdbService;
//# sourceMappingURL=service.js.map