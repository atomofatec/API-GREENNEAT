import React from "react";
import ReactApexChart from 'react-apexcharts';
import ReactDOM from 'react-dom';

class PartnerCredit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Parceiros',
          data: [76, 101, 98, 105, 98, 100],
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
            categories: ['Parceiro1', 'Parceiro2', 'Parceiro3', 'Parceiro4', 'Parceiro5', 'Parceiro6'],
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
        colors: ['#FF0040'],
        },
      };
    }

  render() {
    return (
      <div id="chart" style={{ marginTop: '20px', marginLeft:'20px' }}>
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
    );
  }
}

export default PartnerCredit;
