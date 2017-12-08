/**
 * 找回密码页面第二步
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
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import {toastShort} from "../common/ToastTool";
import {isMobile,isBlank} from "../common/Validate";

export default class FindPasswordNext extends Component {

    constructor(props) {
        super(props);
        this.state={
            mobile:props.navigation.state.params.mobile,
            password:"",
            repassword:"",
        };
        console.log(this.state.mobile)
    }

    static navigationOptions = {
        headerTitle:'设置新密码'
    };


    //设置新密码
    finish(){
        //手机号和验证码是否正确
        //验证信息
        let mobile = this.state.mobile;
        let password = this.state.password;
        let repassword = this.state.repassword;
        let checkMobile = isMobile(mobile);
        if(checkMobile.msg){
            toastShort(checkMobile.msg);
            return false;
        }
        if(isBlank(password)){
            toastShort("请输入新密码");
            return false;
        }
        if(isBlank(repassword)){
            toastShort("请再次输入新密码");
            return false;
        }
        if(password !== repassword){
            toastShort("两次输入的密码不一致");
            return false;
        }
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let _that = this;
        request('GET',host + '/api/user/setNewPass?mobile=' + mobile + '&password=' + password + '&repassword=' + repassword)
            .set('accept','json')
            .end(function (err, res) {
                if(res.body.state === 'fail'){
                    toastShort("保存新密码失败！")
                }else if(res.body.state === 'ok'){
                    toastShort("保存新密码成功！")
                    _that.props.navigation.navigate("LoginContainer");
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
                            <Label style={{top:15}}>请输入新密码</Label>
                            <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text});}}/>
                        </Item>
                        <Item floatingLabel style={styles.buttonMargin}>
                            <Label style={{top:15}}>请再次输入新密码</Label>
                            <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({repassword:text});}}/>
                        </Item>
                        <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]} onPress={()=>{this.finish()}}>
                            <Text style={[colors.cWhite,fonts.font18]}> 保存新密码 </Text>
                        </Button>
                        <View style={styles.bottomBox}></View>
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
    }
});