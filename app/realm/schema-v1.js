/**
 * @flow
 */

'use strict';

//global公共信息存储
const GlobalSchema = {
    name:"Global",
    primaryKey:"key",
    properties: {
        key:'string',
        value:'string'
    }
};

//公告头条
const NoticeSchema = {
    name:'Notice',
    primaryKey:'id',
    properties:{
        id:'int',
        title:{type:'string',default:''},
        author:{type:'string',default:''},
        content:{type:'string',default:''},
    }
};

//幻灯片
const SlideSchema = {
    name:'Slide',
    primaryKey:'id',
    properties:{
        id:'int',
        title:{type:'string',default:''},
        pic:{type:'string',default:''},
        url:{type:'string',default:''},
        content:{type:'string',default:''},
    }
};

//资讯表
const NewsSchema = {
    name:'News',
    primaryKey:'id',
    properties:{
        id:'int',//文章ID
        cid:{type:'int',default:0},//分类ID
        title:{type:'string',default:''},//标题
        intro:{type:'string',default:''},//简介
        pic:{type:'string',default:''},//缩略图
        author:{type:'string',default:''},//作者
        flags:{type:'string',default:''},//属性：推荐、头条、热门
        views:{type:'int',default:0},//浏览量
        comments:{type:'int',default:0},//评论数
    }
};

//会员表
const UserSchema = {
    name: 'User',
    primaryKey:'id',
    properties: {
        id: 'int',
        name: {type:'string',default:''},//姓名
        mobile: 'string',//手机
        type: {type:'int',default:0},//会员类别：0普通会员、1公益组织
        flag: {type:'int',default:0},//是否推荐
        sex: {type:'string',default:''},//性别
        avatar: {type:'string',default:''},//头像
        nickname: {type:'string',default:''},//昵称
        username:{type:'string',default:''},//用户名
        email:{type:'string',default:''},//邮箱
        province:{type:'string',default:''},//省份
        city:{type:'string',default:''},//城市
        area:{type:'string',default:''},//地区
        company:{type:'string',default:''},//公司
        address:{type:'string',default:''},//地址
        renzheng:{type:'string',default:''},//是否认证
        weixin:{type:'string',default:''},//微信
        intro:{type:'string',default:''},//简介
        visible:{type:'bool',default:true},//对当前登录者是否可见
    }
};

//不看的会员列表
const HiddenUserSchema = {
    name:"HiddenUser",
    primaryKey:'id',
    properties:{
        id:'int'
    }
};

//加入的组织
const JoinCompanySchema = {
    name:"JoinCompany",
    primaryKey:'id',
    properties:{
        id:'int'
    }
};

//关注的会员
const FollowUserSchema = {
    name:"FollowUser",
    primaryKey:'id',
    properties:{
        id:'int'
    }
};

//动态表
const DongtaiSchema = {
    name:"Dongtai",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//发布者ID
        pinglun:{type:'int',default:0},//评论数
        zan:{type:'int',default:0},//点赞数
        share:{type:'int',default:0},//分享数
        jingxuan:{type:'int',default:0},//是否精选
        title:{type:'string',default:''},//标题
        content:{type:'string',default:''},//内容
        pics:{type:'string',default:''},//图片
        dateline:{type:'double',default:0},//发布时间戳
        pinglunlist:{type:'string',default:''},//最新三条评论
        name:{type:'string',default:''},//评论者名称
        avatar:{type:'string',default:''},//评论者头像
        guanzhu:{type:'int',default:0},//是否为关注者发布的，0表示否，1表示是
    }
};

//评论表
const PinglunSchema = {
    name:"Pinglun",
    primaryKey:'id',
    properties:{
        id:'int',
        touserid:{type:'int',default:0},
        fromuserid:{type:'int',default:0},
        type:{type:'int',default:0},//类型
        zan:{type:'int',default:0},//评论数
        contentid:{type:'int',default:0},//对应的内容ID
        content:{type:'string',default:''},//内容
        dateline:{type:'double',default:0},//发布时间戳
        name:{type:'string',default:''},//评论者名称
        avatar:{type:'string',default:''},//评论者头像
    }
};

//点赞表，用来存放某个动态的点赞列表
const ZanSchema = {
    name:"Zan",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//点赞的人
        contentid:{type:'int',default:0},//点赞的内容ID
        name:{type:'string',default:''},//点赞者名称
        avatar:{type:'string',default:''},//点赞者头像
    }
};
//当前登录者已经点赞的动态列表，用来判断动态是否被点赞
const ZanDongtaiSchema = {
    name:"ZanDongtai",
    primaryKey:'id',
    properties:{
        id:'int'
    }
};

//收藏表：当前登录者收藏的内容
const CangSchema = {
    name:"Cang",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},
        contentid:{type:'int',default:0},
        type:{type:'int',default:0},
    }
};

export default {
    schema: [GlobalSchema,NoticeSchema,SlideSchema,UserSchema,NewsSchema,
        HiddenUserSchema,JoinCompanySchema,FollowUserSchema,
        DongtaiSchema,PinglunSchema,ZanSchema,CangSchema,ZanDongtaiSchema],
    schemaVersion: 6,
    migration: () => {}
};