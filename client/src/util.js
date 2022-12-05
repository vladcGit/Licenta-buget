import axios from "axios";

async function getUserDetails() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await axios.get("/api/user", {
    headers: { Authorization: token },
  });
  return res.data;
}

export { getUserDetails };
