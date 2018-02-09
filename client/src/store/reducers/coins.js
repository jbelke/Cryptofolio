import * as actionTypes from '../actions/actionTypes';
// import updateObject from '../utility';

const initialState = {
  topTen: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_COINS:
      return {
        ...initialState,
        topTen: [...action.payload.data],
      };
    default:
      return state;
  }
};

export default reducer;
