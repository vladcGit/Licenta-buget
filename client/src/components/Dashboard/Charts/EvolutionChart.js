import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import axios from "axios";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    // enabled: false,
    enabled: true,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

const EvolutionChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const options = {
    ...areaChartOptions,
    colors: [theme.palette.primary.main, theme.palette.primary[700]],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: [
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
            secondary,
          ],
        },
      },
      axisBorder: {
        show: true,
        color: line,
      },
      tickAmount: 11,
    },
    yaxis: {
      labels: {
        style: {
          colors: [secondary],
        },
      },
    },
    grid: {
      borderColor: line,
    },
    tooltip: {
      theme: "light",
    },
  };

  const [series, setSeries] = useState([
    {
      name: "Net Worth",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const promissesArray = [];

      for (let month = 0; month < 12; month++) {
        const year = new Date().getFullYear();

        const request = axios.post(
          "/api/user/total-balance",
          {
            date: new Date(year, month + 1, 0),
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        promissesArray.push(request);
      }

      const resolvedPromises = await Promise.all(promissesArray);
      const values = resolvedPromises.map((p) => p.data.balance);
      console.log(values);
      setSeries([
        {
          name: "Net Worth",
          data: values,
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
};

export default EvolutionChart;
