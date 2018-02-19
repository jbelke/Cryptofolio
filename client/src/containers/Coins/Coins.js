import React, { Component } from 'react';
import { Container, Segment, Divider, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopCoinsList from '../../components/TopCoinsList/TopCoinsList';
import * as actions from '../../store/actions/index';
import CoinExplorer from './CoinExplorer/CoinExplorer';

class Coins extends Component {
  state = {
    currentCoinCount: 15,
  }

  componentDidMount() {
    this.props.getCoins();
  }

  shouldComponentUpdate(nextProps) {
    let update = true;
    if (nextProps.topCoins.length === this.props.topCoins.length) {
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
    let coins = <div><p>Loader...</p></div>;
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
};

const mapStateToProps = state => ({
  topCoins: state.coin.topTen,
  coinSummary: state.coin.coinSnapShot,
});

const mapDispatchToProps = dispatch => ({
  getCoins: num => dispatch(actions.getTopCoins(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
