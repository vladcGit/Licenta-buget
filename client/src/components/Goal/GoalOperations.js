import { Box, Grid, TextField, Typography, Paper, Button } from "@mui/material";
import React from "react";

export default function GoalOperations(props) {
  const { name, setName, amount, setAmount, handler, titleText, buttonText } =
    props;

  return (
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
            <Typography variant="h3" textAlign={"center"} color="text.primary">
              {titleText}
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
                  onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
                  label="amount"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: 250 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={name.length === 0 || amount <= 0}
                  onClick={handler}
                >
                  {buttonText}
                </Button>
              </Grid>
            </>
          }
        </Grid>
      </Paper>
    </Box>
  );
}
