import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import CDBForm from "./components/CDBForm";
import "./App.css";

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
