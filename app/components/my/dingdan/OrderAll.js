/**
 * 我的订单：所有
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

export default class OrderAll extends Component{
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>所有</Text>
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