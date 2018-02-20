import React, { Component } from 'react';
import { Grid, Segment, List, Label, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './TopCoinsList.scss';
import { numFormat } from '../../store/utility';
import ImageLoader from '../ImageLoader/ImageLoader';
import AreaChart from '../Chart/AreaChart/AreaChart';

class TopCoinsList extends Component {
  state = {
    columns: 8,
  }


  render() {
    const volume = '24h_volume_usd';
    const imageBaseUrl = 'https://files.coinmarketcap.com/static/img/coins/32x32/';
    const list = this.props.topCoins.map(coin => (
      <Grid.Column
        tablet={16}
        computer={this.state.columns}
        key={coin.id}
      >
        <Segment raised className={classes.Coin} >
          <Label.Group>
            <Label color="green" size="large" ribbon className={classes.Ribbon}>
              {coin.rank}
            </Label>
            <Link to={`/coins/detail/${coin.symbol}`}>
              <Label size="large" attached="top" className={classes.RibbonHeader}>
                <Header textAlign="center">
                  <span className={classes.HeaderSpan}>
                    <ImageLoader imageUrl={`${imageBaseUrl}${coin.id}.png`} />
                    {coin.name}: {coin.symbol}
                  </span>
                </Header>
              </Label>
            </Link>
          </Label.Group>

          <Grid stackable className={classes.Card}>
            <Grid.Column verticalAlign="middle" computer={5} tablet={5} mobile={16}>
              <List relaxed divided>
                <List.Item>
                  <List.Content>
                    Price: ${numFormat((coin.price_usd * 1).toFixed(2))}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    Market Cap:
                    <br />$ {numFormat(parseInt(coin.market_cap_usd, 10).toFixed())}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    24H Change:
                    <br />{coin.percent_change_7d}%
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    24H Volume:
                    <br />$ {numFormat(parseInt(coin[volume], 10).toFixed())}
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column computer={11} tablet={11} mobile={16}>
              <AreaChart coin={coin.symbol} />
            </Grid.Column>

          </Grid>
        </Segment>
      </Grid.Column>
    ));
    return (
      <Grid stackable >
        {list}
      </Grid>
    );
  }
}

// PropTypes here
TopCoinsList.propTypes = {
  topCoins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopCoinsList;
