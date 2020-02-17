"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("./config"));
const instance = axios_1.default.create({
    baseURL: config_1.default.PRODUCTION_HOST
});
const cdbCalculation = (data) => instance.post("/cdb/post-fixed", data);
exports.default = cdbCalculation;
//# sourceMappingURL=index.js.map