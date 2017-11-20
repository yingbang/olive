/**
 * 没有公益活动
 *
 */
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';

export default class BlankGongYi extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',alignItems:'center'}}>
                <Image source={require('../../assets/icon/iconnocontent.png')} style={{width:70,height:70,marginBottom:15,marginTop:20}}/>
                <Text>还未参加公益活动哦</Text>
            </View>
        );
    }
}