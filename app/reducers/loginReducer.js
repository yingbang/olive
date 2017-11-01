/**
 * 用户登录请求处理
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    isLogin : false,
    msg:''
};

export default function loginReducer(state = initialState, action){
    switch (action.type) {
        case types.loginMobileAction:
            return Object.assign({}, state, {
                isLogin: true,
                msg: action.result
            });
        case types.loginSuccessAction:
            return Object.assign({}, state, {
                isLogin: false,
                msg: action.result
            });
        case types.loginFailAction:
            return Object.assign({}, state, {
                isLogin: false,
                msg: action.result
            });
        case types.registerMobileAction:
            return Object.assign({},state,{
                isLogin:false,
                msg: action.result
            });
        default:
            return state;
    }
}