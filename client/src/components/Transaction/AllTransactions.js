import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import MainCard from "../MainCard";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/transaction/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTransactions(res.data);
      console.log(res.data);

      const resCategories = await axios.get("/api/category/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const cats = resCategories.data;
      cats.unshift({ id: -1, name: "All" });
      setCategories(cats);
      console.log(resCategories.data);
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

  const formatDate = (date) => {
    date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  return (
    <Grid container justifyContent={"center"} spacing={3} minHeight="70vh">
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Autocomplete
            sx={{ width: 200 }}
            disableClearable
            value={categoryName}
            onChange={(event, newValue) => {
              setCategoryName(newValue);
            }}
            options={categories.map((c) => c.name)}
            renderInput={(params) => (
              <TextField {...params} label="Categories" />
            )}
          />
        </div>
      </Grid>
      {transactions.length > 0 &&
        categories.length > 0 &&
        transactions.map((transaction) => (
          <Grid item key={transaction.id} xs={3}>
            <MainCard title={transaction.description}>
              <h1
                style={{
                  textAlign: "center",
                  color: transaction.type === "Inflow" ? "green" : "red",
                }}
              >
                {transaction.type === "Inflow" ? "+" : "-"}
                {transaction.amount}
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  margin: 10,
                }}
              >
                <CalendarMonthIcon />
                {formatDate(transaction.date)}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  margin: 10,
                }}
              >
                {transaction.recurrent ? (
                  <CheckBoxIcon color="primary" />
                ) : (
                  <CheckBoxOutlineBlankIcon color="primary" />
                )}
                Recurrent
              </div>
              <h3 style={{ textAlign: "center" }}>
                {
                  categories.filter((c) => c.id === transaction.category_id)[0]
                    .name
                }
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <IconButton
                  onClick={() =>
                    navigate(`/edit-transaction/${transaction.id}`)
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteRecord(transaction.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </MainCard>
          </Grid>
        ))}
    </Grid>
  );
}
