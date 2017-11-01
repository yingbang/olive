import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import globalStyle from '../components/common/GlobalStyle';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Text>这里是默认登录页面</Text>
                <Text onPress={this.props.login}>手机号登录</Text>
                <Text onPress={this.props.register}>手机注册</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});