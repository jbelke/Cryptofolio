import React from 'react';
import { Container } from 'semantic-ui-react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import PropTypes from 'prop-types';

const chart = (props) => {
  const areaData = props.dataSet[0];
  const barData = props.dataSet[1];

  const config = {
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: props.text,
    },
    loading: {
      hideDuration: 1000,
      showDuration: 1000,
    },
    yAxis: [{
      labels: {
        align: 'right',
        x: -3,
      },
      title: {
        text: 'Price',
      },
      height: '60%',
      lineWidth: 2,
      resize: {
        enabled: true,
      },
    }, {
      labels: {
        align: 'right',
        x: -3,
      },
      title: {
        text: 'Volume',
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2,
    }],
    tooltip: {
      split: true,
    },
    series: [{
      name: props.symbol,
      data: areaData,
      tooltip: {
        valueDecimals: 3,
      },
    }, {
      type: 'column',
      name: 'volume',
      data: barData,
      tooltip: {
        valueDecimals: 3,
      },
      yAxis: 1,
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
        },
      }],
    },
  };

  return (
    <Container>
      <ReactHighstock config={config} />
    </Container>
  );
};

chart.propTypes = {
  dataSet: PropTypes.arrayOf(PropTypes.array),
  text: PropTypes.string,
  symbol: PropTypes.string,
};

chart.defaultProps = {
  dataSet: [],
  text: '',
  symbol: '',
};

export default chart;
