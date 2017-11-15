/**
 * 项目根组件，判断登录状态，如果没有登录，显示登录页面，否则进入主页
 *
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import Tabs from './Tabs';
import SignNavigator from './components/signInUp/SignNavigator';
import {connect} from 'react-redux';

class Root extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:0
        };
    }

    componentWillMount(){
        //判断数据库是否有会员信息，如果有的话，说明是登录状态
        let user = realmObj.objects("Global").filtered("key == 'currentUserId'");
        if(user && user[0]){
            this.setState({
                isLogin:1
            });
        }
    }

    render() {
        return (
            (this.state.isLogin === 1 || this.props.loginReducer.isLogin === true) ? <Tabs/> : <SignNavigator/>
        );
    }
}

//和store绑定，这样就可以获取reducer中的登录状态了
function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(Root);