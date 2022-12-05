import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: { labels: ["Gas", "Food", "Cleaning", "Bills", "Games"] },
      series: [44, 55, 41, 17, 15],
    };
  }

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default Donut;
