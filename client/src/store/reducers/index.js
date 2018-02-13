import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CoinReducer from './coins';
import NewsReducer from './news';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  coin: CoinReducer,
  news: NewsReducer,
  auth: AuthReducer,
  form: formReducer,
});

export default rootReducer;
