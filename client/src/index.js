import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./store/configureStore";
import { theme } from "./theme/withRoot";
import { MuiThemeProvider } from "@material-ui/core";

const store = ConfigureStore();

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
