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
        dateline:{type:'double',default:0},//发布时间戳
        type:{type:'int',default:0},//0表示正常公告，1表示小助手，2表示小喇叭
        hasread:{type:'int',default:0},//0表示未读，1表示已读
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
        dateline:{type:'double',default:0},//发布时间
    }
};
const NewsDataSchema = {
    name:'NewsData',
    primaryKey:'id',
    properties:{
        id:'int',//文章ID
        title:{type:'string',default:''},//标题
        content:{type:'string',default:''},//简介
        shoucang:{type:'int',default:0},//是否收藏
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
        job:{type:'string',default:''},//职务
        address:{type:'string',default:''},//地址
        renzheng:{type:'string',default:''},//是否认证
        renzhengleixing:{type:'int',default:0},//认证类型：0个人、1公司、2公益组织
        renzhengshijian:{type:'double',default:0},//认证时间
        renzhengzhuangtai:{type:'int',default:0},//认证状态：0待审核、1审核通过、2审核失败
        shenfenzheng:{type:'string',default:''},//身份证照片
        idnumber:{type:'string',default:''},//身份证号
        zhizhao:{type:'string',default:''},//营业执照：公司和公益组织
        zuzhi:{type:'string',default:''},//组织机构代码证
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
        id:'int',
        name:{type:'string',default:''},//姓名
        avatar:{type:'string',default:''},//头像
        intro:{type:'string',default:''},//简介
    }
};

//关注的会员
const FollowUserSchema = {
    name:"FollowUser",
    primaryKey:'id',
    properties:{
        id:'int',
        name:{type:'string',default:''},//姓名
        avatar:{type:'string',default:''},//头像
        sex:{type:'string',default:''},//性别
        intro:{type:'string',default:''},//简介
    }
};

//我的粉丝：关注我的人
const FensiSchema = {
    name:"Fensi",
    primaryKey:'id',
    properties:{
        id:'int',
        name:{type:'string',default:''},//姓名
        avatar:{type:'string',default:''},//头像
    }
};

//动态表
const DongtaiSchema = {
    name:"Dongtai",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//发布者ID
        quanzi:{type:'int',default:0},//圈子ID，默认为0
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
        zan:{type:'int',default:0},//评论点赞数
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

//活动表
const HuodongSchema = {
    name:"Huodong",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//发布者会员ID
        name:{type:'string',default:''},//发布者名称
        avatar:{type:'string',default:''},//发布者头像
        title:{type:'string',default:''},//标题
        intro:{type:'string',default:''},//简介
        content:{type:'string',default:''},//内容
        pic:{type:'string',default:''},//图片
        dateline:{type:'double',default:0},//发布时间戳
        starttime:{type:'double',default:0},//开始时间
        endtime:{type:'double',default:0},//结束时间
        jiezhitime:{type:'double',default:0},//报名截止日期
        city:{type:'string',default:''},//定位城市
        address:{type:'string',default:''},//地址
        quanzi:{type:'int',default:0},//圈子ID
        number:{type:'int',default:0},//报名人数
        status:{type:'int',default:0},//是否结束
        orderby:{type:'int',default:0},//排序
        zhubanfang:{type:'string',default:''},//主办方
        zan:{type:'int',default:0},//点赞数
        pinglun:{type:'int',default:0},//评论数
    }
};
//活动报名表
const HuodongBaomingSchema = {
    name:"HuodongBaoming",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//会员ID
        huodongid:{type:'int',default:0},//活动ID
        name:{type:'string',default:''},//联系人
        avatar:{type:'string',default:''},//会员头像
        mobile:{type:'string',default:''},//联系方式
        dateline:{type:'double',default:0},//报名日期
    }
};

//通讯录
const TongxunluSchema = {
    name:'Tongxunlu',
    primaryKey:'id',//对应recordId
    properties:{
        id:'string',
        givenName:{type:'string',default:''},
        familyName:{type:'string',default:''},//安卓为""
        middleName:{type:'string',default:''},//安卓为""
        mobile:{type:'string',default:''},//这个是数组，可能包含固定电话，程序只获取第一个手机号
        thumbnailPath:{type:'string',default:''},//头像
    }
};

//圈子表
const QuanziSchema = {
    name:"Quanzi",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//圈子创建者ID
        name:{type:'string',default:''},//创建者名称
        avatar:{type:'string',default:''},//创建者头像
        title:{type:'string',default:''},//圈子名称
        intro:{type:'string',default:''},//一句话简介
        content:{type:'string',default:''},//圈子公告
        pic:{type:'string',default:''},//圈子头像
        address:{type:'string',default:''},//圈子地址
        dateline:{type:'double',default:0},//创建时间
        erweima:{type:'string',default:''},//二维码
        number:{type:'int',default:0},//圈子人数
        status:{type:'int',default:0},//审核状态
        verify:{type:'int',default:0},//加入圈子是否需要审核
        hot:{type:'int',default:0},//是否为热门圈子
    }
};
//圈子成员表
const QuanziUserSchema = {
    name:"QuanziUser",
    primaryKey:'id',
    properties:{
        id:'int',
        userid:{type:'int',default:0},//会员ID
        quanzi:{type:'int',default:0},//圈子ID
        name:{type:'string',default:''},//姓名
        avatar:{type:'string',default:''},//头像
        status:{type:'int',default:''},//审核状态：0待审核、1通过、2未通过
        memo:{type:'string',default:''},//审核意见
        dateline:{type:'double',default:0},//申请日期
    }
};

export default {
    schema: [GlobalSchema,NoticeSchema,SlideSchema,UserSchema,NewsSchema,NewsDataSchema,
        HiddenUserSchema,JoinCompanySchema,FollowUserSchema,FensiSchema,
        DongtaiSchema,PinglunSchema,ZanSchema,CangSchema,ZanDongtaiSchema,HuodongSchema,
        TongxunluSchema,HuodongBaomingSchema,QuanziSchema,QuanziUserSchema],
    schemaVersion: 6,
    migration: () => {}
};