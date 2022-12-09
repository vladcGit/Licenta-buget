import { Button, Grid, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const deleteRecord = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this record?"))
        return;
      await axios.delete(`/api/goal/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const remainingGoals = goals.filter((g) => g.id !== id);
      setGoals(remainingGoals);
    } catch (e) {
      console.log(e);
    }
  };

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
          <MainCard title={goal.name}>
            <div style={{ textAlign: "center" }}>{goal.amount}</div>
            <IconButton onClick={() => navigate(`/edit-goal/${goal.id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteRecord(goal.id)}>
              <DeleteIcon />
            </IconButton>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
