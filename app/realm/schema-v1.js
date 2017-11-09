/**
 * @flow
 */

'use strict';

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
        name: 'string',//姓名
        mobile: 'string',//手机
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
        weixin:{type:'string',default:''}//微信
    }
};

export default {
    schema: [UserSchema,NewsSchema],
    schemaVersion: 2,
    migration: () => {}
};