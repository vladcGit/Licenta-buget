import { Typography } from "@mui/material";
import React from "react";
import MainCard from "./MainCard";
import StickyLayout from "./StickyLayout";

export default function NotFoundPage() {
  return (
    <StickyLayout>
      <MainCard sx={{ textAlign: "center" }}>
        <Typography variant="h3">The following page does not exist</Typography>
      </MainCard>
    </StickyLayout>
  );
}
