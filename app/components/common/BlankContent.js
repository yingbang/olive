/**
 * 没有内容
 *
 */
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';

export default class BlankContent extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',alignItems:'center'}}>
                <Image source={require('../../assets/icon/iconloading.png')} style={{width:70,height:70,marginBottom:15,marginTop:20}}/>
                <Text>拼命加载中...</Text>
            </View>
        );
    }
}