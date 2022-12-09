import { Button, Grid, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainCard from "../MainCard";

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
          <MainCard title={investment.name}>
            <div style={{ textAlign: "center" }}>{investment.amount}</div>
            <IconButton
              onClick={() => navigate(`/edit-investment/${investment.id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
