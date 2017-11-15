/**
 * 会员相关
 */
'use strict';
import * as types from './actionTypes';
import request from 'superagent';

//获取会员列表
export function getUserListAction(page,type,flag,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/user/getUserList').query({p:page,type:type,flag:flag,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorUserListResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let hidden = realmObj.objects("HiddenUser").filtered("id = " + contentList[i]['id']);
                            let user = {
                                id:parseInt(contentList[i]['id']),
                                type:parseInt(contentList[i]['type']),
                                flag:parseInt(contentList[i]['flag']),
                                name:contentList[i]['name'] !== null ? contentList[i]['name'] : "",
                                sex:contentList[i]['sex'] !== null ? contentList[i]['sex'] : "",
                                mobile:contentList[i]['mobile'] !== null ? contentList[i]['mobile'] : "",
                                nickname:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                username:contentList[i]['username'] !== null ? contentList[i]['username'] : "",
                                email:contentList[i]['email'] !== null ? contentList[i]['email'] : "",
                                province:contentList[i]['province'] !== null ? contentList[i]['province'] : "",
                                city:contentList[i]['city'] !== null ? contentList[i]['city'] : "",
                                area:contentList[i]['area'] !== null ? contentList[i]['area'] : "",
                                address:contentList[i]['address'] !== null ? contentList[i]['address'] : "",
                                weixin:contentList[i]['weixin'] !== null ? contentList[i]['weixin'] : "",
                                intro:contentList[i]['intro'] !== null ? contentList[i]['intro'] : "",
                                renzheng:contentList[i]['renzheng'] !== null ? contentList[i]['renzheng'] : "",
                                avatar:contentList[i]['avatar'] !== null ? host + contentList[i]['avatar'] : "",
                                visible:hidden.length <= 0,
                            };
                            realmObj.create("User",user,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                dispatch(receiveUserListResult(json));
                callback && callback();
            }
        });
    }
}
//接收到内容
function receiveUserListResult(result){
    return {
        type: types.receiveUserListAction,
        data: result
    }
}
//发生错误
function errorUserListResult(){
    return {
        type: types.errorUserListAction
    }
}

//获取会员信息
export function getUserInfoAction(mobile,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/user/info').query({mobile:mobile,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorUserInfoResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let hidden = realmObj.objects("HiddenUser").filtered("id = " + json['id']);
                        let user = {
                            id:parseInt(json['id']),
                            type:parseInt(json['type']),
                            flag:parseInt(json['flag']),
                            name:json['name'] !== null ? json['name'] : "",
                            sex:json['sex'] !== null ? json['sex'] : "",
                            mobile:json['mobile'] !== null ? json['mobile'] : "",
                            nickname:json['nickname'] !== null ? json['nickname'] : "",
                            username:json['username'] !== null ? json['username'] : "",
                            email:json['email'] !== null ? json['email'] : "",
                            province:json['province'] !== null ? json['province'] : "",
                            city:json['city'] !== null ? json['city'] : "",
                            area:json['area'] !== null ? json['area'] : "",
                            address:json['address'] !== null ? json['address'] : "",
                            weixin:json['weixin'] !== null ? json['weixin'] : "",
                            intro:json['intro'] !== null ? json['intro'] : "",
                            renzheng:json['renzheng'] !== null ? json['renzheng'] : "",
                            avatar:json['avatar'] !== null ? host + json['avatar'] : "",
                            visible:hidden.length <= 0,
                        };
                        realmObj.create("User",user,true);
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                dispatch(receiveUserInfoResult(json));
                callback && callback();
            }
        });
    }
}
//接收到内容
function receiveUserInfoResult(result){
    return {
        type: types.receiveUserInfoAction,
        data: result
    }
}
//发生错误
function errorUserInfoResult(){
    return {
        type: types.errorUserInfoAction
    }
}

//加入的公益组织
export function getJoinCompanyAction(page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/user/joinList').query({userid:userid,page:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorJoinCompanyResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        realmObj.delete(realmObj.objects("JoinCompany"));
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                            };
                            realmObj.create("JoinCompany",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                dispatch(receiveJoinCompanyResult(json));
                callback && callback();
            }
        });
    }
}
//接收到内容
function receiveJoinCompanyResult(result){
    return {
        type: types.receiveJoinCompanyListAction,
        data: result
    }
}
//发生错误
function errorJoinCompanyResult(){
    return {
        type: types.errorJoinCompanyListAction
    }
}

//关注的会员
export function getFollowUserAction(page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/user/guanzhuList').query({userid:userid,page:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                dispatch(errorFollowUserResult());
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        realmObj.delete(realmObj.objects("FollowUser"));
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                            };
                            realmObj.create("FollowUser",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                dispatch(receiveFollowUserResult(json));
                callback && callback();
            }
        });
    }
}
//接收到内容
function receiveFollowUserResult(result){
    return {
        type: types.receiveFollowUserListAction,
        data: result
    }
}
//发生错误
function errorFollowUserResult(){
    return {
        type: types.errorFollowUserListAction
    }
}