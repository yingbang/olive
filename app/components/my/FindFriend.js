/**
 * 发现好友：访问通讯录
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
import { NavigationActions } from 'react-navigation'
import request from 'superagent';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import {toastShort,toastLong} from "../common/ToastTool";
import {isMobile,isBlank} from "../common/Validate";
import Contacts from 'react-native-contacts';

export default class FindFriend extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header:null
    };

    //获取通讯录信息
    getContacts(){
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){

            } else {
                realmObj.write(()=>{
                    contacts.map((item,i)=>{
                        let mobile = "";
                        let len = item['phoneNumbers'].length;
                        for(let j=0;j<len;j++){
                            let number = item['phoneNumbers'][j]['number'];
                            number = number.replace(/\(/g, '');//去掉左括号(
                            number = number.replace(/\)/g, '');//去掉右括号)
                            number = number.replace(/\-/g, '');//去掉-
                            number = number.replace(/\s/g, '');//去掉空格
                            if(isMobile(number) === true){
                                mobile = number;
                                break;
                            }
                        }
                        //如果有手机号码
                        if(mobile !== ""){
                            let user = {
                                id:item['recordID'],
                                givenName:item['givenName'] !== null ? item['givenName'] : "",
                                familyName:item['familyName'] !== null ? item['familyName'] : "",
                                middleName:item['middleName'] !== null ? item['middleName'] : "",
                                thumbnailPath:item['thumbnailPath'] !== null ? item['thumbnailPath'] : "",
                                mobile:mobile
                            };
                            realmObj.create("Tongxunlu",user,true);
                        }
                        //如果是最后一个，跳转到下个界面
                        if(i === contacts.length - 1){
                            this.props.navigation.navigate("FindFriendStepTwo");
                        }
                    });
                });
            }
        })
    }
    nextStep(){
        Contacts.checkPermission( (err, permission) => {
            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            //未申请权限
            if(permission === 'undefined'){
                //请求权限
                Contacts.requestPermission( (err, permission) => {
                    if(err === 'denied'){} else {
                        this.getContacts();
                    }
                })
            }
            //已经获得权限
            if(permission === 'authorized'){
                Contacts.getAll((err, contacts) => {
                    if(err === 'denied'){} else {
                        this.getContacts();
                    }
                })
            }
            //被用户拒绝
            if(permission === 'denied'){
                toastLong("尚未授权通讯录，您可以在'设置'->'隐私'->'通讯录'中打开。");
            }
        })
    }

    //跳过
    skipStep(){
        realmObj.write(()=>{
            realmObj.create("Global",{key:"hasSkipFindFriend", value:"1"},true);
            //重新加载一下，更新realm
            realmObj.objects("Global");
        });
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Tab'})
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <Container style={globalStyle.containerWithoutStatusBar}>
                <StatusBar hidden={true}/>
                <Content style={globalStyle.content}>
                    <ImageBackground style={globalStyle.wholeBackground} source={require('../../assets/images/login_bg.png')}>
                        <View style={styles.logoView}>
                            <Image style={styles.logo} source={require('../../assets/images/findfriend.png')}/>
                            <Text style={styles.text}>邀请几个值得信赖的伙伴，多些朋友能获得更多机会，您的通讯录信息会被严格保密。</Text>
                        </View>

                        <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]} onPress={()=>{this.nextStep()}}>
                            <Text style={[colors.cWhite,fonts.font18]}> 邀请通讯录好友 </Text>
                        </Button>
                        <Text style={styles.skip} onPress={()=>{this.skipStep()}}>跳过本步骤 ></Text>
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
        tintColor:'#666'
    },
    logoView:{
        flex:3,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    buttonMargin:{
        marginLeft:50,
        marginRight:50,
        marginBottom:10,
    },
    bottomBox:{
        flex:2
    },
    textView:{
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:15
    },
    text:{
        marginLeft:40,
        marginRight:40,
        marginTop:20,
        marginBottom:40
    },
    skip:{
        alignSelf:'center',
        marginTop:30
    }
});