"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const axios_1 = __importDefault(require("axios"));
describe("cdbCalculation", () => {
    it("should perform a post on /cdb/post-fixed", async () => {
        jest.spyOn(axios_1.default, "post").mockImplementation(jest.fn());
        const mock = {
            investmentDate: "2010-01-01",
            currentDate: "2010-01-01",
            cdbRate: 103
        };
        await index_1.default(mock);
        expect(axios_1.default.post).toBeCalledWith("/cdb/post-fixed", mock);
    });
});
//# sourceMappingURL=index.spec.js.map