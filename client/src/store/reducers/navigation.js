import * as actionTypes from '../actions/actionTypes';

const initialState = {
  address: null,
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
