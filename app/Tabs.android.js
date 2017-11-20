/**
 * 底部Tab导航
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import TabBarItem from './components/TabBarItem';//tab项的封装
//需要展示在底部菜单上的Screen
import HomeContainer from './containers/HomeContainer';
import FindContainer from './containers/FindContainer';
import MyContainer from './containers/MyContainer';
import NewsContainer from './containers/NewsContainer';
import PublishContainer from './containers/PublishContainer';
//需要导入的子页面
//发布
import PublishEdit from './components/publish/PublishEdit';
//个人主页
import PersonalHome from './components/home/PersonalHome';
import DongTaiDetail from './components/home/DongTaiDetail';
import ZanList from './components/home/ZanList';
//我的
import SheZhi from './components/my/Shezhi';
import XiaoXi from './components/my/XiaoXi';
import ZiLiao from './components/my/ZiLiao';
import YiJianFanKui from './components/my/YiJianFanKui';
import GuanZhu from './components/my/GuanZhu';
import Fensi from './components/my/Fensi';
import DingDan from './components/my/DingDan';
import ShouCang from './components/my/ShouCang';
import ZuZhi from './components/my/ZuZhi';
import RongYu from './components/my/RongYu';
import GongYi from './components/my/GongYi';
//资讯
import NewsDetail from './components/news/NewsDetail';
//活动
import HuodongDetail from './components/find/HuodongDetail';
//用于显示url
import ShowUrl from './components/common/ShowUrl';
//公告
import NoticeDetail from './components/home/NoticeDetail';

/**
 * 设置底部菜单栏：一般是app的栏目
 */
const AppTab = TabNavigator(
    {
        HomeContainer: {
            screen: HomeContainer,
            navigationOptions: {
                tabBarLabel: '公益圈',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./assets/icon/iconhome.png')}
                        selectedImage={require('./assets/icon/iconhome.png')}
                    />
                )
            }
        },
        FindContainer: {
            screen: FindContainer,
            navigationOptions: {
                headerTitle:'find',
                tabBarLabel: '发现',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./assets/icon/iconfind.png')}
                        selectedImage={require('./assets/icon/iconfind.png')}
                    />
                )
            }
        },
        PublishContainer: {
            screen: PublishContainer,
            navigationOptions: {
                tabBarLabel: ({focused,tintColor})=>(
                    <Text style={{height:8}}></Text>
                ),
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./assets/icon/iconpublish.png')}
                        selectedImage={require('./assets/icon/iconpublish.png')}
                        imageViewStyle={{backgroundColor:'#00BFFF',padding:8,alignItems:'center',borderRadius:8}}
                        imageStyle={{tintColor:'#ffffff'}}
                    />
                ),
                tabBarVisible:false,//当点击进去，是否显示底部菜单
            }
        },
        NewsContainer: {
            screen: NewsContainer,
            navigationOptions: {
                tabBarLabel: '资讯',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./assets/icon/iconnews.png')}
                        selectedImage={require('./assets/icon/iconnews.png')}
                    />
                )
            }
        },
        MyContainer: {
            screen: MyContainer,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./assets/icon/iconmy.png')}
                        selectedImage={require('./assets/icon/iconmy.png')}
                    />
                )
            }
        }
    }, {
        initialRouteName: 'MyContainer',//默认显示的tab页
        tabBarPosition: 'bottom',//tab栏的位置
        lazy: true,//是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true
        animationEnabled: false,//切换时是否有动画效果
        swipeEnabled: false,//是否在左右滑动时切换tab
        mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        tabBarOptions: {
            style: {
                backgroundColor: '#ffffff',
                borderTopColor: '#f8f8f8',
                borderTopWidth: 1,
            },
            labelStyle: {
                fontSize: 12
            },
            tabStyle: {
                borderWidth: 0,
                padding:0,
            },
            iconStyle:{
                flex:1,
                width:40
            },
            indicatorStyle: {
                height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            showIcon: true,//是否显示图标
            inactiveTintColor: '#333333',//未选中的颜色
            activeTintColor: '#00BFFF',//选中的颜色
        },
    }
);

/**
 * 设置顶部导航：页面之间互相切换，比如：点击列表页，进入详情页
 */
const Navigator = StackNavigator(
    {
        Tab: {screen: AppTab},
        //发布
        PublishEdit:{screen:PublishEdit},
        //个人主页
        PersonalHome: {screen: PersonalHome},
        DongTaiDetail: {screen: DongTaiDetail},
        ZanList: {screen: ZanList},
        //我的
        SheZhi: {screen: SheZhi},
        XiaoXi: {screen: XiaoXi},
        ZiLiao: {screen: ZiLiao},
        YiJianFanKui: {screen: YiJianFanKui},
        GuanZhu: {screen: GuanZhu},
        Fensi: {screen: Fensi},
        DingDan: {screen: DingDan},
        ShouCang: {screen: ShouCang},
        ZuZhi: {screen: ZuZhi},
        RongYu: {screen: RongYu},
        GongYi: {screen: GongYi},
        //资讯
        NewsDetail: {screen: NewsDetail},
        //活动
        HuodongDetail: {screen: HuodongDetail},
        //显示网页
        ShowUrl: {screen: ShowUrl},
        //公告详情
        NoticeDetail: {screen: NoticeDetail},
    },
    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
            swipeEnabled: false,
            animationEnabled: false,
        },
        //headerMode: 'float',
    });

export default Navigator;