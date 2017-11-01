import React, {Component} from 'react';
import {
    StyleSheet,
    Platform
} from 'react-native';

const globalStyle = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        ...Platform.select({
            ios:{

            },
            android:{

            }
        })
    }
});
export default globalStyle;