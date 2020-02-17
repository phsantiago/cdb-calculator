import React, { useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";

const GorilaButton = styled(Button)({
  background: "linear-gradient(45deg, #19c3c1 30%, #4add93 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(74, 219, 150, .3)",
  color: "white",
  fontWeight: 600,
  height: 48,
  padding: "0 30px"
});

const Input = (props: any) => <TextField {...props} />;

const CDBForm = ({ onSend }: any) => {
  const [data, setData] = useState({});
  const onClick = () => onSend(data);

  const onChange = (field: any) => (event: any) =>
    setData({ ...data, [field]: event.target.value });

  return (
    <>
      <Input
        onChange={onChange("investmentDate")}
        placeholder="Data do investimento"
      />
      <br />
      <Input onChange={onChange("resultDate")} placeholder="Data resultado" />
      <br />
      <Input
        onChange={onChange("investmentValue")}
        placeholder="Valor investido"
      />
      <br />
      <Input onChange={onChange("cdbRate")} placeholder="Taxa CDB" />
      <br />
      <GorilaButton onClick={onClick}>Calcular</GorilaButton>
    </>
  );
};
const App = () => {
  const [test, setTest] = useState({});
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark"
        }
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <div className="body">
          <CDBForm onSend={setTest} />
          {JSON.stringify(test)}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
