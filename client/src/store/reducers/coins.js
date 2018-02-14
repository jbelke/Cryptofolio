import * as actionTypes from '../actions/actionTypes';

const initialState = {
  topTen: [],
  coinDetail: {},
  coinChartData: [],
  coinSearchList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_COINS:
      return {
        ...initialState,
        topTen: [...action.payload.data],
      };

    case actionTypes.GET_COIN_LIST:
      return {
        ...initialState,
        coinSearchList: [...action.payload],
      };

    case actionTypes.GET_COIN_DETAIL:
      return {
        ...initialState,
        coinDetail: { ...action.payload.data.Data.General },
        coinChartData: [...action.chartPayload],
      };

    default:
      return state;
  }
};

export default reducer;
