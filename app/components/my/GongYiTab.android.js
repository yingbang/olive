/**
 * 我的公益活动：全部、即将开始
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//Screen
import All from './gongyi/All';
import Willcome from './gongyi/Willcome';

const {width} = Dimensions.get('window');

const GongYiTab = TabNavigator(
    {
        All: {
            screen: All,
            navigationOptions: {
                tabBarLabel: '全部',
            }
        },
        Willcome: {
            screen: Willcome,
            navigationOptions: {
                tabBarLabel: '即将进行',
            }
        },
    }, {
        tabBarPosition: 'top',
        initialRouteName: 'All',//默认显示的tab页
        animationEnabled: false,//切换时是否有动画效果
        swipeEnabled: true,//是否在左右滑动时切换tab
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
                flex:1,
            },
            indicatorStyle: {
                height: 2,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
                backgroundColor:'#00bfff',
            },
            inactiveTintColor: '#333333',//未选中的颜色
            activeTintColor: '#00BFFF',//选中的颜色
        },
    }
);

export default GongYiTab;