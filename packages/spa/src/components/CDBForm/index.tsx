import React, { useState } from "react";
import { InputCDBcalculation } from "@cdb-calculator/typings";
import TextField from "@material-ui/core/TextField";
import GorilaButton from "../GorilaButton";

type Props = {
  onSend: (arg0: InputCDBcalculation) => void;
};

const Input = (props: any) => <TextField {...props} />;

const CDBForm = ({ onSend }: Props) => {
  const [data, setData] = useState<InputCDBcalculation>({
    investmentDate: "2016-04-01",
    cdbRate: 103,
    currentDate: "2016-08-06"
  });
  const onClick = () => onSend(data);

  const onChange = (field: keyof InputCDBcalculation) => (
    event: React.BaseSyntheticEvent
  ) => setData({ ...data, [field]: event.target.value });
  return (
    <>
      <Input
        onChange={onChange("investmentDate")}
        label="Data do investimento"
        value={data.investmentDate}
        inputProps={{ "data-testid": "investmentDate" }}
      />
      <br />
      <Input
        onChange={onChange("currentDate")}
        value={data.currentDate}
        label="Data resultado"
        inputProps={{ "data-testid": "currentDate" }}
      />
      <br />
      <Input
        onChange={onChange("price")}
        value={data.price}
        label="Valor investido"
      />
      <br />
      <Input
        onChange={onChange("cdbRate")}
        value={data.cdbRate}
        label="Taxa CDB"
        inputProps={{ "data-testid": "cdbRate" }}
      />
      <br />
      <br />
      <GorilaButton data-testid="send" onClick={onClick}>
        Calcular
      </GorilaButton>
    </>
  );
};

export default CDBForm;
