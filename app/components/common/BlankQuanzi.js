/**
 * 没有动态
 *
 */
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';

export default class BlankQuanzi extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',alignItems:'center'}}>
                <Image source={require('../../assets/icon/iconnocontent.png')} style={{width:70,height:70,marginBottom:15,marginTop:20}}/>
                <Text>这个圈子很安静，没有动态哟</Text>
            </View>
        );
    }
}