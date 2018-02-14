import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addTransaction = (data) => {
  const url = '/api/transactions/create';

  return async (dispatch) => {
    const request = await axios.post(url, data);
    dispatch({
      type: actionTypes.GET_TRANSACTIONS,
      payload: request,
    });
  };
};

export const getTransactions = (firebaseUID) => {
  const url = `/api/transactions/${firebaseUID}`;
  console.log(url, 'getTransactions');
  return async (dispatch) => {
    const request = await axios.get(url);
    dispatch({
      type: actionTypes.GET_TRANSACTIONS,
      payload: request,
    });
  };
};

export const clearTransactions = () => ({
  type: actionTypes.CLEAR_TRANSACTION,
});

export default getTransactions;
