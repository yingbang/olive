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
import FindIndex from '../components/find/Index';
import HeaderWithSearch from '../components/common/HeaderWithSearch';

class FindContainer extends Component {
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <HeaderWithSearch {...HeaderProps}/>
        }
    };
    render() {
        return (
            <FindIndex {...this.props}/>
        );
    }
}

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(FindContainer);