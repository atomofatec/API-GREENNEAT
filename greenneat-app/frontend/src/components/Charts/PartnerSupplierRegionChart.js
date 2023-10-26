import React from "react";
import ReactApexChart from 'react-apexcharts';

class PartnerSupplierRegionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Parceiros',
          data: [76, 101, 98, 105],
        },
        {
          name: 'Estabelecimentos',
          data: [41, 36, 76, 45],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['Norte', 'Sul', 'Leste', 'Oeste',],
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        grid: {
            show: false,
        },
        colors: ['#2E9AFE', '#01DF74'],
        },
      };
    }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
    );
  }
}

export default PartnerSupplierRegionChart;
