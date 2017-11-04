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

export default class rootApp extends Component {
    componentDidMount() {
        // 隐藏启动页
        SplashScreen.hide();
    }
    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        )
    }
}