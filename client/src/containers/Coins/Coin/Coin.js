import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Container, Divider, Segment } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';
import Chart from '../../../components/Chart/Chart';

class Coin extends Component {
  componentDidMount() {
    this.props.getCoinDetail(this.props.match.params.coinSymbol);
  }

  render() {
    const coinDescription = ReactHtmlParser(this.props.coinDetail.Description);

    return (
      <Container>
        <Chart
          dataSet={this.props.chartData}
          text={this.props.coinDetail.H1Text}
          symbol={this.props.match.params.coinSymbol}
        />
        <Divider />
        <Segment >
          <Container text>
            {coinDescription}
            {this.props.coinDetail.Feature}
          </Container>
        </Segment>
      </Container>
    );
  }
}

// PropTypes here
Coin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      coinSymbol: PropTypes.string,
    }),
  }).isRequired,
  getCoinDetail: PropTypes.func.isRequired,
  coinDetail: PropTypes.shape({
    Description: PropTypes.string,
    Feature: PropTypes.string,
    ImageUrl: PropTypes.string,
    H1Text: PropTypes.string,
  }).isRequired,
  chartData: PropTypes.arrayOf(PropTypes.array),
};

Coin.defaultProps = {
  chartData: [],
};

const mapStateToProps = state => ({
  coinDetail: state.coin.coinDetail,
  chartData: state.coin.coinChartData,
});

const mapDispatchToProps = dispatch => ({
  getCoinDetail: symbol => dispatch(actions.getCryptoCoinDetail(symbol)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Coin);
