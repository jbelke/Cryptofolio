import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classes from './TopCoinsList.scss';


const topCoinsList = (props) => {
  const list = props.topCoins.map(coin => (
    <Grid.Column
      key={coin.id}
    >
      <Link to={`/coins/detail/${coin.symbol}`}>
        <Segment raised className={classes.Coin} >
          <p>Rank: {coin.rank}</p>
          <p>Symbol: {coin.symbol}</p>
          <p>{coin.name}</p>
          <p>Price: {coin.price_usd}</p>
        </Segment>
      </Link>
    </Grid.Column>
  ));

  return list;
};

export default topCoinsList;
