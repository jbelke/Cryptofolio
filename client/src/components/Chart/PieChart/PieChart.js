import React, { Component } from 'react';
import ReactHighChart from 'react-highcharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PieChart extends Component {
  componentDidMount() {
    this.pie.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.pieData.length === 0 ||
      Object.keys(nextProps.marketValue).length === 0) {
      return false;
    }
    if (nextProps.marketValue === this.props.marketValue) {
      return false;
    }
    return true;
  }

  render() {
    let pieData = 0;
    // update amount to the current data
    if (this.props.pieData) {
      const pieFormattedData = [];
      this.props.pieData.forEach((coin) => {
        // dont return coin with 0 value; Format to fit chart
        const [name, coinAmount] = coin;
        if (coinAmount === 0) {
          return;
        }
        const currentMarketValue = (this.props.marketValue[name].USD * coinAmount);

        pieFormattedData.push([name, currentMarketValue * 1]);
      });

      pieData = pieFormattedData;
    }

    const pieConfig = {
      title: {
        text: 'Portfolio Breakdown',
      },
      credits: false,
      tooltip: {
        pointFormat: '{series.name}: <b>$ {point.y:,1f}</b><br/><b>{point.percentage:.1f}%</b>',
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
        data: pieData,
        // associated with the chart data order
        keys: ['name', 'y', 'sliced'],
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

    return <ReactHighChart config={pieConfig} ref={(c) => { this.pie = c; }} />;
  }
}

PieChart.propTypes = {
  pieData: PropTypes.arrayOf(PropTypes.array).isRequired,
  marketValue: PropTypes.shape(),
};

PieChart.defaultProps = {
  marketValue: {},
};

const mapStateToProps = state => ({
  pieData: state.transaction.pieData,
  marketValue: state.coin.coinMarketValue,
});

export default connect(mapStateToProps)(PieChart);
