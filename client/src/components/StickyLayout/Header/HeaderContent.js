import { Typography, Button } from "@mui/material";
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
      <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: "center" }}>
        Welcome, {user.name}
      </Typography>

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
