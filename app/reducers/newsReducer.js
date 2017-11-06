/**
 * 是否显示底部tab栏
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    isShow : true
};

export default function tabReducer(state = initialState, action){
    switch (action.type) {
        //隐藏tab
        case types.hideTabAction:
            return Object.assign({}, state, {
                isShow: false
            });
        //显示tab
        case types.showTabAction:
            return Object.assign({}, state, {
                isShow: true
            });
        default:
            return state;
    }
}