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
    //全屏背景图片ImageBackground
    wholeBackground:{
        width:width,
        height:height,
    },
});
export default globalStyle;