import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class TransactionSummary extends Component {
  state = {
    transactions: [],
    chartData: [],
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.marketValue).length !== 0 && nextProps.transactions.length > 0) {
      this.setState({
        transactions: nextProps.transactions,
      }, async () => {
        const dataArray = await this.combineData();
        this.aggregateChartData(dataArray);
      });
    }
  }

  getDayHistory = async (symbol, days) => {
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=${days}&e=CCCAGG`;
    const request = await axios.get(url);
    return request.data;
  }

  combineData = () => {
    const currentDate = new Date();
    // get areachart data for each trx
    const aggregateData = this.state.transactions.map(async (trx) => {
      const timeDifference = currentDate - new Date(trx.transactionDate);
      const numberDaysSinceTrx = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // get data history for transactions
      const dataHistory = await this.getDayHistory(trx.coinName, numberDaysSinceTrx);
      console.log(dataHistory);
      return { ...dataHistory, trxAmount: trx.coinAmount };
    });

    // this.setState({ summaryData: aggregateData });
    return aggregateData;
  }

  aggregateChartData = (dataArray) => {
    console.log(dataArray, 'createChartData');
    const data = [];
    const chartData = {};
    // get time series history of each trx
    Promise.all(dataArray)
      .then((result) => {
        console.log(result, 'result');
        result.forEach((day) => {
          console.log(day, 'day');
          const test = this.createChartData(day);
          data.push(test);
        });
      })
      .then(() => {
        // combine each trx into one chart dataset, time in millisecond
        data.forEach((trx) => {
          const keys = Object.keys(trx);
          keys.forEach((time) => {
            const timeInMilli = time * 1000;
            if (!chartData[timeInMilli]) {
              chartData[timeInMilli] = trx[time];
            } else {
              chartData[timeInMilli] += trx[time];
            }
          });
        });
        const chartDataFormatted = Object.entries(chartData);
        this.setState({ chartData: chartDataFormatted });
      });
  }

  createChartData = (trxObject) => {
    const dataByDays = {};
    const coinAmount = trxObject.trxAmount;
    trxObject.Data.forEach((day) => {
      if (!dataByDays[day.time]) {
        dataByDays[day.time] = coinAmount * day.close;
      } else {
        dataByDays[day.time] += coinAmount * day.close;
      }
    });
    return dataByDays;
  }


  render() {
    console.log(this.state.chartData);
    return (
      <div>test</div>
    );
  }
}

TransactionSummary.propTypes = {
  marketValue: PropTypes.objectOf(PropTypes.object).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  transactions: state.transaction.transactions,
  marketValue: state.coin.coinMarketValue,
});

export default connect(mapStateToProps)(TransactionSummary);
