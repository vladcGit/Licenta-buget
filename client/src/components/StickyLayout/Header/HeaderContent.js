import { Box, ButtonBase, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../util";
import { useNavigate } from "react-router-dom";

const HeaderContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserDetails();
      setUser(userData);
    };
    fetchData();
  }, []);

  if (!user) return null;

  return (
    <>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
          flexGrow: 1,
        }}
      >
        <Typography variant="subtitle1">Welcome, {user.name}</Typography>
      </ButtonBase>
      <Button
        color="inherit"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default HeaderContent;
