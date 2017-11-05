/**
 * 我的板块页面导航统一管理
 */
import React from 'react';
import {Text} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//所有页面
import MyIndex from './Index';
import SheZhi from './Shezhi';


const MyNavigator = StackNavigator(
    {
        MyIndex: {screen: MyIndex},
        SheZhi: {screen: SheZhi},
    },
    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
            swipeEnabled: false,
            animationEnabled: false,
        },
        //headerMode: 'float',//头部固定，页面从下往上显示
        mode:'modal',//IOS专用，从下往上显示
    });

export default MyNavigator;