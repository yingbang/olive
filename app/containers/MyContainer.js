/**
 * 容器型组件
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import MyNavigator from '../components/my/MyNavigator';

class MyContainer extends Component {
    static navigationOptions = {
        header:null
    };
    render() {
        return (
            <MyNavigator/>
        );
    }
}

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(MyContainer);