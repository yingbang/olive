/**
 * 找回密码页面
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
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';

export default class FindPassword extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle:'找回密码'
    };

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
                                <Text style={colors.cWhite}>获取验证码</Text>
                            </Button>
                        </View>
                        <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]}>
                            <Text style={[colors.cWhite,fonts.font18]}> 下一步 </Text>
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