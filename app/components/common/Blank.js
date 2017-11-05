/**
 * 空行
 *
 */
import React,{Component} from 'react';
import {View} from 'react-native';

export default class Blank extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#ffffff',height:10}}></View>
        );
    }
}