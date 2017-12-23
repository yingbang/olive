/**
 * 联系人：通讯录
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
    FlatList,
    Platform
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Item,
    Input,
    Label,
    Left,
    Icon
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import request from 'superagent';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import {List,Header, ListItem} from 'react-native-elements';
import {toastShort,toastLong} from "../common/ToastTool";
import {isMobile,isBlank} from "../common/Validate";
import Contacts from 'react-native-contacts';

export default class ContactsList extends Component {

    constructor(props) {
        super(props);
        this.state={
            contacts:[],
        };
    }

    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '邀请好友'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };

    componentDidMount(){
        let contacts = realmObj.objects("Tongxunlu").slice(0, 200);
        if(contacts !== null && contacts.length > 0){
            this.setState({
                contacts:contacts
            });
        }
        this.nextStep();//获取通讯录
    }
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
                        //如果是最后一个，重新获取
                        if(i === contacts.length - 1){
                            let newContacts = realmObj.objects("Tongxunlu").slice(0, 200);
                            if(newContacts !== null && newContacts.length > 0){
                                this.setState({
                                    contacts:newContacts
                                });
                            }
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
    //邀请某一个，发送短信，一次支持发送200条短信
    yaoqingOne(mobile,type){
        try{
            let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
            let _that = this;
            request('GET',host + '/api/user/sendYaoqing?mobile=' + mobile)
                .set('accept','json')
                .end(function (err, res) {
                    if(res.body.state === 'fail'){
                        toastShort("邀请短信发送失败！");
                    }else if(res.body.state === 'ok'){
                        toastShort("邀请成功！");
                    }
                    if(type === 1){
                        _that.skipStep();
                    }
                });
        }catch(e){}
    }
    //全部邀请：一次支持发送200条短信
    yaoqingAll(){
        let contacts = this.state.contacts;
        let mobile = "";
        contacts.map((item,i)=>{
            mobile += item['mobile'] + ',';
        });
        mobile = mobile.substring(0,mobile.length-1);
        if(mobile !== ""){
            this.yaoqingOne(mobile,1);
        }
    }

    //跳过
    skipStep(){
        realmObj.write(()=>{
            realmObj.create("Global",{key:"hasSkipFindFriend", value:"1"},true);
            //重新加载一下，更新realm
            realmObj.objects("Global");
        });
        this.props.navigation.navigate("Tab");
    }

    renderRow = ({item}) => (
        <ListItem
            roundAvatar
            key={item.id}
            title={item.givenName ? item.givenName : item.familyName}
            subtitle={item.mobile}
            rightIcon={<Text onPress={()=>{this.yaoqingOne(item['mobile'],0)}} style={styles.btn}>邀请</Text>}
            leftIcon={item.thumbnailPath ? <Image style={styles.avatar} source={(Platform.OS === 'ios') ? {uri:item.thumbnailPath} : require('../../assets/icon/iconhead.png')}/>: <Image style={globalStyle.defaultAvatar} source={require('../../assets/icon/iconhead.png')} />}
            containerStyle={[globalStyle.listItem,{marginTop:0}]}
            {...this.props}
        />
    );
    _keyExtractor = (item, index) => item.id;
    render() {
        return (
            <Container style={globalStyle.containerWithoutStatusBar}>
                <StatusBar hidden={false}/>
                <Content style={[globalStyle.content,styles.container]}>
                    <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.contacts}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                    />
                    </List>
                </Content>
                {
                    this.state.contacts.length > 0 ?
                        <View style={{backgroundColor:'#ffffff',paddingBottom:20}}>
                            <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]} onPress={()=>{this.yaoqingAll()}}>
                                <Text style={[colors.cWhite,fonts.font18]}> 全部邀请 </Text>
                            </Button>
                        </View>
                        : null
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
    },
    buttonMargin:{
        marginLeft:50,
        marginRight:50,
    },
    textView:{
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:15
    },
    skip:{
        alignSelf:'center',
        marginTop:20
    },
    btn:{
        alignSelf:'center',
        marginRight:20,
        borderWidth:1,
        borderColor:'#dddddd',
        color:'#333333',
        paddingTop:5,
        paddingBottom:3,
        paddingLeft:10,
        paddingRight:10
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:25,
        alignSelf:'center',
        marginRight:10,
        borderColor:'#dddddd',
        borderWidth:1
    }
});