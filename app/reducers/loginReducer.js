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
        //开始登录
        case types.loginMobileAction:
            return Object.assign({}, state, {
                isLogin: false,
                msg: action.result
            });
        //登录成功
        case types.loginSuccessAction:
            return Object.assign({}, state, {
                isLogin: true,
                msg: action.result
            });
        //登录失败
        case types.loginFailAction:
            return Object.assign({}, state, {
                isLogin: false,
                msg: action.result
            });
        //退出登录
        case types.logoutAction:
            return Object.assign({}, state, {
                isLogin: false,
                msg: action.result
            });
        //注册
        case types.registerMobileAction:
            return Object.assign({},state,{
                isLogin:false,
                msg: action.result
            });
        //找回密码
        case types.findPasswordAction:
            return Object.assign({},state,{
                isLogin:false,
                msg: action.result
            });
        default:
            return state;
    }
}