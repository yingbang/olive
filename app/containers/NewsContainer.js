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
import NewsIndex from '../components/news/Index';

class NewsContainer extends Component {
    render() {
        return (
            <NewsIndex {...this.props}/>
        );
    }
}

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(NewsContainer);