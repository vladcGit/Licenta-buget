import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
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
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("All");
  const [recurrent, setRecurrent] = useState(true);
  const [nonrecurrent, setNonrecurrent] = useState(true);
  const [typeInflow, setTypeInflow] = useState(true);
  const [typeOutflow, setTypeOutflow] = useState(true);
  const [date, setDate] = useState(undefined);
  const [maxAmount, setMaxAmount] = useState(undefined);
  const [minAmount, setMinAmount] = useState(undefined);
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
      setAllCategories(cats);
      console.log(resCategories.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const category =
        categoryName === "All"
          ? null
          : allCategories.filter((c) => c.name === categoryName)[0].id;

      const res = await axios.get("/api/transaction/all", {
        headers: { Authorization: localStorage.getItem("token") },
        params: {
          category,
          date,
          recurrent:
            recurrent && nonrecurrent
              ? undefined
              : recurrent && !nonrecurrent
              ? true
              : !recurrent && nonrecurrent
              ? false
              : "both",
          type:
            typeInflow && typeOutflow
              ? undefined
              : typeInflow && !typeOutflow
              ? "Inflow"
              : !typeInflow && typeOutflow
              ? "Outflow"
              : "Both",
          maxAmount,
          minAmount,
        },
      });
      setTransactions(res.data);
    };

    fetchData();
  }, [
    recurrent,
    nonrecurrent,
    categoryName,
    allCategories,
    date,
    typeInflow,
    typeOutflow,
    maxAmount,
    minAmount,
  ]);

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
    date = new Date(date);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Autocomplete
            sx={{ width: 200 }}
            disableClearable
            value={categoryName}
            onChange={(event, newValue) => {
              setCategoryName(newValue);
            }}
            options={allCategories.map((c) => c.name)}
            renderInput={(params) => (
              <TextField {...params} label="Categories" />
            )}
          />
          <Divider orientation="vertical" flexItem />
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recurrent}
                  onChange={() => setRecurrent(!recurrent)}
                  size="medium"
                />
              }
              label="Recurrent"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={nonrecurrent}
                  onChange={() => setNonrecurrent(!nonrecurrent)}
                  size="medium"
                />
              }
              label="Non Recurrent"
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeInflow}
                  onChange={() => setTypeInflow(!typeInflow)}
                  size="medium"
                />
              }
              label="Inflow"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeOutflow}
                  onChange={() => setTypeOutflow(!typeOutflow)}
                  size="medium"
                />
              }
              label="Outflow"
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <TextField
            type="date"
            value={undefined && date?.toISOString().split("T")[0]}
            onChange={(e) => {
              const v = e.target.value;
              setDate(v ? new Date(e.target.value) : undefined);
            }}
            label="date"
            InputLabelProps={{ shrink: true }}
          />
          <Divider orientation="vertical" flexItem />
          <TextField
            type="number"
            value={undefined}
            onChange={(e) => setMinAmount(e.target.value || undefined)}
            label="Min amount"
          />
          <TextField
            type="number"
            value={undefined}
            onChange={(e) => setMaxAmount(e.target.value || undefined)}
            label="Max amount"
          />
        </div>
        <Divider flexItem sx={{ height: "10px" }} />
      </Grid>
      {transactions.length > 0 &&
        allCategories.length > 0 &&
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
                  allCategories.filter(
                    (c) => c.id === transaction.category_id
                  )[0].name
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
