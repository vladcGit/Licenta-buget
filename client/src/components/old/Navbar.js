import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  if (window.location.pathname === "/login") return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
          </div>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
