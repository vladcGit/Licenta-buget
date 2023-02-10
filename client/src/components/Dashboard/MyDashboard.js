import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MainCard from "../MainCard";
import AnalyticsCard from "./Charts/AnalyticsCard";
import EvolutionChart from "./Charts/EvolutionChart";
import MonthlyInOutChart from "./Charts/MonthlyInOutChart";
import TransactionsTable from "./Charts/TransactionsTable";
import WeeklyChart from "./Charts/WeeklyChart";

export default function MyDashboard() {
  const [income, setIncome] = useState(null);
  const [seriesEvolution, setSeriesEvolution] = useState([
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ]);
  const [seriesWeekly, setSeriesWeekly] = useState([
    { data: [0, 0, 0, 0, 0, 0, 0] },
  ]);
  const [seriesMonthly, setSeriesMonthly] = useState(null);
  const [last6Months, setLast6Months] = useState(null);
  const [categories, setCategories] = useState([]);
  const [biggestTransactions, setBiggestTransactions] = useState([]);

  // income
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/user/monthly-income", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setIncome(res.data.amount || 0);
    };

    fetchData();
  }, []);

  // monthly transactions
  useEffect(() => {
    const fetchData = async () => {
      const result = {
        inflow: { name: "Inflow", data: [] },
        outflow: { name: "Outflow", data: [] },
        dates: [],
      };

      for (let i = 5; i >= 0; i--) {
        const date = new Date();

        const resTransactions = await axios.get("/api/transaction/monthly", {
          headers: { Authorization: localStorage.getItem("token") },
          params: {
            date: new Date(date.getFullYear(), date.getMonth() - i, 1),
          },
        });

        const data = resTransactions.data;

        result.dates.push(data.date);

        const sumOfInflows = data.inflow
          .map((t) => t.amount)
          .reduce((partialSum, a) => partialSum + a, 0);
        result.inflow.data.push(sumOfInflows);

        const sumOfOutflows = data.outflow
          .map((t) => t.amount)
          .reduce((partialSum, a) => partialSum + a, 0);
        result.outflow.data.push(sumOfOutflows);
      }

      setLast6Months(result.dates);
      setSeriesMonthly([{ ...result.inflow }, { ...result.outflow }]);
    };

    fetchData();
  }, []);

  // evolution
  useEffect(() => {
    const fetchData = async () => {
      const promissesArray = [];

      for (let month = 0; month < 12; month++) {
        const year = new Date().getFullYear();

        const request = axios.post(
          "/api/user/total-balance",
          {
            date: new Date(year, month + 1, 0),
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        promissesArray.push(request);
      }

      const resolvedPromises = await Promise.all(promissesArray);
      const values = resolvedPromises.map((p) => p.data.balance);
      setSeriesEvolution([
        {
          name: "Net Worth",
          data: values,
        },
      ]);
    };

    fetchData();
  }, []);

  // weekly
  useEffect(() => {
    const fetchDay = async () => {
      const previousMonday = new Date();
      previousMonday.setDate(new Date().getDate() - new Date().getDay());
      const res = await axios.get("/api/transaction/last-week", {
        params: {
          day: previousMonday.getDate(),
          month: previousMonday.getMonth(),
          year: previousMonday.getFullYear(),
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setSeriesWeekly([
        {
          name: "Spendings",
          data: res.data,
        },
      ]);
    };
    fetchDay();
  }, []);

  // categories
  useEffect(() => {
    const fetchData = async () => {
      const resCategories = await axios.get("/api/category/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setCategories(resCategories.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (categories.length === 0) return;
      const res = await axios.get("/api/transaction/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      console.log(res.data);

      const trans = res.data
        .sort((a, b) => (a.amount > b.amount ? -1 : 1))
        .slice(0, 10);

      trans.forEach((t) => {
        const catId = t.category_id;
        const catName = categories.filter((c) => c.id === catId)[0].name;
        t.categoryName = catName;
      });
      console.log(trans);

      setBiggestTransactions(trans.filter((t) => t.type === "Outflow"));
    };

    fetchData();
  }, [categories]);

  if (!income)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "40vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {income === 0 ? (
          <h3>Please provide a value for your income and transactions</h3>
        ) : (
          <CircularProgress size={"6rem"} />
        )}
      </Box>
    );

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      {income > 0 ? (
        <>
          <Grid item xs={12}>
            <MainCard
              contentSX={{ p: 2.25, display: "flex", justifyContent: "center" }}
            >
              <Stack spacing={0.5}>
                <Typography variant="h6" color="textSecondary">
                  Your combined income for this month
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4" color="inherit">
                      {income} lei
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Chip
                      variant="combined"
                      color={"primary"}
                      label={`${100}%`}
                      sx={{ ml: 1.25, pl: 1 }}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          </Grid>
          <Grid item xs={4}>
            <AnalyticsCard
              title="Your budget for your primary needs"
              count={0.5 * income}
              percentage={50}
              color="warning"
            />
          </Grid>
          <Grid item xs={4}>
            <AnalyticsCard
              title="Your budget for wishes"
              count={0.3 * income}
              percentage={30}
              color="error"
            />
          </Grid>
          <Grid item xs={4}>
            <AnalyticsCard
              title="Your budget for investments"
              count={0.2 * income}
              percentage={20}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5" textAlign={"center"}>
              Those values are calculated using the 50/30/20 rule, which you can
              find more on{" "}
              <a href="https://www.britannica.com/money/what-is-the-50-30-20-rule">
                here
              </a>
              .
            </Typography>
          </Grid>
        </>
      ) : (
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5" textAlign={"center"}>
            Add incoming transactions to view additional analytics.
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} sx={{ marginTop: "10px" }}>
        <Divider flexItem />
      </Grid>

      <Grid item xs={12} md={7} lg={8}>
        <Typography variant="h5">Net worth</Typography>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <EvolutionChart series={seriesEvolution} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Spending Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1.5 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Spendings
              </Typography>
              {console.log(seriesWeekly)}
              <Typography variant="h3">
                {seriesWeekly.map((s) =>
                  s.data.reduce((partialSum, a) => partialSum + a, 0)
                )}{" "}
                lei
              </Typography>
            </Stack>
          </Box>
          <WeeklyChart series={seriesWeekly} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transactions Report</Typography>
          </Grid>
        </Grid>
        {seriesMonthly && (
          <MainCard sx={{ mt: 1.75 }}>
            <Stack spacing={1.5} sx={{ mb: -12 }}>
              <Typography variant="h6" color="secondary">
                Net Profit
              </Typography>
              <Typography variant="h4">
                {seriesMonthly[0].data.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                ) -
                  seriesMonthly[1].data.reduce(
                    (partialSum, a) => partialSum + a,
                    0
                  )}{" "}
                lei
              </Typography>
              {console.log(seriesMonthly)}
            </Stack>
            {last6Months && seriesMonthly && (
              <MonthlyInOutChart series={seriesMonthly} labels={last6Months} />
            )}
          </MainCard>
        )}
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Biggest Outflow Transactions</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TransactionsTable transactions={biggestTransactions} />
        </MainCard>
      </Grid>
    </Grid>
  );
}
