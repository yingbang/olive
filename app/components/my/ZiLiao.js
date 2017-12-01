import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    Button,
    FlatList,
    Platform
} from 'react-native';
import request from 'superagent';
import ImagePicker from 'react-native-image-crop-picker';
//公共头部
import {connect} from 'react-redux';
import {imageUploadFetch, imageUploadBase64, getFullPath} from '../common/public';
import { Card, List, ListItem, Header} from 'react-native-elements';
import {getUserInfoByIdAction,updateUserInfoAction} from '../../actions/userAction';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {toastShort} from '../common/ToastTool';


class ZiLiao extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '个人资料'}}
                rightComponent={{icon:'qrcode',type:"font-awesome"}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    constructor(props){
        super(props);
        this.state={
            avatarSource:require('../../assets/icon/iconhead.png'),
            avatarFile:"",
            userInfo:{},
            userid:0,
            contentList:[],
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }

    componentDidMount(){
        try{
            //个人信息
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let userInfo = realmObj.objects("User").filtered("id="+userid);
            if(userInfo.length > 0){
                let user = userInfo[0];
                let statusText = ['未审核','审核通过','审核失败'];
                this.setState({
                    userid:userid,
                    userInfo:user,
                    contentList:[
                        {
                            key:1,
                            title: '姓名',
                            rTitle:user['nickname'],
                            event:'ziliao_nickname',
                        },
                        {
                            key:2,
                            title: '公司',
                            rTitle:user['company'],
                            event:'ziliao_company',
                        },
                        {
                            key:3,
                            title: '职务',
                            rTitle:user['job'],
                            event:'ziliao_job',
                        },
                        {
                            key:4,
                            title: '手机',
                            rTitle:user['mobile'],
                            isDivider:true,
                            event:'ziliao_mobile',
                        },
                        {
                            key:5,
                            title: '邮箱',
                            rTitle:user['email'],
                            event:'ziliao_email',
                        },
                        {
                            key:6,
                            title: '城市',
                            rTitle:user['province']+user['city'],
                            event:'ziliao_chengshi',
                        },
                        {
                            key:7,
                            title: '个性签名',
                            rTitle:user['intro'],
                            event:'ziliao_intro',
                        },
                        {
                            key:8,
                            title: '认证',
                            rTitle:(user['renzheng'] !== "") ? statusText[user['renzhengzhuangtai']] : "未认证",
                            event:'ziliao_renzheng',
                        },
                    ],
                    avatarSource:user['avatar'] ? {uri:getFullPath(user['avatar'],this.state.host)} : require('../../assets/icon/iconhead.png')
                });
            }
        }catch(e){
            console.log(e);
        }finally {}
    }
    //回调
    updateUserInfo(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let userInfo = realmObj.objects("User").filtered("id="+userid);
        if(userInfo.length > 0){
            let user = userInfo[0];
            let statusText = ['未审核','审核通过','审核失败'];
            this.setState({
                userid:userid,
                userInfo:user,
                contentList:[
                    {
                        key:1,
                        title: '姓名',
                        rTitle:user['nickname'],
                        event:'ziliao_nickname',
                    },
                    {
                        key:2,
                        title: '公司',
                        rTitle:user['company'],
                        event:'ziliao_company',
                    },
                    {
                        key:3,
                        title: '职务',
                        rTitle:user['job'],
                        event:'ziliao_job',
                    },
                    {
                        key:4,
                        title: '手机',
                        rTitle:user['mobile'],
                        isDivider:true,
                        event:'ziliao_mobile',
                    },
                    {
                        key:5,
                        title: '邮箱',
                        rTitle:user['email'],
                        event:'ziliao_email',
                    },
                    {
                        key:6,
                        title: '城市',
                        rTitle:user['province']+user['city'],
                        event:'ziliao_chengshi',
                    },
                    {
                        key:7,
                        title: '个性签名',
                        rTitle:user['intro'],
                        event:'ziliao_intro',
                    },
                    {
                        key:8,
                        title: '认证',
                        rTitle:(user['renzheng'] !== "") ? statusText[user['renzhengzhuangtai']] : "未认证",
                        event:'ziliao_renzheng',
                    },
                ],
                avatarSource:user['avatar'] ? {uri:getFullPath(user['avatar'],this.state.host)} : require('../../assets/icon/iconhead.png')
            });
        }
    }

    openPicker(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64:true
        }).then(images => {

            let source;
            if (Platform.OS === 'android') {
                source = {uri: images.path, isStatic: true}
            } else {
                source = {uri: images.path.replace('file://', ''), isStatic: true}
            }

            let file;
            if(Platform.OS === 'android'){
                file = images.path
            }else {
                file = images.path.replace('file://', '')
            }

            let fileData = {data:images.data,name:images.path};

            this.setState({
                avatarSource:source,
                avatarFile:file
            });

            //上传图片
            let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            imageUploadFetch(host + "/api/tool/uploadByFetch?userid=" + userid,'file',{path:file}).then((result)=>{
                if(result.url){
                    //alert(result.url)
                    this.props.dispatch(updateUserInfoAction("avatar="+result.url));
                    let _that = this;
                    setTimeout(function () {
                        _that.props.dispatch(getUserInfoByIdAction(userid),this.updateUserInfo);
                    },300);
                }
            }).catch((err)=>{});
            /*imageUploadBase64(host + "/api/tool/uploadBase64?userid="+userid,'file',fileData).then((result)=>{
                let url = result.url;
                //保存到realm
                //更新服务器数据库
            }).catch((err)=>{});*/

        }).catch(e => {
            toastShort("未选择图片");
        });
    }
    onClick(item) {
        let TargetComponent = 'ZiLiaoUpdate';//统一到这个地方处理，如果不是，下面再覆盖
        let params = {};//可能需要传递参数
        let tag = item.event;
        switch (tag) {
            case 'ziliao_nickname':
                let renzheng = this.state.userInfo['renzhengzhuangtai'];
                if(renzheng === 1){
                    toastShort("您已经完成认证，不能修改！");
                    return;
                }
                params = {target:'nickname',text:item.title,defaultValue:item.rTitle,callback:()=>{this.updateUserInfo()}};
                break;
            case 'ziliao_company':
                params = {target:'company',text:item.title,defaultValue:item.rTitle,callback:()=>{this.updateUserInfo()}};
                break;
            case 'ziliao_job':
                params = {target:'job',text:item.title,defaultValue:item.rTitle,callback:()=>{this.updateUserInfo()}};
                break;
            case 'ziliao_mobile':
                TargetComponent = "";
                toastShort("手机号不能修改");
                break;
            case 'ziliao_email':
                params = {target:'email',text:item.title,defaultValue:item.rTitle,callback:()=>{this.updateUserInfo()}};
                break;
            case 'ziliao_intro':
                params = {target:'intro',text:item.title,defaultValue:item.rTitle,multiline:true,callback:()=>{this.updateUserInfo()}};
                break;
            case 'ziliao_renzheng':
                TargetComponent = 'Renzheng';
                break;
            default:
                TargetComponent = "";
        }
        if (TargetComponent) {
            //跳转页面
            this.props.navigation.navigate(TargetComponent,params);
        }
    }
    renderRow = ({item}) => (
        <ListItem
            title={item.title}
            rightTitle={item.rTitle ? item.rTitle : null}
            onPress={()=>{this.onClick(item)}}
            rightIcon={{name: 'chevron-right'}}
            containerStyle={[globalStyle.listItem,{marginTop:item.isDivider ? 8 : 0}]}
        />
    );
    render(){
        return (
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <List containerStyle={[globalStyle.listContainer,colors.bgF8]}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.contentList}
                        extraData={this.state}
                        ListHeaderComponent={<ListItem
                            avatar={<Image style={{width:60,height:60,borderRadius:30}} source={this.state.avatarSource} />}
                            onPress={()=>{this.openPicker()}}
                            rightTitle={"修改头像"}
                            rightIcon={{name: 'chevron-right'}}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        />}
                    />
                </List>
            </ScrollView>
        );
    }
}



function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(ZiLiao);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
});