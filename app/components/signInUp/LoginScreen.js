import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Item,
    Input,
    Label,
} from 'native-base';
import request from 'superagent';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import {toastShort} from "../common/ToastTool";
import {isMobile,isBlank} from "../common/Validate";
import UShare from '../common/UShare';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            mobile:"",
            password:""
        }
    }

    beginLogin(){
        //验证信息
        let mobile = this.state.mobile;
        let password = this.state.password;
        let checkMobile = isMobile(mobile);
        if(checkMobile.msg){
            toastShort(checkMobile.msg);
            return false;
        }
        if(isBlank(password)){
            toastShort("请输入密码");
            return false;
        }
        //开始登录
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let _that = this;
        request('GET',host + '/api/user/login?mobile=' + mobile + '&password=' + password)
            .set('accept','json')
            .end(function (err, res) {
                if(err){
                    toastShort("网络错误！")
                }else{
                    if(res.body.state === 'fail'){
                        let code = res.body.code;
                        if(code === -1 || code === -2){
                            toastShort("登录失败：用户名或密码错误！");
                        }else{
                            toastShort("登录失败！")
                        }
                    }else if(res.body.state === 'ok'){
                        toastShort("登录成功！");
                        _that.props.loginSuccess(mobile);
                    }
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
                        <Item floatingLabel style={styles.buttonMargin}>
                            <Label style={{top:15}}>请输入密码</Label>
                            <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text});}}/>
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
                                <TouchableWithoutFeedback onPress={()=>{UShare.login((info)=>{alert(info)},(err)=>{alert(err)})}}>
                                    <FontIcon name="weixin" style={[fonts.font30,colors.cGreen]}/>
                                </TouchableWithoutFeedback>
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