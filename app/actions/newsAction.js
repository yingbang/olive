/**
 * 新闻资讯
 */
'use strict';
import * as types from './actionTypes';
import request from 'superagent';

let host = types.REQUEST_HOST;

export function getNewsListAction(callback){
    return dispatch => {
        dispatch(showLoading());
        //开始请求网络
        request.get(host + '/api/news').query({_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorResult());
            }else{
                let json = res.body;
                dispatch(receiveNewsListResult(json));
                callback && callback();
            }
        });
    }
}
//显示加载中
function showLoading() {
    return {
        type: types.getNewsListAction,
    }
}
//接收到新闻列表
function receiveNewsListResult(result){
    return {
        type: types.receiveNewsListAction,
        data: result
    }
}
//发生错误
function errorResult(){
    return {
        type: types.errorNewsListAction
    }
}
//获取更多
export function getMoreNewsListAction(page,callback) {
    return dispatch => {
        request.get(host + '/api/news').query({p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorResult());
            }else{
                let json = res.body;
                //判断是否为最后一页
                if(page === json.totalPage){
                    dispatch(noMoreResult(json));
                }else{
                    dispatch(getMoreNewsListResult(json));
                }
                callback && callback();
            }
        });
    }
}
//加载下一页
function getMoreNewsListResult(result){
    return {
        type: types.getMoreNewsListAction,
        data: result
    }
}
//没有更多内容了
function noMoreResult(result){
    return {
        type: types.noMoreNewsListAction,
        data: result
    }
}

//下拉刷新
function refreshNewsListResult(result){
    return {
        type: types.refreshNewsListAction,
        data: result
    }
}