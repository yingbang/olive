/**
 * 进行定义请求Action类型
 */
'use strict';

//首页
export const HOME_ACTION = 'HOME_ACTION';

//登录：手机登录、第三方登录
export const loginMobileAction = 'loginMobileAction';
export const loginSuccessAction = 'loginSuccessAction';
export const loginFailAction = 'loginFailAction';
//注册：手机号注册
export const registerMobileAction = 'registerMobileAction';
//忘记密码、手机找回密码
export const findPasswordAction = 'findPasswordAction';

//新闻资讯
export const PERFORM_NEWSlIST_ACTION = 'PERFORM_NEWSlIST_ACTION';
export const RECEIVE_NEWSlIST_ACTION = 'RECEIVE_NEWSlIST_ACTION';
export const GET_MORE_NEWSLIST_ACTION = 'GET_MORE_NEWSLIST_ACTION';
export const REFRESH_NEWSlIST_ACTION = 'REFRESH_NEWSlIST_ACTION';
export const HAS_FINISHED_ACTION = 'HAS_FINISHED_ACTION';
export const ERROR_NEWSLIST_ACTION = 'ERROR_NEWSLIST_ACTION';

//是否显示tab栏
export const hideTabAction = 'hideTabAction';
export const showTabAction = 'showTabAction';