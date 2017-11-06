/**
 * 资讯
 */
'use strict';
import * as types from './actionTypes';

//显示
export function showTabAction() {
    return {
        type:types.showTabAction
    }
}

//隐藏
export function hideTabAction() {
    return {
        type:types.hideTabAction
    }
}