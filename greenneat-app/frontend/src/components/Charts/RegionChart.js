import React from "react";
import ReactApexChart from "react-apexcharts";

class RegionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "bar",
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
          categories: ["Norte", "Sul", "Leste", "Oeste"],
        },
        grid: {
          show: false,
        },
<<<<<<< HEAD
        colors: ["#FFBF00", "#8904B1"],
=======
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " litros";
            }
          }
        },
        colors: ['#FFBF00', '#8904B1'],
>>>>>>> ca3ac977484a3fdadd05dd5be36caa2c817ab397
      },
    };
  }

  render() {

    const series = [
      {
        name: "Estabelecimentos",
        data: this.props.chartData.map((item) => item.count),
      },
    ];

    const options = {
      ...this.state.options,
      xaxis: {
        categories: this.props.chartData.map((item) => item.namearea),
      },
    };
    return (
      <div id="chart">
<<<<<<< HEAD
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={430}
        />
=======
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar"  />
>>>>>>> ca3ac977484a3fdadd05dd5be36caa2c817ab397
      </div>
    );
  }
}

export default RegionChart;
