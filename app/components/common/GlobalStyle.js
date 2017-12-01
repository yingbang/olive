import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');

const globalStyle = StyleSheet.create({
    //屏幕宽高
    width:width,
    height:height,
    //设置flex=1
    flex1:{
        flex:1
    },
    //公益圈标题样式
    homeTitle:{
        fontSize:16
    },
    //动态文字样式
    homeDongtaiText:{
        lineHeight:26,
        marginBottom:10
    },
    statusHeight:{
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    //安卓头部高度重新定义
    androidHeaderStyle:{
        height: (Platform.OS === 'ios') ? 70 : 50,
    },
    //显示状态栏
    container:{
        flex:1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        ...Platform.select({
            ios:{

            },
            android:{

            }
        })
    },
    //不显示状态栏
    containerWithoutStatusBar:{
        flex:1,
        paddingTop:0
    },
    //内容区
    content:{
        flex:1,
    },
    //横排显示
    flexRow:{
        flexDirection:'row'
    },
    //全屏背景图片ImageBackground
    wholeBackground:{
        width:width,
        height:height,
    },
    //List容器样式
    listContainer:{
        marginTop:0,
        marginBottom:20,
        borderTopWidth:0
    },
    //ListItem样式
    listItem:{
        borderBottomColor:'#f8f8f8',
        backgroundColor:'#ffffff'
    },
    //动态下面的点赞、分享、评论图标样式
    dongtaiIcon:{
        width:20,
        height:20,
        tintColor:'#999999',
        marginRight:20
    },
    //动态头像
    dongtaiAvatarView:{
        flexDirection:'row',
        marginBottom:12,
        alignItems:'center'
    },
    dongtaiAvatar:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10
    },
    //默认头像样式
    defaultAvatar:{
        width:70,
        height:70,
        borderRadius:35,
        alignSelf:'center',
        marginRight:10,
        borderColor:'#dddddd',
        borderWidth:1,
        tintColor:'#dddddd',
    },
    defaultAvatarImage:{
        width:70,
        height:70,
        borderRadius:35,
        alignSelf:'center',
        marginRight:10,
    },
});
export default globalStyle;