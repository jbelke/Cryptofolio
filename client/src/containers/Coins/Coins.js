import React, { Component } from 'react';
import { Container, Segment, Divider, Header, Button, Responsive, Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopCoinsList from '../../components/TopCoinsList/TopCoinsList';
import * as actions from '../../store/actions/index';
import GlobalMarketSummary from '../../components/GlobalMarketSummary/GlobalMarketSummary';
import CoinExplorer from './CoinExplorer/CoinExplorer';

class Coins extends Component {
  // api limit 15  request per second on certain data
  state = {
    currentCoinCount: 15,
  }

  componentDidMount() {
    this.props.getCoins();
    this.props.getGlobalData();
  }

  shouldComponentUpdate(nextProps) {
    let update = true;
    if (nextProps.topCoins.length === this.props.topCoins.length &&
    nextProps.globalMarketData === this.props.globalMarketData) {
      update = false;
    }
    return update;
  }


  loadMoreHandler = async () => {
    const newCount = this.state.currentCoinCount + 15;
    await this.props.getCoins(newCount);
    this.setState({ currentCoinCount: newCount });
  }

  render() {
    let coins = (
      <div>
        <br />
        <Dimmer active inverted >
          <Loader size="massive"> Loading... </Loader>
        </Dimmer>
      </div>
    );
    if (this.props.topCoins.length > 0) {
      coins = (
        <TopCoinsList
          topCoins={this.props.topCoins}
          loader={() => this.isLoadingHandler()}
        />
      );
    }
    return (
      <Container>
        <Responsive
          as={GlobalMarketSummary}
          data={this.props.globalMarketData}
          minWidth={768}
        />
        <Divider />

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
  getGlobalData: PropTypes.func.isRequired,
  globalMarketData: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  topCoins: state.coin.topTen,
  coinSummary: state.coin.coinSnapShot,
  globalMarketData: state.coin.globalMarketData,
});

const mapDispatchToProps = dispatch => ({
  getCoins: num => dispatch(actions.getTopCoins(num)),
  getGlobalData: () => dispatch(actions.getGlobalMarketData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
