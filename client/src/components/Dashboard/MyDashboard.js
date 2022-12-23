import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MainCard from "../MainCard";
import AnalyticsCard from "./Charts/AnalyticsCard";
import EvolutionChart from "./Charts/EvolutionChart";

export default function MyDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/user/monthly-income", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setIncome(res.data.amount);

      const resTransactions = await axios.get("/api/transaction/this-month", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setTransactions(resTransactions.data);
    };

    fetchData();
  }, []);

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
      <Grid item xs={12}>
        <Divider flexItem />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Typography variant="h5">Net worth</Typography>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <EvolutionChart />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
