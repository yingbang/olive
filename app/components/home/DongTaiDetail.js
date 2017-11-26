/**
 * 动态详情
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import { Header,Icon} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import globalStyle from '../common/GlobalStyle';
import {getDateTimeDiff,inArray,getFullPath} from '../common/public';
import {toastShort} from "../common/ToastTool";
import {getZanAction,getPinglunAction,getCangStatusAction,zanDongtaiAction,cangDongtaiAction,pinglunAction} from '../../actions/userAction';
import ImageRange from '../common/ImageRange';
import UShare from '../common/UShare';

class DongTaiDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            dongtaiId:this.props.navigation.state.params.id,//动态ID
            dongtai:{},//动态内容
            pinglun:[],//评论列表
            zan:[],//这篇动态的点赞者列表
            currentPinglunPage:1,//当前的页码
            loadPinglunFinish:false,//评论是否获取完毕
            loading:false,//下拉刷新显示
            zanDongtaiList:[],//点赞过的动态列表，用于判断是否点赞
            isShoucang:false,//是否收藏过
            pinglunText:"",//当前评论框里面的内容
            toUserid:0,//用于区分这个评论到底是针对谁的，默认是动态的发布者，如果是回复动态中的某一条评论，则代表发布那条评论的那个人的ID
            toUsername:"",
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        }
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '动态详情'}}
                rightComponent={{ icon: 'more-horiz'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    componentDidMount(){
        try{
            //获取动态内容
            let dongtai = realmObj.objects("Dongtai").filtered("id = " + this.state.dongtaiId);
            if(dongtai.length > 0){
                this.setState({
                    dongtai:dongtai[0],
                    toUserid:dongtai[0]['userid'],
                    toUsername:dongtai[0]['name'],
                });
            }
            //获取这篇动态的点赞者列表
            let zan = realmObj.objects("Zan").filtered("contentid = " + this.state.dongtaiId).slice(0, 6);
            if(zan.length > 0){
                this.setState({
                    zan:zan
                });
            }
            //获取评论列表
            let pinglun = realmObj.objects("Pinglun").filtered("type = 1 and contentid = " + this.state.dongtaiId);
            if(pinglun.length > 0){
                pinglun = pinglun.sorted('id',true);
                this.setState({
                    pinglun:pinglun
                });
            }
            //获取作者点赞过的动态列表
            let zanDongtaiList = realmObj.objects("ZanDongtai");
            if(zanDongtaiList.length > 0){
                this.setState({
                    zanDongtaiList:zanDongtaiList
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getZanAction(this.state.dongtaiId,1,this._loadZanComplete));
            this.props.dispatch(getCangStatusAction(this.state.dongtaiId,1,(status)=>{this._loadCangStatusComplete(status)}));
            this.props.dispatch(getPinglunAction(this.state.dongtaiId,this.state.currentPinglunPage,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
        }
    }
    //查询收藏状态
    _loadCangStatusComplete(status){
        this.setState({
            isShoucang:status
        });
    }
    //获取点赞列表完毕
    _loadZanComplete = ()=>{
        try{
            let zan = realmObj.objects("Zan").filtered("contentid = " + this.state.dongtaiId).slice(0, 6);
            if(zan.length > 0){
                this.setState({
                    zan:zan
                });
            }
        }catch(e){}
    };
    //获取评论列表完毕
    _loadPinglunComplete(totalPage){
        try{
            let contentList = realmObj.objects("Pinglun").filtered("type = 1 and contentid = " + this.state.dongtaiId);
            if(contentList.length > 0){
                contentList = contentList.sorted('id',true);
                let page = this.state.currentPinglunPage;
                this.setState({
                    pinglun:contentList,
                    currentPinglunPage:page + 1,
                    loadPinglunFinish:page >= totalPage,
                    loading:false,
                });
            }
        }catch(e){}
    }
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadPinglunFinish === false){
                this.props.dispatch(getPinglunAction(this.state.dongtaiId,this.state.currentPinglunPage,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getPinglunAction(this.state.dongtaiId,1,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
    };
    //点击回复评论
    huifu(userid,name){
        this.setState({
            toUserid:userid,
            toUsername:name,
        });
        this.pinglunInput.focus();//点击回复评论的时候，光标定位，当光标离开的时候，重新设置toUserid、toUsername
    }
    //当离开输入框，并且没有内容的时候
    onBlurPinglun(){
        if(this.state.pinglunText === ""){
            this.setState({
                toUserid:this.state.dongtai['userid'],
                toUsername:this.state.dongtai['name'],
            });
        }
    }
    //评论项
    renderRow = ({item}) => (
        <View style={{paddingTop:8,paddingBottom:8,borderBottomWidth:1,borderBottomColor:'#f8f8f8'}}>
            <View style={{flexDirection:'row'}}>
                {
                    item['avatar'] !== "" ?
                        <Image style={globalStyle.dongtaiAvatar} source={{uri:getFullPath(item['avatar'],this.state.host)}}/>
                        :
                        <Image style={globalStyle.dongtaiAvatar} source={require('../../assets/icon/iconhead.png')}/>
                }
                <View style={{flex:1}}>
                    <Text style={{fontSize:12}}>{item['name']}</Text>
                    <Text style={{fontSize:10}}>{getDateTimeDiff(item['dateline'])}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={()=>{this.huifu(item['userid'],item['name'])}}>
                        <Image style={{width:15,height:15,marginRight:15}} source={require('../../assets/icon/iconhuifu.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={{flexDirection:'row'}}>
                            <Image style={{width:15,height:15,marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                            <Text style={{fontSize:10}}>{item['zan']}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{marginLeft:30,marginTop:8}}>
                <Text style={{fontSize:12}}>{item['content']}</Text>
            </View>
        </View>
    );
    //点赞、取消点赞
    zanDongtai(id,type){
        this.props.dispatch(zanDongtaiAction(id,type,()=>{this._loadZanDongtaiComplete()}));
    }
    _loadZanDongtaiComplete(){
        try{
            let contentList = realmObj.objects("ZanDongtai");
            if(contentList.length > 0){
                this.setState({
                    zanDongtaiList:contentList
                });
            }
            this.props.dispatch(getZanAction(this.state.dongtaiId,1,this._loadZanComplete));//更新点赞者列表
        }catch(e){}
    }
    //收藏、取消收藏
    shoucang(status){
        let statusNum = status ? 0 : 1;//收藏1、取消收藏0
        this.props.dispatch(cangDongtaiAction(this.state.dongtaiId,1,statusNum,this._loadCangComplete.bind(this)));
    }
    _loadCangComplete(){
        let status = !this.state.isShoucang;
        this.setState({
            isShoucang:status
        });
    }
    //发布评论
    onSubmitComment(){
        let content = this.state.pinglunText;
        if(content === "" || content === null || content === undefined){
            toastShort("说点什么吧");
            return false;
        }
        this.props.dispatch(pinglunAction(content,this.state.dongtaiId,this.state.toUserid,1,(result)=>{this._PinglunComplete(result)}));
    }
    _PinglunComplete(result){
        if(result.state === 'ok'){
            toastShort("发布成功！");
            this.props.dispatch(getPinglunAction(this.state.dongtaiId,1,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
            this.state.pinglunText = "";//清空内容
            this.pinglunInput.clear();//清空
            //更新一下realm中动态的内容，否则不会立即显示
            realmObj.write(()=>{
                let dongtai = realmObj.objects("Dongtai").filtered("id = " + this.state.dongtaiId);
                if(dongtai.length > 0){
                    dongtai[0].pinglun = dongtai[0].pinglun + 1;
                }
            });
        }else{
            toastShort("发布失败，请重试！");
        }
    }
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    render(){
        const {dongtai} = this.state;
        const dongtaiPics = realmObj.objects("Dongtai").filtered("id = " + this.state.dongtaiId)[0]['pics'];//刚开始为空，不显示图片，这样的话才显示
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}
                            onMomentumScrollEnd = {this._contentViewScroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loading}
                                    onRefresh={this._refresh.bind(this)}
                                />
                            }
                            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                >
                    <View style={styles.block}>
                        <View>
                            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("PersonalHome",{id:dongtai['userid']})}}>
                            <View style={{flexDirection:'row',marginBottom:20,marginTop:12}}>
                                {
                                    dongtai['avatar'] !== "" ?
                                        <Image style={globalStyle.dongtaiAvatar} source={{uri:getFullPath(dongtai['avatar'],this.state.host)}}/>
                                        :
                                        <Image style={globalStyle.dongtaiAvatar} source={require('../../assets/icon/iconhead.png')}/>
                                }
                                <View>
                                    <Text>{dongtai['name']}</Text>
                                    <Text style={{color:'#999999',fontSize:12}}>{getDateTimeDiff(dongtai['dateline'])}</Text>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                            <View style={{marginBottom:20,overflow:'hidden'}}>
                                <Text style={{marginBottom:10}}>{dongtai['content']}</Text>
                                <ImageRange images={dongtaiPics} {...this.props}/>
                            </View>
                            <View>
                                {
                                    dongtai['zan'] > 0 ?
                                        <View style={{marginBottom:15,borderBottomWidth:1,borderBottomColor:'#f8f8f8',paddingBottom:15}}>
                                            <Text style={{fontSize:14,color:'#666',marginBottom:10,marginTop:15}}>{dongtai['zan']}人赞了</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} horizontal={true}>
                                                    {
                                                        this.state.zan.map((item,i)=>{
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
                                                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("ZanList",{id:dongtai['id']})}}>
                                                    <Image style={{width:40,height:40}} source={require('../../assets/icon/icongengduo.png')}/>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        : <View style={{marginBottom:15,borderBottomWidth:1,borderBottomColor:'#f8f8f8',paddingBottom:15}}></View>
                                }

                                {
                                    dongtai['pinglun'] > 0 ?
                                        <View>
                                            <Text style={{marginBottom:8,fontSize:14}}>{dongtai['pinglun']}条评论</Text>
                                            <FlatList
                                                renderItem={this.renderRow}
                                                data={this.state.pinglun}
                                                extraData={this.state}
                                                keyExtractor={this._keyExtractor}
                                            />
                                        </View>
                                        :
                                         <View>
                                            <Text style={{marginBottom:8,fontSize:14}}>评论</Text>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{marginTop:30}}>还没有人评论过，不如你来抢沙发</Text>
                                            </View>
                                         </View>
                                }

                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:80}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity style={{flex:1,height:40}}>
                            <View style={styles.inputView}>
                                <TextInput
                                    ref={(pinglunInput)=>{this.pinglunInput = pinglunInput;}}
                                    placeholder={(this.state.toUserid === this.state.dongtai['userid']) ? "评论" : "回复："+this.state.toUsername}
                                    underlineColorAndroid={"#f2f2f2"}
                                    style={styles.textInputStyle}
                                    clearButtonMode="while-editing"
                                    clearTextOnFocus={true}
                                    multiline={true}
                                    enablesReturnKeyAutomatically={true}
                                    autoGrow={true}
                                    onChangeText={(text)=>{this.setState({pinglunText:text})}}
                                    onBlur={()=>{this.onBlurPinglun()}}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSubmitComment()}>
                            <Text style={styles.cancelText}>发表</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',borderTopColor:'#f8f8f8',borderTopWidth:1,height:30}}>
                        {
                            inArray(this.state.zanDongtaiList,dongtai['id'],'id') ?
                                <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(dongtai['id'],0)}}>
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                        <Image style={{width:15,height:15,tintColor:'#333333',marginRight:5}} source={require('../../assets/icon/iconzan2.png')}/>
                                        <Text style={{fontSize:12}}>取消赞</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(dongtai['id'],1)}}>
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                        <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                        <Text style={{fontSize:12}}>赞</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                        }
                        <TouchableWithoutFeedback onPress={()=>{UShare.share("你好标题","我是要分享的内容","https://mmbiz.qlogo.cn/mmbiz_png/7HmKrmWJ6Xfkm49C15ThoI8q6rexlGgIWKAp9szBq0uzYtnEkSpHib2dEmRq15jBuYdMnkaCpsqvPWaDaemSorg/0?wx_fmt=png","https://www.baidu.com",()=>{},()=>{})}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconfenxiang.png')}/>
                                <Text style={{fontSize:12}}>分享</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{this.shoucang(this.state.isShoucang)}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}}
                                       source={this.state.isShoucang ? require('../../assets/icon/iconshoucang2.png') : require('../../assets/icon/iconshoucang.png')}/>
                                <Text style={{fontSize:12}}>{this.state.isShoucang ? "取消收藏" : "收藏"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
export default connect(select)(DongTaiDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8,
        flex:1,
    },
    inputView:{
        flex:1,
        height: 40,
        //设置圆角程度
        borderRadius: 6,
        //设置边框的颜色
        borderColor: '#f2f2f2',
        backgroundColor:'#f2f2f2',
        //设置边框的宽度
        borderWidth: 1,
        //内边距
        paddingLeft: 5,
        paddingRight: 5,
        //外边距
        marginRight: 8,
        marginLeft:8,
        marginBottom:8,
        //设置相对父控件居中
        alignSelf: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    textInputStyle:{
        //height:40,
        fontSize:12,
        flex:1,
    },
    cancelText:{
        color:'#00BFFF',
        marginRight:8
    },
});