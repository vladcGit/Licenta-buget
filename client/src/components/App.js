import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewTransaction from "./Transaction/NewTransaction";
import SignIn from "./Authentication/Signin";
import Dashboard from "./Dashboard";
import ThemeCustomization from "../themes/ThemeCustomization";
import SignUp from "./Authentication/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AllTransactions from "./Transaction/AllTransactions";
import NotFoundPage from "./NotFoundPage";

/*
import { createTheme } from "@mui/material/styles";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: {
      main: "#0e72e6",
    },
    secondary: {
      main: "#ff6077",
    },
    green: createColor("#00e396"),
    purple: createColor("#8b75d7"),
    yellow: createColor("#febb3b"),
    lightBlue: createColor("#97bad6"),
  },
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};
*/

export default function App() {
  return (
    <ThemeCustomization>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route exact path="/transactions" element={<AllTransactions />} />
          <Route exact path="/new-transaction" element={<NewTransaction />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeCustomization>
  );
}
