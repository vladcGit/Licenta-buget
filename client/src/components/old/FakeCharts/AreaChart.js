import React, { Component } from "react";
import Chart from "react-apexcharts";

class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        },
      },
      series: [
        {
          name: "series-1",
          data: [3000, 4000, 4500, 5000, 4900, 6000, 7000, 9100],
        },
      ],
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AreaChart;
