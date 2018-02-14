import React, { Component } from 'react';
import { Grid, Container, Segment, Divider, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopCoinsList from '../../components/TopCoinsList/TopCoinsList';
import * as actions from '../../store/actions/index';
import SearchCoins from '../Search/Search';

class Coins extends Component {
  componentDidMount() {
    this.props.getCoins();
    this.props.getList();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.list.length > 1) {
      return false;
    }
    return true;
  }

  render() {
    const coins = (
      <Grid stackable columns={2} >
        <TopCoinsList topCoins={this.props.topCoins} />
      </Grid>
    );


    return (
      <Container>
        <SearchCoins list={this.props.list} />
        <Divider />
        <Segment>
          <Header>Top 50 Coins</Header>
          {coins}
        </Segment>
      </Container>
    );
  }
}

// PropTypes here
Coins.propTypes = {
  getCoins: PropTypes.func.isRequired,
  topCoins: PropTypes.arrayOf(PropTypes.object).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topCoins: state.coin.topTen,
  list: state.coin.coinSearchList,
});

const mapDispatchToProps = dispatch => ({
  getCoins: () => dispatch(actions.getTopCoins()),
  getList: () => dispatch(actions.getCoinList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
