import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    FlatList,
    Platform
} from 'react-native';
import {Button} from 'native-base';
import request from 'superagent';
import ImagePicker from 'react-native-image-crop-picker';
//公共头部
import {connect} from 'react-redux';
import {imageUploadFetch, imageUploadBase64, getFullPath,formatTime} from '../common/public';
import {isBlank,isCardID} from '../common/Validate';
import { Card, List, ListItem, Header,FormInput} from 'react-native-elements';
import {getUserInfoByIdAction,updateUserInfoAction,renzhengAction,getUserInfoById} from '../../actions/userAction';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {toastShort} from '../common/ToastTool';


class Renzheng extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.scene.route.params.back()} }}
                centerComponent={{ text: '身份认证'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    constructor(props){
        super(props);
        this.state={
            userInfo:{},
            userid:0,
            type:0,//认证类型0个人，1公司，2公益组织
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
            name:"",//姓名
            company:"",//公司名称
            shenfenzheng:require('../../assets/icon/iconupload.png'),//身份证图片
            shenfenzhengUrl:"",//身份证图片
            idnumber:"",//身份证号
            zhizhao:require('../../assets/icon/iconupload.png'),//营业执照
            zuzhi:require('../../assets/icon/iconupload.png'),//组织机构代码
            zhizhaoUrl:"",//图片网址
            zuzhiUrl:"",//图片网址
            isTijiao:false,//是否提交
        };
    }

    //返回判断
    _back(){
        getUserInfoById(this.state.userid);
        this.updateUserInfo();
        this.setState({
            isTijiao:false,
        });
        this.props.navigation.goBack();
    }

    componentDidMount(){
        try{
            //个人信息
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let userInfo = realmObj.objects("User").filtered("id="+userid);
            if(userInfo.length > 0){
                let user = userInfo[0];
                this.setState({
                    userid:userid,
                    userInfo:user,
                });
            }
        }catch(e){
            console.log(e);
        }finally {}
        this.props.navigation.setParams({back:()=>{this._back()}});
    }
    //回调
    updateUserInfo(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let userInfo = realmObj.objects("User").filtered("id="+userid);
        if(userInfo.length > 0){
            let user = userInfo[0];
            this.setState({
                userid:userid,
                userInfo:user,
            });
        }
    }
    //选择图片
    openPicker(type){
        ImagePicker.openPicker({
            //width: 300,
            //height: 300,
            cropping: true,
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

            if(type === 1){
                this.setState({
                    zhizhao:source,
                    //zhizhaoUrl:file
                });
            }else if(type === 2){
                this.setState({
                    zuzhi:source,
                    //zuzhiUrl:file
                });
            }else{
                this.setState({
                    shenfenzheng:source,
                    //shenfenzhengUrl:file
                });
            }
            //上传图片
            this.uploadImage(file,type);

        }).catch(e => {
            toastShort("未选择图片");
        });
    }
    //上传图片
    uploadImage(path,type){
        //上传图片
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let types = ['shenfenzhengUrl','zhizhaoUrl','zuzhiUrl'];
        imageUploadFetch(host + "/api/tool/uploadByFetch?userid=" + userid,'file',{path:path}).then((result)=>{
            if(result.url){
                if(type === 1){
                    this.setState({
                        zhizhaoUrl:result.url
                    });
                }else if(type === 2){
                    this.setState({
                        zuzhiUrl:result.url
                    });
                }else{
                    this.setState({
                        shenfenzhengUrl:result.url
                    });
                }
            }
        }).catch((err)=>{});
    }
    //个人认证
    geren(){
        let name = this.state.name;
        let idnumber = this.state.idnumber;
        let shenfenzheng = this.state.shenfenzhengUrl;
        //alert(name+","+idnumber+","+shenfenzheng)
        if(isBlank(name) || isBlank(idnumber) || isBlank(shenfenzheng)){
            toastShort("请填写完整认证信息！");
            return;
        }
        let checkId = isCardID(idnumber);
        if(checkId !== true){
            toastShort(checkId);
            return false;
        }
        //上传认证信息
        let content = "type=0&nickname="+name+"&shenfenzheng="+shenfenzheng+"&idnumber="+idnumber;
        this.props.dispatch(renzhengAction(content,(result)=>{this.renzhengComplete(result)}))
    }
    //公司认证
    gongsi(){
        let company = this.state.company;
        let zhizhao = this.state.zhizhaoUrl;
        let zuzhi = this.state.zuzhiUrl;
        //alert(name+","+idnumber+","+shenfenzheng)
        if(isBlank(company) || isBlank(zhizhao)){
            toastShort("请填写完整认证信息！");
            return;
        }
        //上传认证信息
        let content = "type=1&company="+company+"&zhizhao="+zhizhao+"&zuzhi="+zuzhi;
        this.props.dispatch(renzhengAction(content,(result)=>{this.renzhengComplete(result)}))
    }
    //公益组织认证
    zuzhi(){
        let company = this.state.company;
        let zhizhao = this.state.zhizhaoUrl;
        //alert(name+","+idnumber+","+shenfenzheng)
        if(isBlank(company) || isBlank(zhizhao)){
            toastShort("请填写完整认证信息！");
            return;
        }
        //上传认证信息
        let content = "type=2&company="+company+"&zhizhao="+zhizhao;
        this.props.dispatch(renzhengAction(content,(result)=>{this.renzhengComplete(result)}))
    }
    //认证完成
    renzhengComplete(result){
        if(result.state === 'ok'){
            toastShort("认证提交成功，请等待审核！");
            this.setState({isTijiao:true});
        }else{
            toastShort("提交失败，请重试！");
        }
    }
    //开始认证
    beginRenzheng() {
        //判断认证类型
        let type = this.state.type;
        if(type === 0){
            this.geren();
        }else if(type === 1){
            this.gongsi();
        }else{
            this.zuzhi();
        }
    }
    render(){
        //提交完成
        if(this.state.isTijiao === true){
            return (
                <View style={{backgroundColor:'#ffffff',flex:1,alignItems:'center'}}>
                    <Text style={{marginTop:50}}>提交成功，请耐心等待审核！</Text>
                </View>
            );
        }
        //如果已经认证
        if(this.state.userInfo['renzheng'] !== '0'){
            let typeText = ['个人','公司','公益组织'];
            let statusText = ['未审核','审核通过','审核失败'];
            let type = this.state.userInfo['renzhengleixing'] !== "" ? parseInt(this.state.userInfo['renzhengleixing']) : 0;
            let status = this.state.userInfo['renzhengzhuangtai'] !== "" ? parseInt(this.state.userInfo['renzhengzhuangtai']) : 0;
            return (
                <View style={{backgroundColor:'#ffffff',flex:1}}>
                    <ListItem
                        title={"认证类型"}
                        rightTitle={typeText[type]}
                        hideChevron={true}
                        containerStyle={[globalStyle.listItem,{marginTop:0}]}
                    />
                    <ListItem
                        title={type === 0 ? "真实姓名" : "机构名称"}
                        rightTitle={type === 0 ? this.state.userInfo['nickname']+"" : this.state.userInfo['company']+""}
                        hideChevron={true}
                        containerStyle={[globalStyle.listItem,{marginTop:0}]}
                    />
                    {
                        type === 0 ? <ListItem
                            title={"身份证号"}
                            rightTitle={this.state.userInfo['idnumber']}
                            hideChevron={true}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        /> : null
                    }
                    <ListItem
                        title={"认证状态"}
                        rightTitle={statusText[status]}
                        hideChevron={true}
                        containerStyle={[globalStyle.listItem,{marginTop:0}]}
                    />
                    <ListItem
                        title={"认证时间"}
                        rightTitle={formatTime(this.state.userInfo['renzhengshijian'])}
                        hideChevron={true}
                        containerStyle={[globalStyle.listItem,{marginTop:0}]}
                    />
                </View>
            );
        }
        return (
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.block}>
                    <Text style={styles.blockLeft}>认证类型：</Text>
                    <Text onPress={()=>{this.setState({type:0})}} style={[styles.radioBtn,(this.state.type === 0) ? styles.checkedBtn : {}]}>个人</Text>
                    <Text onPress={()=>{this.setState({type:1})}} style={[styles.radioBtn,(this.state.type === 1) ? styles.checkedBtn : {}]}>公司</Text>
                    <Text onPress={()=>{this.setState({type:2})}} style={[styles.radioBtn,(this.state.type === 2) ? styles.checkedBtn : {}]}>公益组织</Text>
                </View>
                {
                    this.state.type === 0 ?
                        <View>
                            <View style={styles.block}>
                                <Text style={styles.blockLeft}>真实姓名：</Text>
                                <FormInput containerStyle={styles.input} defaultValue={this.state.name} onChangeText={(text)=>{this.setState({name:text});}}/>
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.blockLeft}>身份证号：</Text>
                                <FormInput containerStyle={styles.input} defaultValue={this.state.idnumber} onChangeText={(text)=>{this.setState({idnumber:text});}}/>
                            </View>
                            <View style={styles.block}>
                                <View style={styles.uploadView}>
                                    <Text>身份证照片</Text>
                                    <TouchableWithoutFeedback onPress={()=>{this.openPicker(0)}}>
                                        <View style={styles.upload}>
                                            <Image style={styles.image} source={this.state.shenfenzheng}/>
                                            <Text>点击上传</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        : null
                }
                {
                    this.state.type === 1 ?
                        <View>
                            <View style={styles.block}>
                                <Text style={styles.blockLeft}>公司名称：</Text>
                                <FormInput containerStyle={styles.input} defaultValue={this.state.company} onChangeText={(text)=>{this.setState({company:text});}}/>
                            </View>
                            <View style={styles.block}>
                                <View style={styles.uploadView}>
                                    <Text>营业执照</Text>
                                    <TouchableWithoutFeedback onPress={()=>{this.openPicker(1)}}>
                                    <View style={styles.upload}>
                                        <Image style={styles.image} source={this.state.zhizhao}/>
                                        <Text>点击上传</Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.uploadView}>
                                    <Text>组织机构代码证</Text>
                                    <TouchableWithoutFeedback onPress={()=>{this.openPicker(2)}}>
                                    <View style={styles.upload}>
                                        <Image style={styles.image} source={this.state.zuzhi}/>
                                        <Text>点击上传</Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        : null
                }
                {
                    this.state.type === 2 ?
                        <View>
                            <View style={styles.block}>
                                <Text style={styles.blockLeft}>组织机构名称：</Text>
                                <FormInput containerStyle={styles.input} defaultValue={this.state.company} onChangeText={(text)=>{this.setState({company:text});}}/>
                            </View>
                            <View style={styles.block}>
                                <View style={styles.uploadView}>
                                    <Text>组织机构证明</Text>
                                    <TouchableWithoutFeedback onPress={()=>{this.openPicker(1)}}>
                                    <View style={styles.upload}>
                                        <Image style={styles.image} source={this.state.zhizhao}/>
                                        <Text>点击上传</Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        : null
                }
                <Button block rounded success onPress={()=>{this.beginRenzheng()}} style={[colors.bgBlue,{marginLeft:30,marginRight:30,marginTop:15}]}>
                    <Text style={[colors.cWhite,{fontSize:16}]}> 提交认证 </Text>
                </Button>
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
export default connect(select)(Renzheng);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop:10
    },
    block:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
        marginTop:5,
        backgroundColor:'#ffffff',
        padding:8,
    },
    blockLeft:{

    },
    input:{

    },
    checkedBtn:{
        backgroundColor:'#555',
        color:'#ddd'
    },
    radioBtn:{
        marginRight:8,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:8,
        paddingBottom:8,
        backgroundColor:'#ddd',
        color:'#555'
    },
    image:{
        width:80,
        height:80,
        marginBottom:10
    },
    uploadView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20
    },
    upload:{
        marginTop:20,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ddd',
        paddingLeft:30,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10,
        alignItems:'center'
    },
});