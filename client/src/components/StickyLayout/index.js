import { Box } from "@mui/material";
import React from "react";
import DrawerContent from "./Drawer";
import Header from "./Header";

export default function StickyLayout({ children }) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header />
      <DrawerContent />
      <Box
        component="main"
        sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 }, mt: "50px" }}
      >
        {children}
      </Box>
    </Box>
  );
}
