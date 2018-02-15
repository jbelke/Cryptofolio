import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Grid } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';
import SearchCoins from '../../Search/Search';

class CoinExplorer extends Component {
  state = {
    value: '',
  }

  clickedHandler = (event, data) => {
    const newValue = data.result.symbol;
    this.props.getCoinSummary(newValue);
    this.setState({ value: newValue });
  }

  render() {
    let summary = null;

    if (!this.props.coinSummary) {
      summary = (
        <div>
          Data: {this.props.coinSummary.PRICE}
        </div>
      );
    }


    return (
      <Segment as={Grid} divided columns={2} stackable >
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={5} >
            <SearchCoins
              clicked={this.clickedHandler}
              value={this.state.value}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={11} >
            Data: {this.props.coinSummary.PRICE}
            {summary}
          </Grid.Column>
        </Grid.Row>
      </Segment>
    );
  }
}

CoinExplorer.propTypes = {
  getCoinSummary: PropTypes.func.isRequired,
  coinSummary: PropTypes.shape({
    PRICE: PropTypes.string,
  }).isRequired,
};


const mapStateToProps = state => ({
  coinSummary: state.coin.coinSnapShot,
});

const mapDispatchToProps = dispatch => ({
  getCoinSummary: symbol => dispatch(actions.getCoinSnapShot(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinExplorer);
