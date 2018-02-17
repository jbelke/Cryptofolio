import React, { Component } from 'react';
import { Grid, Container, Segment, Divider, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopCoinsList from '../../components/TopCoinsList/TopCoinsList';
import * as actions from '../../store/actions/index';
import CoinExplorer from './CoinExplorer/CoinExplorer';

class Coins extends Component {
  state = {
    currentCoinCount: 50,
    isLoading: false,
  }

  componentDidMount() {
    this.props.getCoins();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.list.length !== this.props.list.length) {
      return false;
    }
    return true;
  }

  loadMoreHandler = async () => {
    const newCount = this.state.currentCoinCount + 50;
    await this.props.getCoins(newCount);
    this.setState({ currentCoinCount: newCount, isLoading: false });
  }

  render() {
    const coins = (
      <Grid stackable columns={2} >
        <TopCoinsList topCoins={this.props.topCoins} />
      </Grid>
    );

    return (
      <Container>
        <CoinExplorer />

        <Divider />

        <Segment>
          <Header as="h2" textAlign="center" >Top Coins</Header>
          {coins}
        </Segment>
        <div>
          <Button
            onClick={this.loadMoreHandler}
            fluid
            loading={this.state.isLoading}
            icon="chevron down"
            size="big"
          />
        </div>
      </Container>
    );
  }
}

// PropTypes here
Coins.propTypes = {
  getCoins: PropTypes.func.isRequired,
  topCoins: PropTypes.arrayOf(PropTypes.object).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  topCoins: state.coin.topTen,
  list: state.coin.coinSearchList,
  coinSummary: state.coin.coinSnapShot,
});

const mapDispatchToProps = dispatch => ({
  getCoins: num => dispatch(actions.getTopCoins(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
