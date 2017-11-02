/**
 * 项目根组件，判断登录状态，如果没有登录，显示登录页面，否则进入主页
 *
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import Tabs from './Tabs';
import SignNavigator from './components/signInUp/SignNavigator';

class Root extends Component {
    constructor(props){
        super(props);
        this.state = {
            login:0
        }
    }

    render() {
        return (
            (this.state.login === 1) ? <Tabs/> : <SignNavigator/>
        );
    }
}

export default Root;