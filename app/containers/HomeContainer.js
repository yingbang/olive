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
import HomeNavigator from '../components/home/HomeNavigator';

class HomeContainer extends Component {
    static navigationOptions = {
        header:null
    };
    render() {
        return (
            <HomeNavigator/>
        );
    }
}

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(HomeContainer);