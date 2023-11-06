import React from "react";
import ReactApexChart from "react-apexcharts";

class PartnerSupplierRegionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
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
        colors: ["#2E9AFE", "#01DF74"],
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
          height={350}
        />
      </div>
    );
  }
}

export default PartnerSupplierRegionChart;
