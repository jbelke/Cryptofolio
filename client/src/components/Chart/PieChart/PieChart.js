import React, { Component } from 'react';
import ReactHighChart from 'react-highcharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PieChart extends Component {
  componentDidMount() {
    this.pie.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
  }

  render() {
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
        data: this.props.pieData,
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
};

const mapStateToProps = state => ({
  pieData: state.transaction.pieData,
});

export default connect(mapStateToProps)(PieChart);
