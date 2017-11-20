/**
 * 我的公益：全部
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
import BlankGongYi from '../../common/BlankGongYi';

export default class All extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <BlankGongYi/>
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