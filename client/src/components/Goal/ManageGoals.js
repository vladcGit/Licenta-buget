import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainCard from "../MainCard";

export default function ManageGoals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/goal/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setGoals(res.data);
      console.log(res.data);
    };

    fetchData();
  }, []);
  return (
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
          <Button color="primary" onClick={() => navigate("/new-goal")}>
            Add new goal
          </Button>
        </MainCard>
      </Grid>
      {goals.map((goal) => (
        <Grid item key={goal.id} xs={12}>
          <MainCard>{goal.name}</MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
