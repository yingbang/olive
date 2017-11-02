import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar
} from 'react-native';
import {
    Container,
    Content,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={globalStyle.containerWithoutStatusBar}>
                <StatusBar hidden={true}/>
                <Content style={globalStyle.content}>
                    <ImageBackground style={globalStyle.wholeBackground} source={require('../../assets/images/login_bg.png')}>
                        <View style={styles.logoView}>
                            <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
                        </View>
                        <Button block rounded success style={styles.buttonMargin}>
                            <Icon name="weixin" style={[colors.cWhite, fonts.font14]}/>
                            <Text style={[colors.cWhite]}> 微信登录 </Text>
                        </Button>
                        <Button block rounded style={[styles.buttonMargin,styles.buttonWei]}>
                            <Icon name="weibo" style={[colors.cWhite, fonts.font16]}/>
                            <Text style={[colors.cWhite, fonts.font16,styles.fenge]}>|</Text>
                            <Icon name='qq' style={[colors.cWhite, fonts.font16]}/>
                        </Button>
                        <View style={styles.bottomBox}>
                            <View style={[styles.textView, styles.buttonMargin]}>
                                <Text onPress={this.props.login}>手机号登录</Text>
                                <Text onPress={this.props.register}>手机号注册</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    logo:{
        width:180,
        height:180,
    },
    logoView:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    fenge:{
        marginLeft:60,
        marginRight:60,
    },
    buttonMargin:{
        marginLeft:50,
        marginRight:50,
        marginBottom:20,
    },
    buttonWei:{
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    bottomBox:{
        flex:1
    },
    textView:{
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:15
    }
});