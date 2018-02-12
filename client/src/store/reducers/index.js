import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CoinReducer from './coins';
import NewsReducer from './news';


const rootReducer = combineReducers({
  coin: CoinReducer,
  news: NewsReducer,
  form: formReducer,
});

export default rootReducer;
