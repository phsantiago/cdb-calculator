import React from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import { CalculationResult } from "@cdb-calculator/typings";

type Props = {
  data: CalculationResult;
};

const Chart: React.FC<Props> = ({ data }) => {
  const initial = data[0];
  const final = data[data.length - 1];
  return (
    <>
      <BarChart
        width={document.body.clientWidth - 100}
        height={400}
        data={data}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <XAxis
          interval="preserveStartEnd"
          ticks={[initial.date, final.date]}
          dataKey="date"
          tickSize={10}
          height={60}
          width={60}
          hide={true}
        />
        <Tooltip label="" labelFormatter={() => "aaa"} />
        <Bar dataKey="unitPrice" barSize={5} fill="#40d79f" />
      </BarChart>
      <div>Valor inicial: {initial.unitPrice.toLocaleString("pt-BR")} R$</div>
      <div>Valor final: {final.unitPrice.toLocaleString("pt-BR")} R$</div>
      <br />
    </>
  );
};

export default Chart;
