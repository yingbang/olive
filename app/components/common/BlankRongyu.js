/**
 * 没有荣誉
 *
 */
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';

export default class BlankRongyu extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',alignItems:'center'}}>
                <Image source={require('../../assets/icon/iconnocontent.png')} style={{width:70,height:70,marginBottom:15,marginTop:20}}/>
                <Text>还未获得荣誉勋章哦</Text>
            </View>
        );
    }
}