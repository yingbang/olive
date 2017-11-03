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
    Item,
    Input,
    Label,
} from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    beginLogin(){
        //this.props.navigation.navigate("Tab")
        //alert(this.state.login)
        this.props.loginSuccess();
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
                        <Item floatingLabel style={styles.buttonMargin}>
                            <Label>请输入手机号</Label>
                            <Input/>
                        </Item>
                        <Item floatingLabel style={styles.buttonMargin}>
                            <Label>请输入密码</Label>
                            <Input/>
                        </Item>
                        <Button block rounded success onPress={()=>{this.beginLogin()}} style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]}>
                            <Text style={[colors.cWhite,fonts.font18]}> 登录 </Text>
                        </Button>
                        <View style={styles.bottomBox}>
                            <View style={[styles.textView, styles.buttonMargin]}>
                                <Text onPress={()=>{this.props.navigation.navigate('RegisterMobile')}}>注册账号</Text>
                                <Text onPress={()=>{this.props.navigation.navigate('FindPassword')}}>忘记密码？</Text>
                            </View>
                            <View style={[styles.thirdView, styles.buttonMargin]}>
                                <View style={styles.thirdInnerView}>
                                    <Text style={styles.line}></Text>
                                    <Text style={styles.thirdText}> 第三方账号登录 </Text>
                                    <Text style={styles.line}></Text>
                                </View>
                                <FontIcon name="weixin" style={[fonts.font30,colors.cGreen]}/>
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
        width:130,
        height:130,
    },
    logoView:{
        flex:2,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    buttonMargin:{
        marginLeft:50,
        marginRight:50,
        marginBottom:10,
    },
    bottomBox:{
        flex:3
    },
    textView:{
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:15
    },
    thirdText:{
        color:'#aaa'
    },
    thirdView:{
        alignItems:'center',
        marginTop:30
    },
    thirdInnerView:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    },
    line:{
        height:1,
        backgroundColor:'#eee',
        flex:1
    }
});