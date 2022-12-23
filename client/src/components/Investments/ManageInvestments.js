import { Button, Grid, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainCard from "../MainCard";
import ReactApexChart from "react-apexcharts";

export default function ManageInvestments() {
  const navigate = useNavigate();

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/investment/all", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setInvestments(res.data);
      console.log(res.data);
    };

    fetchData();
  }, []);

  const deleteRecord = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this record?"))
        return;
      await axios.delete(`/api/investment/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const remainingItems = investments.filter((inv) => inv.id !== id);
      setInvestments(remainingItems);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container justifyContent={"center"} spacing={3} minHeight="70vh">
      <Grid item xs={12}>
        <MainCard
          sx={{ minWidth: "20vw" }}
          contentSX={{ display: "flex", justifyContent: "center" }}
        >
          <Button color="primary" onClick={() => navigate("/new-investment")}>
            Add new investment
          </Button>
        </MainCard>
      </Grid>
      {investments.map((investment) => {
        const amounts = [investment.amount];
        for (let i = 1; i < 7; i++) {
          amounts.push(Math.round(amounts[i - 1] * (1 + investment.return)));
        }
        return (
          <Grid item key={investment.id} xs={6}>
            <MainCard>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <IconButton
                  onClick={() => navigate(`/edit-investment/${investment.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteRecord(investment.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <ReactApexChart
                type="line"
                options={{
                  chart: {
                    height: 350,
                    type: "line",

                    toolbar: {
                      show: false,
                    },
                    zoom: {
                      enabled: false,
                    },
                  },
                  forecastDataPoints: {
                    count: 3,
                  },
                  stroke: {
                    width: 5,
                    curve: "smooth",
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      // gradientToColors: ["#FDD835", ],
                      gradientToColors: ["#E91E63"],
                      shadeIntensity: 1,
                      type: "horizontal",
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 100, 100, 100],
                    },
                  },
                  title: {
                    text: investment.name,
                    align: "left",
                    style: {
                      fontSize: "16px",
                      color: "#666",
                    },
                  },
                }}
                series={[
                  {
                    name: "Value",
                    data: amounts,
                  },
                ]}
              />
            </MainCard>
          </Grid>
        );
      })}
    </Grid>
  );
}
