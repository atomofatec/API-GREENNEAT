import React from "react";
import ReactApexChart from "react-apexcharts";

class SupplierSizeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " litros";
            },
          },
        },
        colors: ['#01DF74',  '#FF0040', '#8904B1', '#FFBF00', '#2E9AFE'],
      }
    };
  }

  render() {
    const series = this.props.chartData.map((item) => Number(item.sum));
    //const series = [1500, 2800];

    const options = {
      ...this.state.options,
      //labels: ["Estabelecimento 1", "Estabelecimento 2"],

      labels: this.props.chartData.map((item) => item.businessname),
    };
    return (
      <div id="chart" style={{ marginTop: "20px" }}>
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
    );
  }
}

export default SupplierSizeChart;
