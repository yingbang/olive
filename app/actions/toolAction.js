/**
 * 幻灯片、公告等
 */
'use strict';
import * as types from './actionTypes';
import request from 'superagent';

export function getSlideAction(callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/tool/slide').query({_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorSlideResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        //删除原来的
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let slide = {
                                id:contentList[i]['id']+0,
                                title:contentList[i]['title'],
                                pic:contentList[i]['pic'] !== null ? contentList[i]['pic'] : "",
                                url:contentList[i]['url'] !== null ? contentList[i]['url'] : "",
                                content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                            };
                            realmObj.create("Slide",slide,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                dispatch(receiveSlideListResult(json));
                callback && callback();
            }
        });
    }
}
//接收到内容
function receiveSlideListResult(result){
    return {
        type: types.receiveSlideAction,
        data: result
    }
}
//发生错误
function errorSlideResult(){
    return {
        type: types.errorSlideAction
    }
}

export function getNoticeAction(page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/tool/notice').query({p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorNoticeResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        //删除原来的
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let old = realmObj.objects("Notice").filtered("id == "+contentList[i]['id']);
                            let item = {
                                id:contentList[i]['id']+0,
                                title:contentList[i]['title'],
                                author:contentList[i]['author'] !== null ? contentList[i]['author'] : "",
                                content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                                dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                type:contentList[i]['type'] !== null ? contentList[i]['type'] : 0,
                                hasread:(contentList[i]['hasread'] !== null && contentList[i]['hasread'] !== undefined) ? contentList[i]['hasread'] : 0,
                            };
                            //阅读状态不变
                            if(old && old.length>0){
                                item.hasread = old[0]['hasread'];
                            }
                            realmObj.create("Notice",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                dispatch(receiveNoticeListResult(json));
                callback && callback();
            }
        });
    }
}
//接收到内容
function receiveNoticeListResult(result){
    return {
        type: types.receiveNoticeAction,
        data: result
    }
}
//发生错误
function errorNoticeResult(){
    return {
        type: types.errorNoticeAction
    }
}