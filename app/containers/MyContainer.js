/**
 * 容器型组件
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import MyIndex from '../components/my/Index';

class MyContainer extends Component {
    static navigationOptions = {
        header:null
    };
    render() {
        return (
            <MyIndex {...this.props}/>
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