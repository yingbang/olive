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
import {connect} from 'react-redux';
import {registerMobileAction, loginMobileAction} from '../actions/loginAction';
//手机号登录页面
import LoginMobile from '../components/signInUp/LoginMobile';
//手机号注册页面
import RegisterMobile from '../components/signInUp/RegisterMobile';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //this.props.dispatch(performLoginAction());
    }
    //手机号注册
    register(){
        this.props.dispatch(registerMobileAction());
    }
    //手机号登录
    login(){
        this.props.dispatch(loginMobileAction());
    }
    render() {
        const {loginReducer} = this.props;
        //手机号注册
        if (loginReducer.msg === 'register_mobile') {
            return (
                <RegisterMobile/>
            );
        }
        //手机号登录
        if (loginReducer.msg === 'login_mobile') {
            return (
                <LoginMobile/>
            )
        }
        //默认展示页面：第三方登录
        return (
            <LoginScreen {...this.props} register={()=>{this.register()}} login={()=>{this.login()}}/>
        );
        //忘记密码、手机找回密码
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