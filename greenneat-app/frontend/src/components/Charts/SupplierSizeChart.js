import React from "react";
import ReactApexChart from 'react-apexcharts';

class SupplierSizeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 25, 41, 17, 15],
      options: {
        chart: {
          type: 'donut',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " litros";
            }
          }
        },
        colors: ['#FF0040', '#8904B1', '#FFBF00', '#01DF74', '#2E9AFE'],
      }
    };

    this.state.options.labels = ['Estabelecimento 1', 'Estabelecimento 2', 'Estabelecimento 3', 'Estabelecimento 4', 'Estabelecimento 5'];
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
      </div>
    );
  }
}

export default SupplierSizeChart;
