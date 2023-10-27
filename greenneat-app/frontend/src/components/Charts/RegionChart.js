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
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={430}
        />
      </div>
    );
  }
}

export default RegionChart;
