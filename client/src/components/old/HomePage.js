import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import AreaChart from "../components/FakeCharts/AreaChart";
import Donut from "../components/FakeCharts/Donut";
import Heatmap from "../components/FakeCharts/Heatmap";

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          backgroundColor: "primary.main",
          paddingBottom: "10vh",
        }}
      >
        <Grid
          container
          flexDirection={"column"}
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={10}>
            <Typography sx={{ color: "white" }} variant="h2">
              Budget manager
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ color: "white" }} variant="h5">
              The smart and easy way to manage your finances
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <div>
              <Button
                variant="contained"
                // color="green"
                sx={{ color: "white", width: 200, height: 50, mr: "10px" }}
                size="large"
              >
                Log in
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ color: "white", width: 200, height: 50, ml: "10px" }}
                size="large"
              >
                Sign up
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100vw",
        }}
      >
        <Grid container justifyContent={"center"} mt="10vh">
          <Grid item xs={3}>
            <Donut />
          </Grid>
          <Grid item xs={3}>
            <Heatmap />
          </Grid>
          <Grid item xs={3}>
            <AreaChart />
          </Grid>
        </Grid>
        {false && (
          <>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={5}
              mt="5vh"
            >
              <Grid item xs={5}>
                <Heatmap />
              </Grid>
              <Grid item xs={4}>
                <Typography mb={"30px"} variant="h1">
                  Why use this platform?
                </Typography>
                <Typography variant="h3">
                  It is our mission to make your job easier.
                </Typography>
                <Typography variant="h3">
                  That means you will always get the best
                </Typography>
                <Typography variant="h3">
                  features in an intuitive manner
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={5}
              mt="5vh"
            >
              <Grid item xs={4} textAlign="center">
                <Typography mb={"30px"} variant="h1">
                  Why use this platform?
                </Typography>
                <Typography variant="h3">
                  It is our mission to make your job easier.
                </Typography>
                <Typography variant="h3">
                  That means you will always get the best
                </Typography>
                <Typography variant="h3">
                  features in an intuitive manner
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Donut />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
