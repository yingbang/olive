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
import LoginScreen from '../components/signInUp/LoginScreen';
import {connect} from 'react-redux';
//导入动作
import {registerMobileAction, loginMobileAction, findPasswordAction} from '../actions/loginAction';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header:null
    };
    render() {
        return (
            <LoginScreen {...this.props}/>
        );
    }
}

//把自己和store进行绑定，这样就可以发送action给store，然后store通过reducer发现state改变时会及时通知自己，从而改变视图内容
function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(LoginContainer);