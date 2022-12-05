import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import StickyLayout from "../StickyLayout";

export default function NewTransaction() {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("Outflow");
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [recurrent, setRecurrent] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category/all");
      setCategories(res.data);
      if (res.data.length > 0) setCategoryName(res.data[0].name);
    } catch (e) {
      const err = e.response;
      console.log(err);
      alert("error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createTransaction = async () => {
    try {
      const category_id = Number.parseInt(
        categories.filter((c) => c.name === categoryName)[0].id
      );

      if (amount <= 0) return alert("Amount must be bigger than 0");

      await axios.post(
        "/api/transaction",
        {
          date,
          type,
          amount,
          description,
          recurrent,
          category_id,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate("/");
    } catch (e) {
      const err = e.response;
      console.log(err);
      alert("error");
    }
  };

  const AddCategoryModal = () => {
    const [name, setName] = useState("");

    const handleCreateCategory = async () => {
      await axios.post(
        "/api/category",
        { name },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      fetchCategories();
      setOpenModal(false);
    };

    return (
      <div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                border: "2px solid #eee",
                borderRadius: 15,
                boxShadow: 24,
                padding: "20px",
                backgroundColor: "white",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Add category
              </Typography>
              <TextField
                sx={{ width: 300, mt: "40px", mb: "40px" }}
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={handleCreateCategory}
              >
                Add
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  };

  return (
    <StickyLayout>
      <Box
        sx={{
          maxWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          mt: "-30px",
        }}
      >
        <Paper
          sx={{
            pt: 8,
            pb: 6,
            m: 5,
          }}
          elevation={3}
        >
          <Grid
            container
            flexDirection={"column"}
            justifyContent="flex-start"
            alignItems={"center"}
            spacing={3}
            width="100%"
            minWidth="40vw"
          >
            <Grid item xs={12}>
              <Typography
                variant="h3"
                textAlign={"center"}
                color="text.primary"
              >
                Enter a new transaction
              </Typography>
            </Grid>

            {
              <>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      width: 250,
                      "& .MuiInputBase-root": {
                        height: 300,
                      },
                    }}
                    type="number"
                    inputProps={{
                      style: { fontSize: "4rem", textAlign: "center" },
                      step: 0.01,
                      min: 0,
                    }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    label="amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: 250 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: 250 }}
                    type="date"
                    value={date.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDate(v ? new Date(e.target.value) : new Date());
                    }}
                    label="date"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={recurrent}
                        onChange={() => setRecurrent(!recurrent)}
                        size="medium"
                      />
                    }
                    label="Recurrent?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    sx={{ width: 250 }}
                    value={type}
                    label="Type"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value={"Inflow"}>Inflow</MenuItem>
                    <MenuItem value={"Outflow"}>Outflow</MenuItem>
                  </TextField>
                </Grid>

                {categoryName?.length >= 0 && (
                  <Grid item xs={12} sx={{ display: "flex" }}>
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
                    <IconButton
                      onClick={() => setOpenModal(true)}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                    <AddCategoryModal />
                  </Grid>
                )}
              </>
            }
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={createTransaction}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </StickyLayout>
  );
}
