/**
 * 公益圈：热门、关注
 */
import React from 'react';
import {Text} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//热门、关注的Screen
import Hot from './Hot';
import Guanzhu from './Guanzhu';

/**
 * 设置热门、关注切换
 */
const HomeTab = TabNavigator(
    {
        Hot: {
            screen: Hot,
            navigationOptions: {
                tabBarLabel: '热门',
            }
        },
        Guanzhu: {
            screen: Guanzhu,
            navigationOptions: {
                tabBarLabel: '关注',
            }
        },
    }, {
        tabBarPosition: 'top',
        initialRouteName: 'Hot',//默认显示的tab页
        animationEnabled: false,//切换时是否有动画效果
        swipeEnabled: true,//是否在左右滑动时切换tab
        mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        tabBarOptions: {
            style: {
                backgroundColor: '#ffffff',
                borderBottomColor: '#f8f8f8',
                borderBottomWidth: 1,
                borderTopWidth:0
            },
            labelStyle: {
                fontSize:14,
                height:24,
                width:60,
            },
            tabStyle: {
                justifyContent:'center',
                flex:0
            },
            inactiveTintColor: '#333333',//未选中的颜色
            activeTintColor: '#00BFFF',//选中的颜色
        },
    }
);
const HomeNavigator = StackNavigator(
    {
        HomeTab: {screen: HomeTab},
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

export default HomeNavigator;