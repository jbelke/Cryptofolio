import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as utilityFunc from '../utility';

export const getTopCoins = (numCoinLookup = 50) => {
  const url = `https://api.coinmarketcap.com/v1/ticker/?limit=${numCoinLookup}`;
  return async (dispatch) => {
    const request = await axios.get(url);

    dispatch({
      type: actionTypes.GET_TOP_COINS,
      payload: request,
    });
  };
};

export const getCoinList = () => {
  const url = '/api/coins';

  return async (dispatch) => {
    const request = await axios.get(url);
    const transformedData = utilityFunc.transformToSearchList(request.data);

    dispatch({
      type: actionTypes.GET_COIN_LIST,
      payload: transformedData,
    });
  };
};

export const getCoinSnapShot = (symbol) => {
  const url = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${symbol}&tsym=USD&e=CCCAGG`;

  return async (dispatch) => {
    const request = await axios.get(url);
    dispatch({
      type: actionTypes.GET_COIN_CURR_SUMMARY,
      payload: request,
    });
  };
};

export const getCryptoCoinDetail = (symbol) => {
  const url = `/api/coins/detail/${symbol}`;
  const chartUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&aggregate=1&e=CCCAGG&allData=1`;

  return async (dispatch) => {
    const request = await axios.get(url);
    const chartRequest = await axios.get(chartUrl);
    const chartData = await utilityFunc.transformToChartData(chartRequest.data.Data);

    dispatch({
      type: actionTypes.GET_COIN_DETAIL,
      payload: request,
      chartPayload: chartData,
    });
  };
};

export const getGlobalMarketData = () => {
  const url = 'https://api.coinmarketcap.com/v1/global/';

  return async (dispatch) => {
    const request = await axios.get(url);

    dispatch({
      type: actionTypes.GET_GLOBAL_MARKET_DATA,
      payload: request,
    });
  };
};

export const clearCoinSummary = () => ({
  type: actionTypes.CLEAR_COIN_SUMMARY,
});
