/**
 * 搜索相关网络请求
 */
import request from 'superagent';

//会员列表
export function getUserList(keyword,page,callback){
    //开始请求网络
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    request.get(host + '/api/user/searchUserList').query({p:page,keyword:keyword,_t:Math.random()}).end((err,res)=>{
        if(err){
            console.log(err);
        }else{
            let json = res.body;
            if(json !== null){
                callback && callback(json);
            }
        }
    });
}

//活动列表
export function getHuodongList(keyword,page,callback){
    //开始请求网络
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    request.get(host + '/api/content/huodong').query({p:page,keyword:keyword,_t:Math.random()}).end((err,res)=>{
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
                callback && callback(json);
            }
        }
    });
}

//动态列表
export function getDongtaiList(keyword,page,callback){
    //开始请求网络
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    request.get(host + '/api/content/dongtai').query({p:page,keyword:keyword,_t:Math.random()}).end((err,res)=>{
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
                                guanzhu:0,//是否为关注者发布的
                            };
                            realmObj.create("Dongtai",item,true);
                        }
                    });
                }catch(e){
                    console.log(e)
                }
                callback && callback(json);
            }
        }
    });
}

//文章列表
export function getNewsList(keyword,page,callback){
    //开始请求网络
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    request.get(host + '/api/content').query({p:page,keyword:keyword,_t:Math.random()}).end((err,res)=>{
        if(err){
            console.log(err);
        }else{
            let json = res.body;
            if(json !== null){
                callback && callback(json);
            }
        }
    });
}