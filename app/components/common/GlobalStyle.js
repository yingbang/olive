import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');

const globalStyle = StyleSheet.create({
    //设置flex=1
    flex1:{
        flex:1
    },
    statusHeight:{
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
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
    }
});
export default globalStyle;