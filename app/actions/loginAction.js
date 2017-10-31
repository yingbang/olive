/**
 * 用户登录Action操作
 */
'use strict';
import * as types from './actionTypes';

export function performLoginAction(){
    return dispatch => {
        dispatch(performLogin());
        setTimeout(
            () => {
                let result = {};
                dispatch(receiveLoginResult(result));
            }, 3000);
    }
}
function performLogin() {
    return {
        type: types.PERFORM_LOGIN_ACTION,
    }
}
function receiveLoginResult(result){
    return {
        type: types.RECEIVE_LOGIN_ACTION,
        data: result
    }
}