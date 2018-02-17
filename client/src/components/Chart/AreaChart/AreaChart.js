import React, { Component } from 'react';
import ReactHighChart from 'react-highcharts';

class PieChart extends Component {
  state ={
    pie: {
      chartData: [
        ['TRX', 1500, false],
        ['BTC', 2300, false],
        ['ETH', 154, false],
        ['ENJ', 800, false],
      ],
    },
  }

  componentDidMount() {
    const chart = this.pie;
    chart.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
  }

  pieConfig = {
    title: {
      text: 'Current Assets',
    },
    credits: false,
    tooltip: {
      pointFormat: '{series.name}: <b>$ {point.y:,1f}</b><br/>',
    },
    loading: {
      hideDuration: 1000,
      showDuration: 1000,
    },
    thousandsSep: ',',
    series: [{
      type: 'pie',
      name: 'Asset',
      allowPointSelect: true,
      data: this.state.pie.chartData,
      // associated with the chart data order
      keys: ['name', 'y', 'selected', 'sliced'],
      dataLabels: {
        enabled: true,
        format: '<b>{point.percentage:.1f}%</b>',
        distance: -30,
        filter: {
          property: 'percentage',
          operator: '>',
          value: 5,
        },
      },
      yAxis: 1,
      showInLegend: true,
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          navigator: {
            enabled: false,
          },
          dataLabels: {
            enabled: false,
          },
        },
      }],
    },
  };

  render() {
    return (
      <ReactHighChart config={this.pieConfig} ref={(c) => { this.pie = c; }} />
    );
  }
}

export default PieChart;
