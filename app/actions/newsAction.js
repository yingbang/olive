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
        request.get(host + '/api/content').query({_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let newsList = json.list;
                        for(let i=0, l=newsList.length; i<l; i++){
                            let news = {
                                id:newsList[i]['id']+0,
                                cid:newsList[i]['cid']+0,
                                title:newsList[i]['title'],
                                pic:newsList[i]['pic'] !== null ? host + newsList[i]['pic'] : "",
                                intro:newsList[i]['intro'] !== null ? newsList[i]['intro'] : "",
                                flags:newsList[i]['flags'] !== null ? newsList[i]['flags'] : "",
                                author:newsList[i]['author'] !== null ? newsList[i]['author'] : "",
                                views:newsList[i]['views']+0,
                                comments:newsList[i]['comments']+0
                            };
                            realmObj.create("News",news,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
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
        request.get(host + '/api/content').query({p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let newsList = json.list;
                        for(let i=0, l=newsList.length; i<l; i++){
                            let news = {
                                id:newsList[i]['id']+0,
                                cid:newsList[i]['cid']+0,
                                title:newsList[i]['title'],
                                pic:newsList[i]['pic'] !== null ? host + newsList[i]['pic'] : "",
                                intro:newsList[i]['intro'] !== null ? newsList[i]['intro'] : "",
                                flags:newsList[i]['flags'] !== null ? newsList[i]['flags'] : "",
                                author:newsList[i]['author'] !== null ? newsList[i]['author'] : "",
                                views:newsList[i]['views']+0,
                                comments:newsList[i]['comments']+0
                            };
                            realmObj.create("News",news,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
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