import { combineReducers } from "redux";

import subscriberReducer from './subscribers/Reducer';
import viewsReducer from './views/reducer';

const rootReducer = combineReducers({
  views: viewsReducer,
  subscribers: subscriberReducer
})

export default rootReducer;