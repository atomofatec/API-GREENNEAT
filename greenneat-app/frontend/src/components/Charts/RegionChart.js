import React from "react";
import ReactApexChart from 'react-apexcharts';

class RegionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [
          {
            name: 'Óleo virgem',
            data: [44, 55, 41, 64],
          },
          {
            name: 'Óleo usado',
            data: [53, 32, 33, 52],
          },
        ],
      options: {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['Norte', 'Sul', 'Leste', 'Oeste'],
        },
        grid: {
            show: false,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " litros";
            }
          }
        },
        colors: ['#FFBF00', '#8904B1'],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar"  />
      </div>
    );
  }
}

export default RegionChart;
