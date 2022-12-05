import React, { Component } from "react";
import Chart from "react-apexcharts";

class Heatmap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
        },
      },
      series: [
        {
          data: [
            {
              x: "W1",
              y: 22,
            },
            {
              x: "W2",
              y: 29,
            },
            {
              x: "W3",
              y: 13,
            },
            {
              x: "W4",
              y: 32,
            },
          ],
        },
        {
          data: [
            {
              x: "W1",
              y: 43,
            },
            {
              x: "W2",
              y: 43,
            },
            {
              x: "W3",
              y: 43,
            },
            {
              x: "W4",
              y: 43,
            },
          ],
        },
        {
          data: [
            {
              x: "W1",
              y: 85,
            },
            {
              x: "W2",
              y: 96,
            },
            {
              x: "W3",
              y: 23,
            },
            {
              x: "W4",
              y: 108,
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="heatmap"
          width="380"
        />
      </div>
    );
  }
}

export default Heatmap;
