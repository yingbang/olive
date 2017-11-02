/**
 * 手机注册页面
 */
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
    Header,
    Left,
    Icon
} from 'native-base';
import request from 'superagent';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';

export default class RegisterMobile extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle:'注册账号'
    };

    //获取短信验证码
    getCode() {
        request('POST','http://rapapi.org/mockjs/25374/submit')
            .send({username:'1',password:'2'})
            .set('accept','json')
            .end(function (err, res) {
            console.log(res)
        })
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
                        <View>
                            <Item floatingLabel style={styles.buttonMargin}>
                                <Label>请输入短信验证码</Label>
                                <Input/>
                            </Item>
                            <Button style={[colors.bgBlue,{position:'absolute',height:30,right:50,bottom:20,paddingLeft:8,paddingRight:8}]}>
                                <Text style={colors.cWhite} onPress={()=>{this.getCode()}}>获取验证码</Text>
                            </Button>
                        </View>
                        <Item floatingLabel style={styles.buttonMargin}>
                            <Label>请输入密码</Label>
                            <Input/>
                        </Item>
                        <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]}>
                            <Text style={[colors.cWhite,fonts.font18]}> 注册 </Text>
                        </Button>
                        <View style={styles.bottomBox}>
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