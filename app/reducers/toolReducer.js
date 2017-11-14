/**
 * 幻灯片、公告
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading : false,
    data:{},
    error:0,
};

export default function toolReducer(state = initialState, action){
    switch (action.type) {
        case types.getSlideAction:
            return Object.assign({}, state, {
                loading: true
            });
        case types.receiveSlideAction:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.list
            });
        case types.errorSlideAction:
            return Object.assign({}, state, {
                loading: false,
                data: {},
                error:1
            });
        default:
            return state;
    }
}