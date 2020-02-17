import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getNodeText
} from "@testing-library/react";
import calculateRemote from "@cdb-calculator/service-client";
import App from "./App";

jest.mock("@cdb-calculator/service-client");

const input = (element: any, value: string) =>
  fireEvent.change(element, {
    target: { value }
  });

describe("when send form informations", () => {
  const mockCalculateRemote = calculateRemote as jest.Mock;

  it("shows the results", async () => {
    mockCalculateRemote.mockResolvedValue({
      data: [{ unitPrice: 100, date: "2020" }]
    });
    const { getByTestId } = render(<App />);
    input(getByTestId("investmentDate"), "2010-02-01");
    input(getByTestId("currentDate"), "2010-02-03");
    input(getByTestId("cdbRate"), "102");

    fireEvent.click(getByTestId("send"));

    const result = await waitForElement(() => getByTestId("final-value"));

    expect(getNodeText(result)).toContain("Valor final: 100 R$");
  });
});
