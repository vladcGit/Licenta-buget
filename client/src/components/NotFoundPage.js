import { Typography } from "@mui/material";
import React from "react";
import MainCard from "./MainCard";

export default function NotFoundPage() {
  return (
    <MainCard sx={{ textAlign: "center" }}>
      <Typography variant="h3">The following page does not exist</Typography>
    </MainCard>
  );
}
