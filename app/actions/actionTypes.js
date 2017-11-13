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

//是否显示tab栏
export const hideTabAction = 'hideTabAction';
export const showTabAction = 'showTabAction';