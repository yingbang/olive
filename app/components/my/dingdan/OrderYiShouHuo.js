/**
 * 我的订单：已收货
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

export default class OrderYiShouHuo extends Component{
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>已收货</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8
    },
});