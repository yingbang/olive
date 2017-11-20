/**
 * 没有订单
 *
 */
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';

export default class BlankOrder extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',alignItems:'center'}}>
                <Image source={require('../../assets/icon/iconnoorder.png')} style={{width:100,height:100,marginBottom:15,marginTop:50}}/>
                <Text>还没有相关订单</Text>
            </View>
        );
    }
}