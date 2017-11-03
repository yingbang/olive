/**
 * @flow
 */

'use strict';

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
    schema: [UserSchema],
    schemaVersion: 1,
    migration: () => {}
};