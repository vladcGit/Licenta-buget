import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewTransaction from "./Transaction/NewTransaction";
import SignIn from "./Authentication/Signin";
import Dashboard from "./Dashboard/Dashboard";
import ThemeCustomization from "../themes/ThemeCustomization";
import SignUp from "./Authentication/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AllTransactions from "./Transaction/AllTransactions";
import NotFoundPage from "./NotFoundPage";
import NewGoal from "./Goal/NewGoal";
import ManageGoals from "./Goal/ManageGoals";
import ManageInvestments from "./Investments/ManageInvestments";
import NewInvestment from "./Investments/NewInvestment";
import EditInvestment from "./Investments/EditInvestment";
import EditGoal from "./Goal/EditGoal";
import EditTransaction from "./Transaction/EditTransaction";
import MyDashboard from "./Dashboard/MyDashboard";

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
            element={<ProtectedRoute>{<Dashboard />}</ProtectedRoute>}
          />
          <Route
            exact
            path="/my-dashboard"
            element={<ProtectedRoute>{<MyDashboard />}</ProtectedRoute>}
          />
          <Route
            exact
            path="/transactions"
            element={
              <ProtectedRoute>
                <AllTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/new-transaction"
            element={
              <ProtectedRoute>
                <NewTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/edit-transaction/:transactionId"
            element={
              <ProtectedRoute>
                <EditTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/goals"
            element={
              <ProtectedRoute>
                <ManageGoals />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/new-goal"
            element={
              <ProtectedRoute>
                <NewGoal />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/edit-goal/:goalId"
            element={
              <ProtectedRoute>
                <EditGoal />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/investments"
            element={
              <ProtectedRoute>
                <ManageInvestments />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/new-investment"
            element={
              <ProtectedRoute>
                <NewInvestment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/edit-investment/:investmentId"
            element={
              <ProtectedRoute>
                <EditInvestment />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFoundPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeCustomization>
  );
}
