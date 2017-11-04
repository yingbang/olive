/**
 * 我的订单：全部、待付款、待发货、待收货、已收货
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
//Screen
import OrderAll from './dingdan/OrderAll';
import OrderDaiFuKuan from './dingdan/OrderDaiFuKuan';
import OrderDaiFaHuo from './dingdan/OrderDaiFaHuo';
import OrderDaiShouHuo from './dingdan/OrderDaiShouHuo';
import OrderYiShouHuo from './dingdan/OrderYiShouHuo';

const {width} = Dimensions.get('window');

const DingDanTab = TabNavigator(
    {
        OrderAll: {
            screen: OrderAll,
            navigationOptions: {
                tabBarLabel: '所有',
            }
        },
        OrderDaiFuKuan: {
            screen: OrderDaiFuKuan,
            navigationOptions: {
                tabBarLabel: '待付款',
            }
        },
        OrderDaiFaHuo: {
            screen: OrderDaiFaHuo,
            navigationOptions: {
                tabBarLabel: '待发货',
            }
        },
        OrderDaiShouHuo: {
            screen: OrderDaiShouHuo,
            navigationOptions: {
                tabBarLabel: '待收货',
            }
        },
        OrderYiShouHuo: {
            screen: OrderYiShouHuo,
            navigationOptions: {
                tabBarLabel: '已收货',
            }
        },
    }, {
        tabBarPosition: 'top',
        initialRouteName: 'OrderAll',//默认显示的tab页
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

export default DingDanTab;