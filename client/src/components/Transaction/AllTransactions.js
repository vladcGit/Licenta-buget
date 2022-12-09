import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

import MainCard from "../MainCard";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);

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
          <MainCard>{transaction.amount}</MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
