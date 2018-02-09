import { combineReducers } from 'redux';
import CoinReducer from './coins';

const rootReducer = combineReducers({
  coin: CoinReducer,
});

export default rootReducer;
