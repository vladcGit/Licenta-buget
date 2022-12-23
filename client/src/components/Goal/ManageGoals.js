import { Button, Grid, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainCard from "../MainCard";
import ReactApexChart from "react-apexcharts";

const chartOptions = {
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: {
      show: true,
      tools: {
        download: false,
      },
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff",
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: "front",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: "#fff",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px",
        },
        value: {
          formatter: function (val) {
            return `${parseInt(val)}%`;
          },
          color: "#111",
          fontSize: "36px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#5bb5f2"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"],
};

export default function ManageGoals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [balance, setBalance] = useState(0);
  const [goalValues, setGoalValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/goal/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      res.data.sort((a, b) => a.id - b.id);
      setGoals(res.data);

      const balanceRes = await axios.get("/api/transaction/balance", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setBalance(balanceRes.data.balance);

      let sum = balanceRes.data.balance;
      const values = [];
      for (let goal of res.data) {
        if (sum >= goal.amount) {
          values.push(goal.amount);
          sum -= goal.amount;
        } else {
          values.push(sum);
          sum = 0;
        }
      }
      setGoalValues(values);
    };

    fetchData();
  }, []);

  const deleteRecord = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this record?"))
        return;
      await axios.delete(`/api/goal/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const remainingGoals = goals.filter((g) => g.id !== id);
      setGoals(remainingGoals);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container alignItems={"center"} spacing={3} minHeight="70vh">
      <Grid item xs={12}>
        <MainCard
          sx={{ minWidth: "20vw" }}
          contentSX={{ display: "flex", justifyContent: "center" }}
        >
          <Button color="primary" onClick={() => navigate("/new-goal")}>
            Add new goal
          </Button>
        </MainCard>
      </Grid>
      {balance &&
        goals.length > 0 &&
        goals.map((goal, index) => (
          <Grid item key={goal.id} xs={4}>
            <MainCard title={goal.name}>
              <div style={{ textAlign: "center" }}>
                <h1>{goal.amount}</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <IconButton onClick={() => navigate(`/edit-goal/${goal.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteRecord(goal.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <ReactApexChart
                type="radialBar"
                series={[((goalValues[index] / goal.amount) * 100).toFixed(1)]}
                options={chartOptions}
              />
            </MainCard>
          </Grid>
        ))}
    </Grid>
  );
}
