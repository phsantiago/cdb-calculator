import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import teal from "@material-ui/core/colors/teal";
import Header from "./components/Header";
import CDBForm from "./components/CDBForm";
import Chart from "./components/Chart";
import GorilaButton from "./components/GorilaButton";
import LoadingOverlay from "./components/LoadingOverlay";
import calculateRemote from "@cdb-calculator/service-client";
import {
  InputCDBcalculation,
  CalculationResult
} from "@cdb-calculator/typings";

import "./App.css";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult>([]);
  const onSend = async (form: InputCDBcalculation): Promise<void> => {
    setLoading(true);
    const { data } = await calculateRemote(form);
    setResult(data);
    setLoading(false);
  };
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: teal,
          secondary: green,
          type: "dark"
        }
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <div className="App background">
        <LoadingOverlay active={isLoading} />
        <div className="body">
          {Boolean(result.length) && (
            <>
              <Chart data={result} />
              <GorilaButton onClick={() => setResult([])}>Voltar</GorilaButton>
            </>
          )}
          {!Boolean(result.length) && (
            <>
              <Header />
              <CDBForm onSend={onSend} />
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
