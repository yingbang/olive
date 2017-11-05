/**
 * 公益圈：热门、关注
 */
import React from 'react';
import {Text} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//热门、关注的Screen
import Hot from './Hot';
import Guanzhu from './Guanzhu';
//个人主页
import PersonalHome from './PersonalHome';

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
        swipeEnabled: false,//是否在左右滑动时切换tab
        mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        tabBarOptions: {
            style: {
                backgroundColor: '#ffffff',
                borderBottomColor: '#f8f8f8',
                borderBottomWidth: 1,
            },
            labelStyle: {
                //fontSize: 12
            },
            tabStyle: {
                borderWidth: 0,
                padding:0,
                width:60,
                margin:0
            },
            indicatorStyle: {
                height: 2,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
                backgroundColor:'#00bfff'
            },
            inactiveTintColor: '#333333',//未选中的颜色
            activeTintColor: '#00BFFF',//选中的颜色
        },
    }
);
const HomeNavigator = StackNavigator(
    {
        HomeTab: {screen: HomeTab},
        PersonalHome: {screen: PersonalHome},
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