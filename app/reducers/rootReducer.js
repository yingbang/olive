import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import newsReducer from './newsReducer';
import toolReducer from './toolReducer';

const rootReducer = combineReducers({
    loginReducer,
    newsReducer,
    toolReducer,
});

export default rootReducer;