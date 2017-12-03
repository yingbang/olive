/**
 * 搜索结果页
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//Screen
import User from './search/User';
import WenZhang from './search/WenZhang';
import Huodong from './search/Huodong';
import DongTai from './search/DongTai';

const {width} = Dimensions.get('window');

const SearchTab = TabNavigator(
    {
        User: {
            screen: User,
            navigationOptions: {
                tabBarLabel: '会员',
            }
        },
        DongTai: {
            screen: DongTai,
            navigationOptions: {
                tabBarLabel: '动态',
            }
        },
        WenZhang: {
            screen: WenZhang,
            navigationOptions: {
                tabBarLabel: '文章',
            }
        },
        Huodong: {
            screen: Huodong,
            navigationOptions: {
                tabBarLabel: '活动',
            }
        },
    }, {
        tabBarPosition: 'top',
        initialRouteName: 'User',//默认显示的tab页
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

export default SearchTab;