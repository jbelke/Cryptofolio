import { combineReducers } from 'redux';
import CoinReducer from './coins';
import NewsReducer from './news';

const rootReducer = combineReducers({
  coin: CoinReducer,
  news: NewsReducer,
});

export default rootReducer;
