/**
 * 发现好友：访问通讯录，第二步，邀请好友
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

export default class FindFriendStepTwo extends Component {

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
    }
    //邀请某一个，发送短信，一次支持发送200条短信，type=1表示全部邀请
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
            leftIcon={item.thumbnailPath ? <Image style={styles.avatar} source={(Platform.OS === 'ios') ? {uri:item.thumbnailPath} : require('../../assets/icon/iconhead.png')}/>: <Image style={[styles.avatar,{tintColor:'#dddddd'}]} source={require('../../assets/icon/iconhead.png')} />}
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
                <View style={{backgroundColor:'#ffffff',paddingBottom:20}}>
                    <Button block rounded success style={[styles.buttonMargin,colors.bgBlue,{marginTop:15}]} onPress={()=>{this.yaoqingAll()}}>
                        <Text style={[colors.cWhite,fonts.font18]}> 全部邀请 </Text>
                    </Button>
                    <Text style={styles.skip} onPress={()=>{this.skipStep()}}>进入橄榄枝 ></Text>
                </View>
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