import React from "react";
import ReactApexChart from "react-apexcharts";
import ReactDOM from "react-dom";

class PartnerCredit extends React.Component {
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
        xaxis: {
          categories: [
            "Parceiro1",
            "Parceiro2",
            "Parceiro3",
            "Parceiro4",
            "Parceiro5",
            "Parceiro6",
          ],
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
        colors: ["#FF0040"],
      },
    };
  }

  render() {
    const series = [
      {
        name: "Parceiros",
        data: this.props.chartData.map((item) => item.count),
      },
    ];

    const options = {
      ...this.state.options,
      xaxis: {
        categories: this.props.chartData.map((item) => item.businessname),
      },
    };
    return (
      <div id="chart" style={{ marginTop: "20px", marginLeft: "20px" }}>
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

export default PartnerCredit;
