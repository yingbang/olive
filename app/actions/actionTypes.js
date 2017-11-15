/**
 * 进行定义请求Action类型
 */
'use strict';

//登录：手机登录、第三方登录
export const loginMobileAction = 'loginMobileAction';
export const loginSuccessAction = 'loginSuccessAction';
export const loginFailAction = 'loginFailAction';
export const logoutAction = 'logoutAction';
//注册：手机号注册
export const registerMobileAction = 'registerMobileAction';
//忘记密码、手机找回密码
export const findPasswordAction = 'findPasswordAction';

//新闻资讯
export const getNewsListAction = 'getNewsListAction';
export const receiveNewsListAction = 'receiveNewsListAction';
export const getMoreNewsListAction = 'getMoreNewsListAction';
export const noMoreNewsListAction = 'noMoreNewsListAction';
export const errorNewsListAction = 'errorNewsListAction';

//工具：幻灯片、公告等
export const getSlideAction = 'getSlideAction';
export const receiveSlideAction = 'receiveSlideAction';
export const errorSlideAction = 'errorSlideAction';
export const getNoticeAction = 'getNoticeAction';
export const receiveNoticeAction = 'receiveNoticeAction';
export const errorNoticeAction = 'errorNoticeAction';

//会员
export const getUserListAction = 'getUserListAction';
export const receiveUserListAction = 'receiveUserListAction';
export const errorUserListAction = 'errorUserListAction';
export const getUserInfoAction = 'getUserInfoAction';
export const receiveUserInfoAction = 'receiveUserInfoAction';
export const errorUserInfoAction = 'errorUserInfoAction';
//加入的公益组织、关注的会员
export const getJoinCompanyListAction = 'getJoinCompanyListAction';
export const receiveJoinCompanyListAction = 'receiveJoinCompanyListAction';
export const errorJoinCompanyListAction = 'errorJoinCompanyListAction';
export const getFollowUserListAction = 'getFollowUserListAction';
export const receiveFollowUserListAction = 'receiveFollowUserListAction';
export const errorFollowUserListAction = 'errorFollowUserListAction';