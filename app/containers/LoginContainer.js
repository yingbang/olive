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
import LoginScreen from '../screens/LoginScreen';
import Loading from '../components/Loading';
import {connect} from 'react-redux';
import {performLoginAction} from '../actions/loginAction';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(performLoginAction());
    }
    render() {
        const {loginReducer} = this.props;
        if (loginReducer.loading) {
            return (
                <Loading />
            )
        }
        return (
            <LoginScreen {...this.props}/>
        );
    }
}

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(LoginContainer);