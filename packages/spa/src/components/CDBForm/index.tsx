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
    investmentDate: "",
    cdbRate: 0,
    currentDate: ""
  });
  const onClick = () => onSend(data);

  const onChange = (field: keyof InputCDBcalculation) => (
    event: React.BaseSyntheticEvent
  ) => setData({ ...data, [field]: event.target.value });

  return (
    <>
      <Input
        onChange={onChange("investmentDate")}
        placeholder="Data do investimento"
      />
      <br />
      <Input onChange={onChange("currentDate")} placeholder="Data resultado" />
      <br />
      <Input onChange={onChange("price")} placeholder="Valor investido" />
      <br />
      <Input onChange={onChange("cdbRate")} placeholder="Taxa CDB" />
      <br />
      <br />
      <GorilaButton onClick={onClick}>Calcular</GorilaButton>
    </>
  );
};

export default CDBForm;
