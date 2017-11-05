/**
 * 列表项之间的分割线
 *
 */
import React,{Component} from 'react';
import {View} from 'react-native';

export default class FenGeXian extends Component {
    render(){
        return (
            <View style={{borderColor:'#f8f8f8',borderBottomWidth:1,marginBottom:8,marginTop:8}}></View>
        );
    }
}