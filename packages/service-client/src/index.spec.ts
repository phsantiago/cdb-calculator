import cdbCalculation from "./index";
import axios from "axios";

describe("cdbCalculation", () => {
  const axiosPost = axios.post as jest.Mock;

  it("should perform a post on /cdb/post-fixed", async () => {
    axiosPost.mockImplementation(jest.fn());
    const mock = {
      investmentDate: "2010-01-01",
      currentDate: "2010-01-01",
      cdbRate: 103
    };

    await cdbCalculation(mock);

    expect(axiosPost).toBeCalledWith("/cdb/post-fixed", mock);
  });
});
