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
                            company:json['company'] !== null ? json['company'] : "",
                            job:json['job'] !== null ? json['job'] : "",
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
//修改会员信息，content的写法：a=1&b=2&c=3
export function updateUserInfoAction(content,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/user/updateUserInfo')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send(content)
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    let json = res.body;
                    //发送
                    callback && callback(json);
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
                                name:(contentList[i]['nickname'] !== null && contentList[i]['nickname'] !== undefined) ? contentList[i]['nickname'] : "",
                                avatar:(contentList[i]['avatar'] !== null && contentList[i]['avatar'] !== undefined) ? contentList[i]['avatar'] : "",
                            };
                            realmObj.create("JoinCompany",item,true);
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
                                name:(contentList[i]['nickname'] !== null && contentList[i]['nickname'] !== undefined) ? contentList[i]['nickname'] : "",
                                avatar:(contentList[i]['avatar'] !== null && contentList[i]['avatar'] !== undefined) ? contentList[i]['avatar'] : "",
                            };
                            realmObj.create("FollowUser",item,true);
                        }
                        //保存总数
                        realmObj.create("Global",{key:"guanzhuTotal", value:''+json.totalRow},true);
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

//我的粉丝：关注我的人
export function getFensiAction(page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/user/guanzhuFen').query({userid:userid,page:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let contentList = json.list;
                        realmObj.delete(realmObj.objects("Fensi"));
                        for(let i=0, l=contentList.length; i<l; i++){
                            let item = {
                                id:parseInt(contentList[i]['id']),
                                name:(contentList[i]['nickname'] !== null && contentList[i]['nickname'] !== undefined) ? contentList[i]['nickname'] : "",
                                avatar:(contentList[i]['avatar'] !== null && contentList[i]['avatar'] !== undefined) ? contentList[i]['avatar'] : "",
                            };
                            realmObj.create("Fensi",item,true);
                            //保存到会员表，要不就浪费了
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
                                avatar:contentList[i]['avatar'] !== null ? host + contentList[i]['avatar'] : "",
                                visible:hidden.length <= 0,
                            };
                            realmObj.create("User",user,true);
                        }
                        //保存总数
                        realmObj.create("Global",{key:"fensiTotal", value:''+json.totalRow},true);
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

//动态列表：如果有userid的话表示获取这个会员的所有动态
export function getDongtaiAction(userid,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let uid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
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
                        //如果查询的是自己的，保存一下总数
                        if(userid - uid === 0){
                            realmObj.create("Global",{key:"dongtaiTotal", value:''+json.totalRow},true);
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

//发布动态
export function fabuDongtaiAction(content,pics,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/dongtaiFabu')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("content=" + content)
            .send("pics=" + pics)
            .end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                //发送
                callback && callback(json);
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

//评论动态或文章
export function pinglunAction(content,id,to,type,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/pinglun')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("id=" + id)
            .send("from=" + userid)
            .send("content=" + content)
            .send("to=" + to)
            .send("type=" + type)
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    let json = res.body;
                    //发送
                    callback && callback(json);
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
                callback && callback(json.totalPage);
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
                                id:parseInt(contentList[i]['contentid']),
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

//点赞某个动态或取消点赞
export function zanDongtaiAction(id,type,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/dongtaiZan')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("type=" + type)
            .send("id=" + id)
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    let json = res.body;
                    if(json.state === 'ok'){
                        try{
                            realmObj.write(()=>{
                                if(type === 1){
                                    realmObj.create("ZanDongtai",{id:id},true);
                                    //更新动态的点赞数
                                    let dongtai = realmObj.objects("Dongtai").filtered("id = " + id);
                                    //realmObj.create("Dongtai",{id:id,zan:oldZan[0]['zan'] + 1},true);
                                    if(dongtai.length > 0){
                                        dongtai[0].zan = dongtai[0].zan + 1;
                                    }
                                }else{
                                    realmObj.delete(realmObj.objects("ZanDongtai").filtered("id = " + id));
                                    let oldZan = realmObj.objects("Dongtai").filtered("id = " + id);
                                    let newZan = oldZan[0]['zan'] - 1;
                                    realmObj.create("Dongtai",{id:id,zan:(newZan>=0) ? newZan : 0},true);
                                    //更新点赞者列表
                                    realmObj.delete(realmObj.objects("Zan").filtered("contentid = " + id + " and userid = " + userid));
                                }
                            });
                        }catch(e){}
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
//查看动态、文章的收藏状态
export function getCangStatusAction(contentid,type,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.get(host + '/api/user/getCangStatus').query({userid:userid,type:type,id:contentid,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                let status = false;
                if(json.state !== 'fail'){
                    status = true;
                }
                //发送
                callback && callback(status);
            }
        });
    }
}

//收藏、取消收藏动态、文章
export function cangDongtaiAction(id,type,status,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/shoucang')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("type=" + type)
            .send("id=" + id)
            .send("status=" + status)
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    let json = res.body;
                    if(json.state === 'ok'){}
                    //发送
                    callback && callback();
                }
            });
    }
}

//活动列表
export function getHuodongAction(page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/huodong').query({p:page,_t:Math.random()}).end((err,res)=>{
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
                                userid:contentList[i]['userid'] !== null ? parseInt(contentList[i]['userid']) : 0,
                                dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                starttime:contentList[i]['starttime'] !== null ? parseFloat(contentList[i]['starttime']) : 0,
                                endtime:contentList[i]['endtime'] !== null ? parseFloat(contentList[i]['endtime']) : 0,
                                title:contentList[i]['title'] !== null ? contentList[i]['title'] : "",
                                intro:contentList[i]['intro'] !== null ? contentList[i]['intro'] : "",
                                content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                                pic:contentList[i]['pic'] !== null ? contentList[i]['pic'] : "",
                                address:contentList[i]['address'] !== null ? contentList[i]['address'] : "",
                                quanzi:parseInt(contentList[i]['quanzi']),
                                number:parseInt(contentList[i]['number']),
                                status:parseInt(contentList[i]['status']),
                                orderby:parseInt(contentList[i]['orderby']),
                            };
                            realmObj.create("Huodong",item,true);
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

//获取活动信息
export function getHuodongInfoByIdAction(id,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/huodongContent').query({id:id,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            let item = {
                                id:parseInt(json['id']),
                                userid:json['userid'] !== null ? parseInt(json['userid']) : 0,
                                dateline:json['dateline'] !== null ? parseFloat(json['dateline']) : 0,
                                starttime:json['starttime'] !== null ? parseFloat(json['starttime']) : 0,
                                endtime:json['endtime'] !== null ? parseFloat(json['endtime']) : 0,
                                title:json['title'] !== null ? json['title'] : "",
                                intro:json['intro'] !== null ? json['intro'] : "",
                                content:json['content'] !== null ? json['content'] : "",
                                pic:json['pic'] !== null ? json['pic'] : "",
                                address:json['address'] !== null ? json['address'] : "",
                                quanzi:parseInt(json['quanzi']),
                                number:parseInt(json['number']),
                                status:parseInt(json['status']),
                                orderby:parseInt(json['orderby']),
                            };
                            realmObj.create("Huodong",item,true);
                        });
                    }catch(e){
                        console.log(e)
                    }
                }
                //发送
                callback && callback();
            }
        });
    }
}

//反馈意见
export function fankuiAction(title,content,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/tool/fankui')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("content=" + content)
            .send("title=" + title)
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    let json = res.body;
                    //发送
                    callback && callback(json);
                }
            });
    }
}