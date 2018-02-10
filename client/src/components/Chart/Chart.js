import React from 'react';
import { Container } from 'semantic-ui-react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import PropTypes from 'prop-types';


const chart = (props) => {
  const config = {
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: props.text,
    },
    series: [{
      name: props.symbol,
      data: props.dataSet,
      tooltip: {
        valueDecimals: 2,
      },
    }],
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
