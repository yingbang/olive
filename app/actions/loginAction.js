/**
 * 用户登录Action操作
 */
'use strict';
import * as types from './actionTypes';

//手机号登录
export function loginMobileAction(){
    return dispatch => {
        //dispatch(loginMobile());
        setTimeout(
            () => {
                let result = {};
                dispatch(loginSuccess(result));
            }, 3000);
    }
}
//开始登录
export function loginMobile(){
    return {
        type: types.loginMobileAction,
        result: ""
    }
}
//登录成功
export function loginSuccess(result){
    //保存登录状态到本地数据库
    realmObj.write(()=>{
        let User = realmObj.objects('User');
        realmObj.delete(User);
        realmObj.create('User',{id:1, name:'feifei', mobile:'15834235678'});
    });
    //返回成功
    return {
        type: types.loginSuccessAction,
        result: result
    }
}
//登录失败
export function loginFail(result){
    return {
        type: types.loginFailAction,
        result: result
    }
}

//手机号注册
export function registerMobileAction() {
    return {
        type:types.registerMobileAction,
        result:'register_mobile'
    }
}

//忘记密码
export function findPasswordAction() {
    return {
        type:types.findPasswordAction,
        result:'find_password'
    }
}