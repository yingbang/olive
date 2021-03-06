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
import HeaderWithSearch from '../components/common/HeaderWithSearch';

class NewsContainer extends Component {
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <HeaderWithSearch {...HeaderProps}/>
        }
    };
    render() {
        return (
            <NewsIndex {...this.props}/>
        );
    }
}

function select(state) {
    const {newsReducer} = state;
    return {
        newsReducer
    }
}
export default connect(select)(NewsContainer);