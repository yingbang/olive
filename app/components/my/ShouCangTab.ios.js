/**
 * 我的收藏：文章、帖子、动态
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//Screen
import WenZhang from './shoucang/WenZhang';
import TieZi from './shoucang/TieZi';
import DongTai from './shoucang/DongTai';

const {width} = Dimensions.get('window');

const ShouCangTab = TabNavigator(
    {
        WenZhang: {
            screen: WenZhang,
            navigationOptions: {
                tabBarLabel: '文章',
            }
        },
        TieZi: {
            screen: TieZi,
            navigationOptions: {
                tabBarLabel: '帖子',
            }
        },
        DongTai: {
            screen: DongTai,
            navigationOptions: {
                tabBarLabel: '动态',
            }
        },
    }, {
        tabBarPosition: 'top',
        initialRouteName: 'WenZhang',//默认显示的tab页
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
            },
            tabStyle: {
                justifyContent:'center',
            },
            inactiveTintColor: '#333333',//未选中的颜色
            activeTintColor: '#00BFFF',//选中的颜色
        },
    }
);

export default ShouCangTab;