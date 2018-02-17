import * as actionTypes from '../actions/actionTypes';

const initialState = {
  topTen: [],
  coinDetail: {},
  coinChartData: [],
  coinSearchList: [],
  coinSnapShot: {},
  globalMarketData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_COINS:
      return {
        ...state,
        topTen: [...action.payload.data],
      };

    case actionTypes.CLEAR_COIN_SUMMARY:
      return {
        ...state,
        coinSnapShot: {},
      };

    case actionTypes.GET_COIN_LIST:
      return {
        ...state,
        coinSearchList: [...action.payload],
      };

    case actionTypes.GET_GLOBAL_MARKET_DATA:
      return {
        ...state,
        globalMarketData: { ...action.payload.data },
      };

    case actionTypes.GET_COIN_CURR_SUMMARY:
      return {
        ...state,
        coinSnapShot: { ...action.payload.data.DISPLAY },
      };

    case actionTypes.GET_COIN_DETAIL:
      return {
        ...state,
        coinDetail: { ...action.payload.data.Data.General },
        coinChartData: [...action.chartPayload],
      };

    default:
      return state;
  }
};

export default reducer;
