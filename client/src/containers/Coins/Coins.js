import React, { Component } from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getTopTenCoins from '../../store/actions/coins';

class Coins extends Component {
  componentDidMount() {
    this.props.getCoins();
  }

  render() {
    const coins = (
      <Grid stackable columns={2} >
        {this.props.topCoins.map(coin => (
          <Grid.Column
            key={coin.id}
          >
            <Segment>
              <p>Rank: {coin.rank}</p>
              <p>Symbol: {coin.symbol}</p>
              <p>{coin.name}</p>
              <p>Price: {coin.price_usd}</p>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    );

    return (
      <Container>
        {coins}
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
});

const mapDispatchToProps = dispatch => ({
  getCoins: () => dispatch(getTopTenCoins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
