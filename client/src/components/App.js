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
import NewGoal from "./Goal/NewGoal";
import ManageGoals from "./Goal/ManageGoals";
import ManageInvestments from "./Investments/ManageInvestments";
import NewInvestment from "./Investments/NewInvestment";

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
          <Route exact path="/goals" element={<ManageGoals />} />
          <Route exact path="/new-goal" element={<NewGoal />} />
          <Route exact path="/investments" element={<ManageInvestments />} />
          <Route exact path="/new-investment" element={<NewInvestment />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeCustomization>
  );
}
