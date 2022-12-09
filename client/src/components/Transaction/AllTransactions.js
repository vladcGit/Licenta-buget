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

  const deleteRecord = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this record?"))
        return;
      await axios.delete(`/api/transaction/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const remainingItems = transactions.filter((t) => t.id !== id);
      setTransactions(remainingItems);
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
      {transactions.map((transaction) => (
        <Grid item key={transaction.id} xs={12}>
          <MainCard title={transaction.name}>
            <div style={{ textAlign: "center" }}>{transaction.amount}</div>
            <IconButton
              onClick={() => navigate(`/edit-transaction/${transaction.id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteRecord(transaction.id)}>
              <DeleteIcon />
            </IconButton>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
