import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { CalculationResult } from "@cdb-calculator/typings";

type Props = {
  data: CalculationResult;
};

const Chart: React.FC<Props> = ({ data }) => (
  <ComposedChart
    width={document.body.clientWidth - 100}
    height={400}
    data={data}
    style={{ marginLeft: 20, marginRight: 20 }}
  >
    <XAxis
      interval="preserveStartEnd"
      ticks={[data[0].date, data[data.length - 1].date]}
      dataKey="date"
    />
    <Tooltip label="" labelFormatter={() => "aaa"} />
    <Bar dataKey="unitPrice" barSize={5} fill="#40d79f" />
  </ComposedChart>
);

export default Chart;
