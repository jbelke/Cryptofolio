import React from 'react';
import { Statistic, Loader, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const globalMarketSummary = (props) => {
  const {
    bitcoin_percentage_of_market_cap: btcDominance,
    total_24h_volume_usd: currentVolume,
    total_market_cap_usd: marketCap,
  } = props.data;

  const numFormat = (number) => {
    const numToStr = number.toString();
    let formatNum = '';

    for (let i = 0; i < numToStr.length; i += 1) {
      let substring = numToStr[numToStr.length - i - 1];
      if ((i + 1) % 3 === 0 && i > 0 && i !== numToStr.length - 1) {
        substring = `,${substring}`;
      }
      formatNum = substring + formatNum;
    }
    return formatNum;
  };

  let btcDom = <Loader active inline />;
  let volume = <Loader active inline />;
  let mktcap = <Loader active inline />;

  if (btcDominance !== undefined) {
    btcDom = `${btcDominance}`;
    volume = numFormat(currentVolume);
    mktcap = numFormat(marketCap);
  }


  return (
    <Statistic.Group as={Grid} container columns={3} size="mini" >
      <Statistic>
        <Statistic.Value>{btcDom}%</Statistic.Value>
        <Statistic.Label>BTC Dominance</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>${volume}</Statistic.Value>
        <Statistic.Label>24H Volume</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>${mktcap}</Statistic.Value>
        <Statistic.Label>MarketCap</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

globalMarketSummary.propTypes = {
  data: PropTypes.shape({
    active_assets: PropTypes.number,
    active_currencies: PropTypes.number,
    bitcoin_percentage_of_market_cap: PropTypes.number,
    total_24h_volume_usd: PropTypes.number,
    total_market_cap_usd: PropTypes.number,
  }).isRequired,
};


export default globalMarketSummary;
