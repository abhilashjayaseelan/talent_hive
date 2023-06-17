import React from "react";
import ReactDOM from "react-dom/client";
import store from "./features/redux/app/Store";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
