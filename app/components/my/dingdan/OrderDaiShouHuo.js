/**
 * 我的订单：待收货
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Button
} from 'react-native';
import BlankOrder from '../../common/BlankOrder';

export default class OrderDaiShouHuo extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <BlankOrder/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});