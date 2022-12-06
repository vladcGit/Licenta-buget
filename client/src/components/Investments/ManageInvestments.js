import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "../MainCard";
import StickyLayout from "../StickyLayout";

export default function ManageInvestments() {
  const navigate = useNavigate();

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/investment/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setInvestments(res.data);
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
    <StickyLayout>
      <Grid
        container
        alignItems={"center"}
        flexDirection="column"
        spacing={3}
        minHeight="70vh"
      >
        <Grid item>
          <MainCard
            sx={{ minWidth: "20vw" }}
            contentSX={{ display: "flex", justifyContent: "center" }}
          >
            <Button color="primary" onClick={() => navigate("/new-investment")}>
              Add new investment
            </Button>
          </MainCard>
        </Grid>
        {investments.map((investment) => (
          <Grid item key={investment.id} xs={12}>
            <MainCard>{investment.name}</MainCard>
          </Grid>
        ))}
      </Grid>
    </StickyLayout>
  );
}
