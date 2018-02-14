import * as actionTypes from '../actions/actionTypes';

const initialState = {
  transactions: [],
  error: {},
  transactionItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRANSACTIONS:
      return {
        ...initialState,
        transactions: [...action.payload.data],
      };

    case actionTypes.CLEAR_TRANSACTION:
      return {
        ...initialState,
        transactions: [],
        error: {},
        transactionItems: [],
      };

    case actionTypes.FAILED_TRANSACTION:
      return {
        ...initialState,
        error: [...action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
