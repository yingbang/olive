/**
 * 项目初始化页面，跳转到跟组件Root.js
 *
 */

'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './app/configureStore';
import SplashScreen from 'react-native-splash-screen';
import Root from './app/Root';
const store = configureStore();
//引入Realm数据库
import configureRealm from './app/realm/configureRealm';
configureRealm();
import {getSlideAction, getNoticeAction} from './app/actions/toolAction';

export default class rootApp extends Component {

    componentDidMount() {
        // 隐藏启动页
        SplashScreen.hide();
        //设置公共信息
        realmObj.write(()=>{
            //http://119.23.203.142:8080
            //http://192.168.1.128:8080
           realmObj.create("Global",{key:"REQUEST_HOST", value:"http://119.23.203.142:8080"},true);
           //重新加载一下，更新realm
           realmObj.objects("Global");
           //开始加载一些初始化内容
           store.dispatch(getSlideAction());
           store.dispatch(getNoticeAction());
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        )
    }
}