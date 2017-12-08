/**
 * 活动详情页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
//公共头部
import HTMLView from 'react-native-htmlview';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import { Card, List, ListItem, Button,Header} from 'react-native-elements';
import {formatTime,isExpired,getFullPath} from '../common/public';
import globalStyle from '../common/GlobalStyle';
import {getHuodongInfoByIdAction,getBaomingInfoByIdAction,getHuodongUserAction,getCangStatusAction,cangDongtaiAction,cancelBaomingAction} from '../../actions/userAction';
import AutoSizedImageMy from '../common/AutoSizedImageMy';
import UShare from '../common/UShare';
import {toastShort} from "../common/ToastTool";

//处理iframe
function renderNode(node, index) {
    if (node.name === 'iframe') {
        return (
            <View key={index} style={{width: 200, height: 200}}>
                <Text>
                    {node.attribs.src}
                </Text>
            </View>
        );
    }
    if (node.name === 'img') {
        let width =
            parseInt(node.attribs['width'], 10) || parseInt(node.attribs['data-width'], 10) || 0;
        let height =
            parseInt(node.attribs['height'], 10) ||
            parseInt(node.attribs['data-height'], 10) ||
            0;
        const imgStyle = {
            width,
            height,
        };

        const source = {
            uri: node.attribs.src,
            width,
            height,
        };
        return <AutoSizedImageMy key={index} source={source} style={imgStyle} />;
    }
}

class HuodongDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            huodong:{},
            baoming:false,//是否报名该活动
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
            huodongUser:[],//活动参与者
            isShoucang:false,//是否收藏过
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '活动详情'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    //组件加载完成以后，获取活动内容
    componentDidMount(){
        //先从realm中读取数据，如果有，直接显示，否则发送action请求网络数据
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        try{
            let item = realmObj.objects("Huodong").filtered("id == " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    huodong:item[0],
                });
            }
            //是否已经报名
            let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+userid+" and huodongid == "+this.state.id);
            if(baoming !== null && baoming.length > 0){
                this.setState({
                    baoming:true,
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getHuodongInfoByIdAction(this.state.id,this._loadHuodongComplete));
            this.props.dispatch(getBaomingInfoByIdAction(userid,this.state.id,this._loadBaomingComplete));
            this.props.dispatch(getHuodongUserAction(this.state.id,1,this._loadUserComplete));
            this.props.dispatch(getCangStatusAction(this.state.id,2,(status)=>{this._loadCangStatusComplete(status)}));
        }
    }
    //查询收藏状态
    _loadCangStatusComplete(status){
        this.setState({
            isShoucang:status
        });
    }
    //收藏、取消收藏
    shoucang(status){
        let statusNum = status ? 0 : 1;//收藏1、取消收藏0
        this.props.dispatch(cangDongtaiAction(this.state.id,2,statusNum,this._loadCangComplete.bind(this)));
    }
    _loadCangComplete(){
        let status = !this.state.isShoucang;
        this.setState({
            isShoucang:status
        });
    }
    //取消报名
    cancelBaoming(){
        let _that = this;
        Alert.alert(
            "您确定要取消报名吗？",
            "",
            [
                {text: '取消', onPress: ()=>{}},
                {text: '确定', onPress: ()=>{
                    _that.props.dispatch(cancelBaomingAction(_that.state.id,(result)=>{_that._loadCancelComplete(result)}));
                }}
            ],
            {cancelable: true}
        );
    }
    //取消报名完毕
    _loadCancelComplete = (result)=>{
        if(result.state === 'ok'){
            toastShort("取消报名成功!");
            this.setState({
                baoming:false,
            });
            realmObj.write(()=>{
                let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
                let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+userid+" and huodongid == "+this.state.id);
                realmObj.delete(baoming);
            });
        }else{
            toastShort(result.msg);
        }
    };
    //获取活动内容完毕
    _loadHuodongComplete = ()=>{
        try{
            let item = realmObj.objects("Huodong").filtered("id == " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    huodong:item[0],
                });
            }
        }catch(e){}
    };
    //获取报名信息完毕
    _loadBaomingComplete = ()=>{
        try{
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let item = realmObj.objects("HuodongBaoming").filtered("userid == "+userid+" and huodongid == "+this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    baoming:true,
                });
            }
        }catch(e){}
    };
    //获取活动参与者完毕
    _loadUserComplete = ()=>{
        try{
            let contentList = realmObj.objects("HuodongBaoming").filtered("huodongid == "+this.state.id);
            if(contentList !== null && contentList.length > 0){
                this.setState({
                    huodongUser:contentList,
                });
            }
        }catch(e){}
    };
    //主办方显示：用空格分割
    zhubanfang(str){
        if(str === "" || str === null || str === undefined){
            return null;
        }
        let strs= str.split(" "); //字符分割
        return (
            strs.map(function(item,i){
                return (
                    <Text key={i} style={{fontSize:12,alignSelf:'center',marginRight:5,borderWidth:1,borderColor:'#f2f2f2',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:3,backgroundColor:'#f8f8f8'}}>{item}</Text>
                );
            })
        )
    }
    render(){
        let item = this.state.huodong;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Card containerStyle={{marginLeft:0,marginRight:0,marginTop:10}} image={item['pic'] ? {uri:getFullPath(item['pic'],this.state.host)} : require('../../assets/images/nopic1.jpg')}>
                        <View>
                            <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                            <View style={styles.huodongItemTime}>
                                <Image style={[styles.huodongItemTimeImage,{width:22,height:22}]} source={require('../../assets/icon/icontime.png')}/>
                                <Text style={{flex:1,fontSize:12}}>{formatTime(item['starttime'],"yyyy年MM月dd日 hh:mm")} - {formatTime(item['endtime'],"yyyy年MM月dd日 hh:mm")}</Text>
                            </View>
                            <View style={styles.huodongItemTime}>
                                <Image style={styles.huodongItemTimeImage} source={require('../../assets/icon/iconaddress.png')}/>
                                <Text style={{flex:1,fontSize:12}}>{item['address']}</Text>
                            </View>
                            <View style={styles.huodongItemTime}>
                                <Image style={[styles.huodongItemTimeImage,{width:20,height:20}]} source={require('../../assets/icon/iconzhubanfang.png')}/>
                                <Text style={{fontSize:12}}>主办方：</Text>
                                {this.zhubanfang(item['zhubanfang'])}
                            </View>
                        </View>
                    </Card>
                    <View style={[styles.huodongDetail,{padding:8,marginBottom:5,borderTopWidth:10,borderTopColor:'#f2f2f2'}]}>
                        <Text>已报名{this.state.huodongUser.length}人</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:8,marginBottom:5,borderBottomWidth:10,borderBottomColor:'#f2f2f2'}}>
                        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} horizontal={true}>
                            {
                                this.state.huodongUser.map((item,i)=>{
                                    return (
                                        <TouchableWithoutFeedback key={i} onPress={()=>{this.props.navigation.navigate("PersonalHome",{id:item['userid']})}}>
                                            {
                                                item['avatar'] !== "" ?
                                                    <Image style={globalStyle.dongtaiAvatar} source={{uri:getFullPath(item['avatar'],this.state.host)}}/>
                                                    :
                                                    <Image style={globalStyle.dongtaiAvatar} source={require('../../assets/icon/iconhead.png')}/>
                                            }
                                        </TouchableWithoutFeedback>
                                    );
                                })
                            }
                        </ScrollView>
                        <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("BaomingList",{id:this.state.id})}}>
                            <Image style={{width:40,height:40}} source={require('../../assets/icon/icongengduo.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.huodongDetail}>
                        <Text>活动详情</Text>
                    </View>
                    <HTMLView
                        value={item['content']}
                        stylesheet={styles}
                        style={{padding:8,paddingTop:0}}
                        renderNode={renderNode}
                        addLineBreaks={false}
                        onLinkPress={(url) => {this.props.navigation.navigate("ShowUrl",{url:url})}}
                    />
                </ScrollView>
                <View style={styles.baoming}>
                    <TouchableWithoutFeedback onPress={()=>{this.shoucang(this.state.isShoucang)}}>
                    <View style={{flex:1,alignItems:'center',borderRightWidth:1,borderRightColor:'#f2f2f2'}}>
                        <Image style={[styles.huodongItemTimeImage,{width:16,height:16}]}
                               source={this.state.isShoucang ? require('../../assets/icon/iconshoucang2.png') : require('../../assets/icon/iconshoucang.png')}/>
                        <Text style={{fontSize:12,marginTop:5}}>{this.state.isShoucang ? "取消收藏" : "收藏"}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{UShare.share(item['title'],getFullPath(item['pic'],this.state.host),"https://www.baidu.com",()=>{},()=>{})}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image style={[styles.huodongItemTimeImage,{width:16,height:16}]} source={require('../../assets/icon/iconshare.png')}/>
                        <Text style={{fontSize:12,marginTop:5}}>分享</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={{flex:2}}>
                        {
                            isExpired(item['jiezhitime']) ?
                                <Button
                                    backgroundColor='#dddddd'
                                    color='#666666'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    containerViewStyle={{marginLeft:0,marginRight:0,justifyContent:'center'}}
                                    title={isExpired(item['endtime']) ? '活动已结束' : '报名已截止'} /> :
                                <Button
                                    backgroundColor={this.state.baoming ? '#ff4343' : '#03A9F4'}
                                    color='#ffffff'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    containerViewStyle={{marginLeft:0,marginRight:0,justifyContent:'center'}}
                                    onPress={this.state.baoming ? ()=>{this.cancelBaoming()} : () => {this.props.navigation.navigate("HuodongBaoMing",{id:item['id']})}}
                                    title={this.state.baoming ? '取消报名' : '我要报名'} />
                        }
                    </View>
                </View>
            </View>
        );
    }
}

function select(state) {
    const {userReducer} = state;
    return {
        userReducer
    }
}
export default connect(select)(HuodongDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title:{
        padding:8,
        paddingTop:12,
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16
    },
    htmlContainer:{
        padding:0,
        paddingTop:0
    },
    p:{
        marginBottom:8,
        lineHeight:28,
    },
    div:{
        marginBottom:8,
        lineHeight:28,
    },
    icon:{
        marginLeft:10
    },
    huodongItemTitle:{
        fontSize:16,
        color:'#333333',
        marginBottom:15,
    },
    huodongItemTime:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        marginBottom:10,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2'
    },
    huodongItemTimeImage:{
        width:18,
        height:18,
        marginRight:3,
        tintColor:'#00bfff'
    },
    huodongDetail:{
        marginTop:0,
        marginBottom:20,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        padding:8
    },
    baoming:{
        borderTopWidth:1,
        borderTopColor:'#f2f2f2',
        flexDirection:'row',
        //justifyContent:'center',
        alignItems:'center'
    }
});