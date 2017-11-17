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
                console.log(err);
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
                callback && callback();
            }
        });
    }
}

//根据手机号获取会员信息
export function getUserInfoAction(mobile,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/user/info').query({mobile:mobile,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
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
                callback && callback();
            }
        });
    }
}
//根据会员ID获取会员信息
export function getUserInfoByIdAction(userid,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/user/infoById').query({userid:userid,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
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
                callback && callback();
            }
        });
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
                console.log(err);
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
                callback && callback();
            }
        });
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
                console.log(err);
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
                callback && callback();
            }
        });
    }
}

//动态列表：如果有userid的话表示获取这个会员的所有动态
export function getDongtaiAction(userid,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let api = 'dongtai';
        if(userid !== null && userid !== ""){
            api = 'dongtaiByUser';
        }
        request.get(host + '/api/content/' + api).query({userid:userid,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                                userid:parseInt(contentList[i]['userid']),
                                pinglun:parseInt(contentList[i]['pinglun']),
                                zan:parseInt(contentList[i]['zan']),
                                share:parseInt(contentList[i]['share']),
                                jingxuan:parseInt(contentList[i]['jingxuan']),
                                dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                title:contentList[i]['title'] !== null ? contentList[i]['title'] : "",
                                content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                                pics:contentList[i]['pics'] !== null ? contentList[i]['pics'] : "",
                                pinglunlist:contentList[i]['pinglunlist'] !== null ? contentList[i]['pinglunlist'] : "",
                                name:(contentList[i]['nickname'] !== null && contentList[i]['nickname'] !== undefined) ? contentList[i]['nickname'] : "",
                                avatar:(contentList[i]['avatar'] !== null && contentList[i]['avatar'] !== undefined) ? contentList[i]['avatar'] : "",
                                guanzhu:userid ? 1 : 0,//是否为关注者发布的
                            };
                            realmObj.create("Dongtai",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                callback && callback(json.totalPage);
            }
        });
    }
}

//获取某个动态的评论
export function getPinglunAction(id,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/getPinglunById').query({id:id,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                                touserid:parseInt(contentList[i]['touserid']),
                                fromuserid:parseInt(contentList[i]['fromuserid']),
                                type:contentList[i]['type'] !== null ? parseInt(contentList[i]['type']) : 1,
                                zan:contentList[i]['zan'] !== null ? parseInt(contentList[i]['zan']) : 0,
                                contentid:parseInt(contentList[i]['contentid']),
                                dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                                name:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                            };
                            realmObj.create("Pinglun",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                callback && callback(json.totalPage);
            }
        });
    }
}

//获取某个动态的点赞列表
export function getZanAction(id,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/getZanById').query({id:id,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                                userid:parseInt(contentList[i]['userid']),
                                contentid:parseInt(contentList[i]['contentid']),
                                name:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",

                            };
                            realmObj.create("Zan",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                callback && callback();
            }
        });
    }
}

//获取点赞过的动态列表，用来判断是否点过赞
export function getZanDongtaiAction(page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/user/getZanList').query({userid:userid,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                            };
                            realmObj.create("ZanDongtai",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                callback && callback();
            }
        });
    }
}

//获取收藏过的内容
export function getCangAction(type,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/user/getCangList').query({userid:userid,type:type,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                                userid:parseInt(contentList[i]['userid']),
                                contentid:parseInt(contentList[i]['contentid']),
                                type:parseInt(contentList[i]['type']),
                            };
                            realmObj.create("Cang",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                //发送
                callback && callback();
            }
        });
    }
}