/**
 * 新闻资讯
 */
'use strict';
import * as types from './actionTypes';
import request from 'superagent';

//获取新闻列表
export function getNewsListAction(page,callback) {
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    return dispatch => {
        request.get(host + '/api/content').query({p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err)
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
                                pic:newsList[i]['pic'] !== null ? newsList[i]['pic'] : "",
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
                callback && callback(json.totalPage);
            }
        });
    }
}

//根据ID获取新闻内容
export function getNewsInfoByIdAction(id,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/content/article').query({id:id,userid:userid,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            //保存到新闻详情表
                            let item = {
                                id:json['id']+0,
                                title:json['title'],
                                content:json['content'] !== null ? json['content'] : "",
                                shoucang:json['shoucang']+0,
                            };
                            realmObj.create("NewsData",item,true);
                            //保存到新闻表
                            let news = {
                                id:json['id']+0,
                                cid:json['cid']+0,
                                title:json['title'],
                                pic:json['pic'] !== null ? json['pic'] : "",
                                intro:json['intro'] !== null ? json['intro'] : "",
                                flags:json['flags'] !== null ? json['flags'] : "",
                                author:json['author'] !== null ? json['author'] : "",
                                comments:json['comments']+0
                            };
                            realmObj.create("News",news,true);
                        });
                    }catch(e){
                        console.log(e)
                    }
                    //发送
                    callback && callback();
                }
            }
        });
    }
}
