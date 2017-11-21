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
import HeaderWithSearch from '../components/common/HeaderWithSearch';

class HomeContainer extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <HeaderWithSearch {...HeaderProps}/>
        }
    };
    render() {
        return (
            <HomeNavigator screenProps={this.props}/>
        );
    }
}

function select(state) {
    const {tabReducer} = state;
    return {
        tabReducer
    }
}
export default connect(select)(HomeContainer);