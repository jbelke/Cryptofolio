import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Grid, Responsive, Statistic } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';
import SearchCoins from '../../Search/Search';
import classes from './CoinExplorer.scss';

class CoinExplorer extends Component {
  state = {
    value: '',
  }

  componentWillUnmount() {
    this.props.clearCoinSummary();
  }

  clickedHandler = (event, data) => {
    const newValue = data.result.symbol;
    this.props.getCoinSummary(newValue);
    this.setState({ value: newValue });
  }

  render() {
    const { OPEN24HOUR, HIGH24HOUR, LOW24HOUR } = this.props.coinSummary;
    let summary = null;

    if (Object.keys(this.props.coinSummary).length !== 0) {
      summary = (
        <Statistic.Group as={Grid} container columns={3} size="mini" >
          <Statistic>
            <Statistic.Value>{OPEN24HOUR}</Statistic.Value>
            <Statistic.Label>24H Open</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{HIGH24HOUR}</Statistic.Value>
            <Statistic.Label>24H High</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{LOW24HOUR}</Statistic.Value>
            <Statistic.Label>24 Low</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      );
    }


    return (
      <Segment
        as={Grid}
        divided
        columns={2}
        stackable
        className={classes.CoinExplorer}
      >
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={5} >
            <SearchCoins
              clicked={this.clickedHandler}
              value={this.state.value}
            />
          </Grid.Column>
          <Responsive minWidth={992} as={Grid.Column} mobile={16} computer={11} >
            {summary}
          </Responsive>
        </Grid.Row>
      </Segment>
    );
  }
}

CoinExplorer.propTypes = {
  getCoinSummary: PropTypes.func.isRequired,
  coinSummary: PropTypes.shape({
    OPEN24HOUR: PropTypes.string,
    HIGH24HOUR: PropTypes.string,
    LOW24HOUR: PropTypes.string,
  }).isRequired,
  clearCoinSummary: PropTypes.func.isRequired,
};

CoinExplorer.defaultProp = {
  coinSummary: PropTypes.shape({
    OPEN24HOUR: 0,
    HIGH24HOUR: 0,
    LOW24HOUR: 0,
  }),
};

const mapStateToProps = state => ({
  coinSummary: state.coin.coinSnapShot,
});

const mapDispatchToProps = dispatch => ({
  getCoinSummary: symbol => dispatch(actions.getCoinSnapShot(symbol)),
  clearCoinSummary: () => dispatch(actions.clearCoinSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinExplorer);
