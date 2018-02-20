import React, { Component } from 'react';
import ReactHighChart from 'react-highcharts';
import axios from 'axios';
import PropTypes from 'prop-types';
import { transformToChartData } from '../../../store/utility';

class AreaChart extends Component {
  state ={
    chartData: [],
  }

  componentDidMount() {
    this.loadChart(this.props.coin);
  }

  loadChart = async (symbol) => {
    let symbolIsActive = symbol;
    if (symbol === 'MIOTA') { symbolIsActive = 'IOTA'; }
    if (symbol === 'NANO') { symbolIsActive = 'XRB'; }
    const chartUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbolIsActive}&tsym=USD&limit=7&e=CCCAGG`;
    const chartRequest = await axios.get(chartUrl);
    const chartData = await transformToChartData(chartRequest.data.Data);
    const chart = this.area;
    chart.Highcharts.setOptions({ lang: { thousandsSep: ',' } });

    this.setState({ chartData });
  }


  render() {
    let minStart = 0;
    if (this.state.chartData[0]) {
      // add thousand ','
      const chart = this.area;
      if (chart) {
        chart.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
      }

      // set minimum value of the chart to the lowest value of the array dataset
      let value = this.state.chartData[0][1];
      this.state.chartData[0].forEach((data) => {
        if (data[1] < value) {
          [, value] = data;
        }
      });
      // console.log(value, 'value');
      minStart = !value ? 0 : (value[1]) - (value[1] * 0.1);
    }

    const areaConfig = {
      title: {
        text: '7 Day Activity',
      },
      yAxis: {
        title: {
          text: 'USD Price',
        },
        startOnTick: false,
        type: 'linear',
        min: minStart,
        minPadding: 0.2,
      },
      xAxis: {
        type: 'datetime',
      },
      plotOptions: {
        area: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
          animation: false,
        },
      },
      chart: {
        height: 200,
        animation: false,
      },
      credits: false,
      tooltip: {
        pointFormat: '<b>$ {point.y:,1f}</b><br/>',
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000,
      },
      series: [{
        type: 'area',
        name: 'Price',
        data: this.state.chartData[0],
        showInLegend: false,
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

    return (
      <ReactHighChart config={areaConfig} ref={(c) => { this.area = c; }} />
    );
  }
}

// PropTypes here
AreaChart.propTypes = {
  coin: PropTypes.string.isRequired,
};


export default AreaChart;
