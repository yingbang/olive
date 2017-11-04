/**
 * 首页：关注
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
import HeaderWithSearch from '../common/HeaderWithSearch';

export default class Guanzhu extends Component{

    static navigationOptions = {
        header:<HeaderWithSearch/>
    };

    render(){
        return (
            <View style={styles.container}>
                <Text>关注</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8
    },
});