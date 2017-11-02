/**
 * 登录注册页面容器
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {StackNavigator} from 'react-navigation';
//登录页面
import LoginContainer from '../../containers/LoginContainer';
//注册页面
import RegisterMobile from './RegisterMobile';
//找回密码页面
import FindPassword from './FindPassword';


/**
 * 设置页面导航
 */
const SignNavigator = StackNavigator(
    {
        LoginContainer: {screen: LoginContainer},
        RegisterMobile: {screen: RegisterMobile},
        FindPassword: {screen: FindPassword},
    },{
        navigationOptions:{
            headerStyle:{
                height:44,
                justifyContent:'center',
                paddingTop:0
            },
            headerTitleStyle:{
                fontSize:14,
            }
        }
    });

export default SignNavigator;