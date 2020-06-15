import React from "react";
import logo from "./logo.svg";
import Root from "./Components/Root";
import match from "./Engine/Match";
import schedule from "./Engine/schedule";
import teams from "./Data/teams";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function App() {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
