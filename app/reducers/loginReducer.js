/**
 * 用户登录请求处理
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading : false,
    data:'agg'
};

export default function loginReducer(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_LOGIN_ACTION:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEIVE_LOGIN_ACTION:
            return Object.assign({}, state, {
                loading: false,
                data: action.result
            });
        default:
            return state;
    }
}