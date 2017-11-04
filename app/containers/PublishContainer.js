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
import PublishIndex from '../components/publish/Index';

class PublishContainer extends Component {

    static navigationOptions = {
        header:null
    };

    render() {
        return (
            <PublishIndex {...this.props}/>
        );
    }
}

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(PublishContainer);