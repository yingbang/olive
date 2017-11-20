/**
 * 没有收藏
 *
 */
import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';

export default class BlankShoucang extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',alignItems:'center'}}>
                <Image source={require('../../assets/icon/iconnoshoucang.png')} style={{width:100,height:100,marginBottom:15,marginTop:50}}/>
                <Text>还没有收藏呢</Text>
            </View>
        );
    }
}