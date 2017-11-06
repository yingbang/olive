import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
    loginReducer,
    newsReducer,
});

export default rootReducer;