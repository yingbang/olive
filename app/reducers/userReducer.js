/**
 * 会员
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading : false,
    data:{},
    error:0,
};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case types.getUserListAction:
            return Object.assign({}, state, {
                loading: true
            });
        case types.receiveUserListAction:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.list
            });
        case types.errorUserListAction:
            return Object.assign({}, state, {
                loading: false,
                data: {},
                error:1
            });
        default:
            return state;
    }
}