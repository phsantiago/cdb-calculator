import React from "react";
import { Chart } from "react-charts";

const data = {
  series: 8,
  datums: 3,
  dataType: "ordinal"
};
export default () => {
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false }
    ],
    []
  );
  return <Chart data={data} series={series} axes={axes} tooltip />;
};
