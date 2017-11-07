/**
 * 新闻资讯
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading : false,
    data:{},
    error:0,
    isFinished:false
};

export default function newsReducer(state = initialState, action){
    //console.log("state...");console.log(state);console.log("action...");console.log(action.data);
    //console.log("object");console.log(Object.assign(action.data ? action.data.list : {},state.data));
    switch (action.type) {
        case types.getNewsListAction:
            return Object.assign({}, state, {
                loading: true
            });
        case types.receiveNewsListAction:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.list
            });
        case types.getMoreNewsListAction:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.list
            });
        case types.noMoreNewsListAction:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.list,
                isFinished:true
            });
        case types.refreshNewsListAction:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.list,
            });
        case types.errorNewsListAction:
            return Object.assign({}, state, {
                loading: false,
                data: {},
                error:1
            });
        default:
            return state;
    }
}