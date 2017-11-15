import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import newsReducer from './newsReducer';
import toolReducer from './toolReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    loginReducer,
    newsReducer,
    toolReducer,
    userReducer,
});

export default rootReducer;