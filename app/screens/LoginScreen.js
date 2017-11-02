import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Header,
} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import globalStyle from '../components/common/GlobalStyle';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content padder style={globalStyle.container}>
                    <Text>这里是默认登录页面</Text>
                    <Button block small rounded info onPress={this.props.login}>
                        <Icon name="sina-weibo"/>
                        <Text> 手机号登录 </Text>
                    </Button>
                    <Button block small danger onPress={this.props.register}><Text> 手机注册 </Text></Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});