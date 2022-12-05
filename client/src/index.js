import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import "simplebar/src/simplebar.css";

//hide console logs in production
if (process.env.NODE_ENV === "production") console.log = () => {};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
