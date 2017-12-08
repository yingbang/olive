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
import {toastShort} from "../common/ToastTool";
import {isMobile,isBlank} from "../common/Validate";
import TimerText from '../common/TimerText';

export default class RegisterMobile extends Component {

    constructor(props) {
        super(props);
        this.state={
            mobile:"",
            password:"",
            code:"",
        };
    }

    static navigationOptions = {
        headerTitle:'注册账号'
    };

    //获取短信验证码
    getCode(callback) {
        //验证信息
        let mobile = this.state.mobile;
        let checkMobile = isMobile(mobile);
        if(checkMobile.msg){
            toastShort(checkMobile.msg);
            return false;
        }
        //执行回调
        callback && callback(true);
        //发送
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let _that = this;
        request('GET',host + '/api/user/sendCode?mobile=' + mobile + '&type=0')
            .set('accept','json')
            .end(function (err, res) {
                if(res.body.state === 'fail'){
                    //执行回调
                    callback && callback(false);
                    toastShort("短信发送失败！");
                }else if(res.body.state === 'ok'){
                    toastShort("短信发送成功！");
                }
            });
    }

    //开始注册
    beginReg(){
        //验证信息
        let mobile = this.state.mobile;
        let password = this.state.password;
        let code = this.state.code;
        let checkMobile = isMobile(mobile);
        if(checkMobile.msg){
            toastShort(checkMobile.msg);
            return false;
        }
        if(isBlank(code)){
            toastShort("请输入短信验证码");
            return false;
        }
        if(isBlank(password)){
            toastShort("请输入密码");
            return false;
        }
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let _that = this;
        request('GET',host + '/api/user?mobile=' + mobile + '&password=' + password + '&code=' + code)
            .set('accept','json')
            .end(function (err, res) {
                if(res.body.state === 'fail'){
                    let code = res.body.code;
                    if(code === -1){
                        toastShort("注册失败，用户名已存在！");
                    }else if(code === -2){
                        toastShort("注册失败，验证码已过期！");
                    }else if(code === -3){
                        toastShort("注册失败，验证码错误！");
                    }else{
                        toastShort("注册失败！")
                    }
                }else if(res.body.state === 'ok'){
                    toastShort("注册成功！");
                    _that.props.navigation.goBack();
                }
            });
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
                            <Label style={{top:15}}>请输入手机号</Label>
                            <Input onChangeText={(text)=>{this.setState({mobile:text});}}/>
                        </Item>
                        <View>
                            <Item floatingLabel style={styles.buttonMargin}>
                                <Label style={{top:15}}>请输入短信验证码</Label>
                                <Input onChangeText={(text)=>{this.setState({code:text});}}/>
                            </Item>
                            <Button style={[colors.bgBlue,{position:'absolute',height:30,right:50,bottom:20,paddingLeft:8,paddingRight:8}]}>
                                <TimerText enable={this.state.mobile.length}
                                             style={colors.cWhite}
                                             textStyle={{color:'#fff'}}
                                             timerCount={70}
                                             onClick={(shouldStartCountting)=>{
                                                 this.getCode(shouldStartCountting)
                                             }}/>
                            </Button>
                        </View>
                        <Item floatingLabel style={styles.buttonMargin}>
                            <Label style={{top:15}}>请输入密码</Label>
                            <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text});}}/>
                        </Item>
                        <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]} onPress={()=>{this.beginReg()}}>
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