/**
 * 我的收藏：动态
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
import BlankShoucang from '../../common/BlankShoucang';

export default class DongTai extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <BlankShoucang/>
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