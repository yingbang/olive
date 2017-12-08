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
                            let hidden = realmObj.objects("HiddenUser").filtered("id == " + contentList[i]['id']);
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
                                renzheng:contentList[i]['renzheng'] !== null ? contentList[i]['renzheng']+"" : "-1",
                                avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                                visible:hidden.length <= 0,
                                renzhengleixing:contentList[i]['renzhengleixing'] !== null ? contentList[i]['renzhengleixing'] : 0,
                                renzhengshijian:contentList[i]['renzhengshijian'] !== null ? contentList[i]['renzhengshijian'] : 0,
                                renzhengzhuangtai:contentList[i]['renzhengzhuangtai'] !== null ? contentList[i]['renzhengzhuangtai'] : 0,
                                shenfenzheng:contentList[i]['shenfenzheng'] !== null ? contentList[i]['shenfenzheng'] : "",
                                idnumber:contentList[i]['idnumber'] !== null ? contentList[i]['idnumber'] : "",
                                zhizhao:contentList[i]['zhizhao'] !== null ? contentList[i]['zhizhao'] : "",
                                zuzhi:contentList[i]['zuzhi'] !== null ? contentList[i]['zuzhi'] : "",
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
                        let hidden = realmObj.objects("HiddenUser").filtered("id == " + json['id']);
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
                            renzheng:json['renzheng'] !== null ? json['renzheng']+"" : "-1",
                            avatar:json['avatar'] !== null ? json['avatar'] : "",
                            visible:hidden.length <= 0,
                            renzhengleixing:json['renzhengleixing'] !== null ? json['renzhengleixing'] : 0,
                            renzhengshijian:json['renzhengshijian'] !== null ? json['renzhengshijian'] : 0,
                            renzhengzhuangtai:json['renzhengzhuangtai'] !== null ? json['renzhengzhuangtai'] : 0,
                            shenfenzheng:json['shenfenzheng'] !== null ? json['shenfenzheng'] : "",
                            idnumber:json['idnumber'] !== null ? json['idnumber'] : "",
                            zhizhao:json['zhizhao'] !== null ? json['zhizhao'] : "",
                            zuzhi:json['zuzhi'] !== null ? json['zuzhi'] : "",
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
        getUserInfoById(userid,callback);
    }
}
//这个是纯方法，不用dispatch
export function getUserInfoById(userid,callback) {
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    request.get(host + '/api/user/infoById').query({userid:userid,_t:Math.random()}).end((err,res)=>{
        if(err){
            console.log(err);
        }else{
            let json = res.body;
            //保存到realm
            try{
                realmObj.write(()=>{
                    let hidden = realmObj.objects("HiddenUser").filtered("id == " + json['id']);
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
                        renzheng:json['renzheng'] !== null ? json['renzheng']+"" : "-1",
                        avatar:json['avatar'] !== null ? json['avatar'] : "",
                        visible:hidden.length <= 0,
                        renzhengleixing:json['renzhengleixing'] !== null ? json['renzhengleixing'] : 0,
                        renzhengshijian:json['renzhengshijian'] !== null ? json['renzhengshijian'] : 0,
                        renzhengzhuangtai:json['renzhengzhuangtai'] !== null ? json['renzhengzhuangtai'] : 0,
                        shenfenzheng:json['shenfenzheng'] !== null ? json['shenfenzheng'] : "",
                        idnumber:json['idnumber'] !== null ? json['idnumber'] : "",
                        zhizhao:json['zhizhao'] !== null ? json['zhizhao'] : "",
                        zuzhi:json['zuzhi'] !== null ? json['zuzhi'] : "",
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
//修改会员地址：省份、城市、地区、详细地址
export function updateUserAdressAction(province,city,area,address,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/user/updateAddress')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("province=" + province)
            .send("city=" + city)
            .send("area=" + area)
            .send("address=" + address)
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
//会员认证
export function renzhengAction(content,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/user/renzheng')
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
                if(json !== null){
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
                                    intro:(contentList[i]['intro'] !== null && contentList[i]['intro'] !== undefined) ? contentList[i]['intro'] : "",
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
                if(json !== null){
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
                                    sex:(contentList[i]['sex'] !== null && contentList[i]['sex'] !== undefined) ? contentList[i]['sex'] : "",
                                    intro:(contentList[i]['intro'] !== null && contentList[i]['intro'] !== undefined) ? contentList[i]['intro'] : "",
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
                if(json !== null){
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
                                let hidden = realmObj.objects("HiddenUser").filtered("id == " + contentList[i]['id']);
                                let user = {
                                    id:parseInt(contentList[i]['id']),
                                    type:parseInt(contentList[i]['type']),
                                    flag:parseInt(contentList[i]['flag']),
                                    name:contentList[i]['name'] !== null ? contentList[i]['name'] : "",
                                    sex:contentList[i]['sex'] !== null ? contentList[i]['sex'] : "",
                                    mobile:contentList[i]['mobile'] !== null ? contentList[i]['mobile'] : "",
                                    nickname:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                    username:contentList[i]['username'] !== null ? contentList[i]['username'] : "",
                                    avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
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
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            let contentList = json.list;
                            for(let i=0, l=contentList.length; i<l; i++){
                                let item = {
                                    id:parseInt(contentList[i]['id']),
                                    userid:parseInt(contentList[i]['userid']),
                                    quanzi:parseInt(contentList[i]['quanzi']),
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
            }
        });
    }
}
//根据ID获取动态内容
export function getDongtaiInfoByIdAction(id,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/dongtaiContent').query({id:id,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            //保存到动态表
                            let item = {
                                id:parseInt(json['id']),
                                userid:parseInt(json['userid']),
                                quanzi:parseInt(json['quanzi']),
                                pinglun:parseInt(json['pinglun']),
                                zan:parseInt(json['zan']),
                                share:parseInt(json['share']),
                                jingxuan:parseInt(json['jingxuan']),
                                dateline:json['dateline'] !== null ? parseFloat(json['dateline']) : 0,
                                title:json['title'] !== null ? json['title'] : "",
                                content:json['content'] !== null ? json['content'] : "",
                                pics:json['pics'] !== null ? json['pics'] : "",
                                pinglunlist:json['pinglunlist'] !== null ? json['pinglunlist'] : "",
                            };
                            realmObj.create("Dongtai",item,true);
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

//发布动态
export function fabuDongtaiAction(content,pics,quanzi,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/dongtaiFabu')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("content=" + content)
            .send("pics=" + pics)
            .send("quanzi=" + quanzi)
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
                if(json !== null){
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
                if(json !== null){
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
                                    let dongtai = realmObj.objects("Dongtai").filtered("id == " + id);
                                    //realmObj.create("Dongtai",{id:id,zan:oldZan[0]['zan'] + 1},true);
                                    if(dongtai.length > 0){
                                        dongtai[0].zan = dongtai[0].zan + 1;
                                    }
                                }else{
                                    realmObj.delete(realmObj.objects("ZanDongtai").filtered("id == " + id));
                                    let oldZan = realmObj.objects("Dongtai").filtered("id == " + id);
                                    let newZan = oldZan[0]['zan'] - 1;
                                    realmObj.create("Dongtai",{id:id,zan:(newZan>=0) ? newZan : 0},true);
                                    //更新点赞者列表
                                    realmObj.delete(realmObj.objects("Zan").filtered("contentid == " + id + " and userid == " + userid));
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
                if(json !== null){
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
                    callback && callback(json.totalPage);
                }
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
                if(json !== null){
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
                                    jiezhitime:contentList[i]['jiezhitime'] !== null ? parseFloat(contentList[i]['jiezhitime']) : 0,
                                    title:contentList[i]['title'] !== null ? contentList[i]['title'] : "",
                                    intro:contentList[i]['intro'] !== null ? contentList[i]['intro'] : "",
                                    content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                                    pic:contentList[i]['pic'] !== null ? contentList[i]['pic'] : "",
                                    city:contentList[i]['city'] !== null ? contentList[i]['city'] : "",
                                    address:contentList[i]['address'] !== null ? contentList[i]['address'] : "",
                                    quanzi:parseInt(contentList[i]['quanzi']),
                                    number:parseInt(contentList[i]['number']),
                                    status:parseInt(contentList[i]['status']),
                                    orderby:parseInt(contentList[i]['orderby']),
                                    name:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                    avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                                    zhubanfang:contentList[i]['zhubanfang'] !== null ? contentList[i]['zhubanfang'] : "",
                                    zan:contentList[i]['zan'] !== null ? contentList[i]['zan'] : 0,
                                    pinglun:contentList[i]['pinglun'] !== null ? contentList[i]['pinglun'] : 0,
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
                                jiezhitime:json['jiezhitime'] !== null ? parseFloat(json['jiezhitime']) : 0,
                                title:json['title'] !== null ? json['title'] : "",
                                intro:json['intro'] !== null ? json['intro'] : "",
                                content:json['content'] !== null ? json['content'] : "",
                                pic:json['pic'] !== null ? json['pic'] : "",
                                city:json['city'] !== null ? json['city'] : "",
                                address:json['address'] !== null ? json['address'] : "",
                                quanzi:parseInt(json['quanzi']),
                                number:parseInt(json['number']),
                                status:parseInt(json['status']),
                                orderby:parseInt(json['orderby']),
                                name:json['nickname'] !== null ? json['nickname'] : "",
                                avatar:json['avatar'] !== null ? json['avatar'] : "",
                                zhubanfang:json['zhubanfang'] !== null ? json['zhubanfang'] : "",
                                zan:json['zan'] !== null ? json['zan'] : 0,
                                pinglun:json['pinglun'] !== null ? json['pinglun'] : 0,
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
//活动报名
export function huodongBaomingAction(huodongid,name,mobile,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/huodongBaoming')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("huodongid=" + huodongid)
            .send("mobile=" + mobile)
            .send("name=" + name)
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
//取消活动报名
export function cancelBaomingAction(huodongid,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/cancelBaoming')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("huodongid=" + huodongid)
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
//查询是否报名
export function getBaomingInfoByIdAction(userid,huodongid,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/huodongBaomingInfo').query({userid:userid,huodongid:huodongid,_t:Math.random()}).end((err,res)=>{
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
                                huodongid:json['huodongid'] !== null ? parseInt(json['huodongid']) : 0,
                                dateline:json['dateline'] !== null ? parseFloat(json['dateline']) : 0,
                                mobile:json['mobile'] !== null ? json['mobile'] : "",
                                name:json['name'] !== null ? json['name'] : "",//这个就是name不是nickname
                                avatar:json['avatar'] !== null ? json['avatar'] : "",
                            };
                            realmObj.create("HuodongBaoming",item,true);
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
//查询某个会员的所有活动
export function getHuodongByUseridAction(userid,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/getHuodongByUserid').query({userid:userid,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            let contentList = json.list;
                            for(let i=0, l=contentList.length; i<l; i++){
                                let item = {
                                    id:parseInt(contentList[i]['id']),
                                    userid:contentList[i]['userid'] !== null ? parseInt(contentList[i]['userid']) : 0,
                                    huodongid:contentList[i]['huodongid'] !== null ? parseInt(contentList[i]['huodongid']) : 0,
                                    dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                    mobile:contentList[i]['mobile'] !== null ? contentList[i]['mobile'] : "",
                                    name:contentList[i]['name'] !== null ? contentList[i]['name'] : "",//这个就是name不是nickname
                                    avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                                };
                                realmObj.create("HuodongBaoming",item,true);
                            }
                        });
                    }catch(e){
                        console.log(e)
                    }
                    //发送
                    callback && callback(json.totalPage);
                }
            }
        });
    }
}
//查询某个活动的所有参与者
export function getHuodongUserAction(huodongid,page,callback) {
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/getHuodongUser').query({huodongid:huodongid,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            let contentList = json.list;
                            for(let i=0, l=contentList.length; i<l; i++){
                                let item = {
                                    id:parseInt(contentList[i]['id']),
                                    userid:contentList[i]['userid'] !== null ? parseInt(contentList[i]['userid']) : 0,
                                    huodongid:contentList[i]['huodongid'] !== null ? parseInt(contentList[i]['huodongid']) : 0,
                                    dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                    mobile:contentList[i]['mobile'] !== null ? contentList[i]['mobile'] : "",
                                    name:contentList[i]['name'] !== null ? contentList[i]['name'] : "",//这个就是name不是nickname
                                    avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                                };
                                realmObj.create("HuodongBaoming",item,true);
                            }
                        });
                    }catch(e){
                        console.log(e)
                    }
                    //发送
                    callback && callback(json.totalPage);
                }
            }
        });
    }
}


//圈子列表isHot表示是否热门，category表示分类
export function getQuanziAction(isHot,category,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/quanzi').query({hot:isHot,category:category,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            let contentList = json.list;
                            for(let i=0, l=contentList.length; i<l; i++){
                                let item = {
                                    id:parseInt(contentList[i]['id']),
                                    userid:contentList[i]['userid'] !== null ? parseInt(contentList[i]['userid']) : 0,
                                    name:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                    avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                                    title:contentList[i]['title'] !== null ? contentList[i]['title'] : "",
                                    intro:contentList[i]['intro'] !== null ? contentList[i]['intro'] : "",
                                    content:contentList[i]['content'] !== null ? contentList[i]['content'] : "",
                                    pic:contentList[i]['pic'] !== null ? contentList[i]['pic'] : "",
                                    address:contentList[i]['address'] !== null ? contentList[i]['address'] : "",
                                    dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                    erweima:contentList[i]['erweima'] !== null ? contentList[i]['erweima'] : "",
                                    number:parseInt(contentList[i]['number']),
                                    status:parseInt(contentList[i]['status']),
                                    verify:parseInt(contentList[i]['verify']),
                                    hot:parseInt(contentList[i]['hot']),
                                };
                                realmObj.create("Quanzi",item,true);
                            }
                        });
                    }catch(e){
                        console.log(e)
                    }
                    //发送
                    callback && callback(json.totalPage);
                }
            }
        });
    }
}
//获取圈子信息
export function getQuanziInfoByIdAction(id,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/quanziContent').query({id:id,_t:Math.random()}).end((err,res)=>{
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
                                name:json['nickname'] !== null ? json['nickname'] : "",
                                avatar:json['avatar'] !== null ? json['avatar'] : "",
                                title:json['title'] !== null ? json['title'] : "",
                                intro:json['intro'] !== null ? json['intro'] : "",
                                content:json['content'] !== null ? json['content'] : "",
                                pic:json['pic'] !== null ? json['pic'] : "",
                                address:json['address'] !== null ? json['address'] : "",
                                dateline:json['dateline'] !== null ? parseFloat(json['dateline']) : 0,
                                erweima:json['erweima'] !== null ? json['erweima'] : "",
                                number:parseInt(json['number']),
                                status:parseInt(json['status']),
                                verify:parseInt(json['verify']),
                                hot:parseInt(json['hot']),
                            };
                            realmObj.create("Quanzi",item,true);
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
//圈子加入退出
export function QuanziJoinAction(type,quanzi,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        request.post(host + '/api/content/quanziJoin')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send("userid=" + userid)
            .send("quanzi=" + quanzi)
            .send("type=" + type)
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    let json = res.body;
                    //删除本地的
                    if(type === 0){
                        let join = realmObj.objects("QuanziUser").filtered("userid == "+userid+" and quanzi == "+quanzi);
                        realmObj.write(()=>{
                            realmObj.delete(join);
                        });
                    }
                    //发送
                    callback && callback(json);
                }
            });
    }
}
//查询是否加入圈子
export function getQuanziJoinInfoAction(userid,quanzi,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/quanziJoinInfo').query({userid:userid,quanzi:quanzi,_t:Math.random()}).end((err,res)=>{
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
                                quanzi:json['quanzi'] !== null ? parseInt(json['quanzi']) : 0,
                                dateline:json['dateline'] !== null ? parseFloat(json['dateline']) : 0,
                                status:json['status'] !== null ? parseInt(json['status']) : 0,
                                memo:json['memo'] !== null ? json['memo'] : "",
                                name:json['nickname'] !== null ? json['nickname'] : "",
                                avatar:json['avatar'] !== null ? json['avatar'] : "",
                            };
                            realmObj.create("QuanziUser",item,true);
                        });
                    }catch(e){
                        console.log(e)
                    }
                }else{
                    //如果没有，就删除本地的
                    let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
                    let join = realmObj.objects("QuanziUser").filtered("userid == "+userid+" and quanzi == "+quanzi);
                    realmObj.write(()=>{
                        realmObj.delete(join);
                    });
                }
                //发送
                callback && callback();
            }
        });
    }
}
//获取圈子的所有成员
export function getQuanziUserAction(id,page,callback){
    return dispatch => {
        //开始请求网络
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        request.get(host + '/api/content/quanziUser').query({id:id,p:page,_t:Math.random()}).end((err,res)=>{
            if(err){
                console.log(err);
            }else{
                let json = res.body;
                if(json !== null){
                    //保存到realm
                    try{
                        realmObj.write(()=>{
                            let contentList = json.list;
                            for(let i=0, l=contentList.length; i<l; i++){
                                let item = {
                                    id:parseInt(contentList[i]['id']),
                                    userid:contentList[i]['userid'] !== null ? parseInt(contentList[i]['userid']) : 0,
                                    quanzi:contentList[i]['quanzi'] !== null ? parseInt(contentList[i]['quanzi']) : 0,
                                    dateline:contentList[i]['dateline'] !== null ? parseFloat(contentList[i]['dateline']) : 0,
                                    status:contentList[i]['status'] !== null ? parseInt(contentList[i]['status']) : 0,
                                    memo:contentList[i]['memo'] !== null ? contentList[i]['memo'] : "",
                                    name:contentList[i]['nickname'] !== null ? contentList[i]['nickname'] : "",
                                    avatar:contentList[i]['avatar'] !== null ? contentList[i]['avatar'] : "",
                                };
                                realmObj.create("QuanziUser",item,true);
                            }
                        });
                    }catch(e){
                        console.log(e)
                    }
                    //发送
                    callback && callback(json.totalPage);
                }
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