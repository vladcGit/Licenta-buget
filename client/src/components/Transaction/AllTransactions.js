import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MainCard from "../MainCard";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/transaction/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTransactions(res.data);
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
      {transactions.map((transaction) => (
        <Grid item key={transaction.id} xs={12}>
          <MainCard title={transaction.name}>
            <div style={{ textAlign: "center" }}>{transaction.amount}</div>
            <IconButton
              onClick={() => navigate(`/edit-transaction/${transaction.id}`)}
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
