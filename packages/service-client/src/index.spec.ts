import cdbCalculation from "./index";
import axios from "axios";

describe("cdbCalculation", () => {
  it("should perform a post on /cdb/post-fixed", async () => {
    jest.spyOn(axios, "post").mockImplementation(jest.fn());

    await cdbCalculation();

    expect(axios.post).toBeCalledWith("/cdb/post-fixed", {});
  });
});
