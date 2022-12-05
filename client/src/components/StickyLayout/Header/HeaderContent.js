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
    <Box sx={{ ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
      >
        <Typography variant="subtitle1">{user.name}</Typography>
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
    </Box>
  );
};

export default HeaderContent;
