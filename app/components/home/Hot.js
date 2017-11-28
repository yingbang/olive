/**
 * 首页：热门
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Button,
    Platform,
    FlatList,
    RefreshControl,
    InteractionManager
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {getDateTimeDiff,inArray,getFullPath} from '../common/public';
import { Card, List, ListItem} from 'react-native-elements';
import HeaderWithSearch from '../common/HeaderWithSearch';
import Carousel from '../common/Carousel';
import GongYiZuZhi from './GongYiZuZhi';
import GongYiDaRen from './GongYiDaRen';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {getSlideAction, getNoticeAction} from '../../actions/toolAction';
import {getDongtaiAction,getZanDongtaiAction,zanDongtaiAction} from '../../actions/userAction';
import ScrollVertical from '../common/ScrollVertical';
import ImageRange from '../common/ImageRange';
import UShare from '../common/UShare';

const { width, height } = Dimensions.get('window');

export default class Hot extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props) {
        super(props);

        this.state = {
            slide:[{}],//幻灯片
            notice:[],//头条
            currentSlidePage:0,//幻灯片索引，从0开始
            loading:false,
            dongtai:[],//动态列表
            currentDongtaiPage:1,//当前加载的动态页
            loadDongtaiFinish:false,//某一次动态加载是否完成
            zanDongtaiList:[],//点赞过的列表
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }

    //动态项
    renderRow = ({item}) => (
        <View style={{marginBottom:15}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                <View>
                    <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("PersonalHome",{id:item['userid']})}}>
                    <View style={globalStyle.dongtaiAvatarView}>
                        {
                            item['avatar'] !== "" ?
                                <Image style={globalStyle.dongtaiAvatar} source={{uri:getFullPath(item['avatar'],this.state.host)}}/>
                                :
                                <Image style={globalStyle.defaultAvatar} source={require('../../assets/icon/iconhead.png')}/>
                        }
                        <View>
                            <Text>{item['name']}</Text>
                            <Text style={{color:'#999999',fontSize:12}}>{getDateTimeDiff(item['dateline'])}</Text>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={{marginBottom:10}}>{item['content']}</Text>
                        <ImageRange images={item['pics']} {...this.props}/>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            {
                                inArray(this.state.zanDongtaiList,item['id'],'id') ?
                                    <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],0)}}>
                                        <Image style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconzan2.png')}/>
                                    </TouchableWithoutFeedback>
                                    :
                                    <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],1)}}>
                                        <Image style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconzan.png')}/>
                                    </TouchableWithoutFeedback>
                            }
                            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                                <Image style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconpinglun.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{UShare.share("你好标题","我是要分享的内容","https://mmbiz.qlogo.cn/mmbiz_png/7HmKrmWJ6Xfkm49C15ThoI8q6rexlGgIWKAp9szBq0uzYtnEkSpHib2dEmRq15jBuYdMnkaCpsqvPWaDaemSorg/0?wx_fmt=png","https://www.baidu.com",()=>{},()=>{});}}>
                                <Image style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconfenxiang.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                                <Image style={[globalStyle.dongtaiIcon,{marginRight:0}]} source={require('../../assets/icon/iconmore.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View>
                        {
                            item['zan'] > 0 ?
                                <View style={{flexDirection:'row',marginBottom:8}}>
                                    <Image style={{width:15,height:15,tintColor:'#333',marginRight:5}} source={require('../../assets/icon/iconzan2.png')}/>
                                    <Text style={{fontSize:12,color:'#333'}}>{item['zan']}人赞了</Text>
                                </View>
                                : null
                        }

                        <HTMLView
                            value={item['pinglunlist']}
                            stylesheet={styles}
                            addLineBreaks={false}
                            onLinkPress={(url) => {this.props.screenProps.navigation.navigate("ShowUrl",{url:url})}}
                        />
                        {
                            item['pinglun'] > 3 ? <Text style={{color:'#00bfff',marginTop:5,fontSize:12}}>查看所有{item['pinglun']}条评论</Text> : null
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
    //点赞、取消点赞
    zanDongtai(id,type){
        this.props.screenProps.dispatch(zanDongtaiAction(id,type,()=>{this._loadZanDongtaiComplete()}));
    }
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    //获取幻灯片、头条、公益组织、达人、动态等
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            try{
                //幻灯片
                let slideList = realmObj.objects("Slide");
                if(slideList.length > 0){
                    slideList = slideList.sorted('id',true);
                    this.setState({
                        slide:slideList
                    });
                }
                //公告头条
                let noticeList = realmObj.objects("Notice");
                if(noticeList.length > 0){
                    noticeList = noticeList.sorted('id',true);
                    this.setState({
                        notice:noticeList
                    });
                }
                //动态
                let dongtaiList = realmObj.objects("Dongtai");
                if(dongtaiList.length > 0){
                    dongtaiList = dongtaiList.sorted('id',true);
                    this.setState({
                        dongtai:dongtaiList
                    });
                }
                //点赞列表
                let zanDongtaiList = realmObj.objects("ZanDongtai");
                if(zanDongtaiList.length > 0){
                    this.setState({
                        zanDongtaiList:zanDongtaiList
                    });
                }
            }catch(e){
                console.log(e);
            }finally {
                this.props.screenProps.dispatch(getSlideAction(this._loadSlideComplete.bind(this)));
                this.props.screenProps.dispatch(getNoticeAction(1,this._loadNoticeComplete.bind(this)));
                this.props.screenProps.dispatch(getDongtaiAction("",this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
                this.props.screenProps.dispatch(getZanDongtaiAction(1,this._loadZanDongtaiComplete.bind(this)));
            }
        });
    }
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadSlideComplete(){
        try{
            let contentList = realmObj.objects("Slide");
            if(contentList.length > 0){
                contentList = contentList.sorted('id',true);
                this.setState({
                    slide:contentList
                });
            }
        }catch(e){}
    }
    _loadNoticeComplete(){
        try{
            let contentList = realmObj.objects("Notice");
            if(contentList.length > 0){
                contentList = contentList.sorted('id',true);
                this.setState({
                    notice:contentList
                });
            }
        }catch(e){}
    }
    _loadDongtaiComplete(totalPage){
        try{
            let contentList = realmObj.objects("Dongtai");
            if(contentList.length > 0){
                contentList = contentList.sorted('id',true);
                let page = this.state.currentDongtaiPage;
                this.setState({
                    dongtai:contentList,
                    currentDongtaiPage:page + 1,
                    loadDongtaiFinish:page >= totalPage,
                    loading:false,
                });
            }else{
                this.setState({
                    loading:false,
                });
            }
        }catch(e){}
    }
    _loadZanDongtaiComplete(){
        try{
            let contentList = realmObj.objects("ZanDongtai");
            if(contentList.length > 0){
                this.setState({
                    zanDongtaiList:contentList
                });
            }
        }catch(e){}
    }
    onPressSlide(){
        let item = this.state.slide[this.state.currentSlidePage];
        this.props.screenProps.navigation.navigate("ShowUrl",{url:item.url});
    }
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadDongtaiFinish === false){
                this.props.screenProps.dispatch(getDongtaiAction("",this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.screenProps.dispatch(getDongtaiAction("",1,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
    };
    render(){
        return (
            <ScrollView style={styles.container}
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
                    <Carousel
                        delay={4000}
                        style={styles.carousel}
                        autoplay
                        pageInfo={false}
                        swiper
                        onAnimateNextPage={(p) => {this.setState({currentSlidePage:p})}}
                        bullets={true}
                        onClick={()=>{this.onPressSlide()}}
                    >
                        {
                            this.state.slide.map((item,i)=>{
                                return (
                                    <View key={i} style={styles.carousel}>
                                        <Image style={styles.carousel} source={{uri:getFullPath(item['pic'],this.state.host)}}/>
                                    </View>
                                );
                            })
                        }
                    </Carousel>
                    <TouchableWithoutFeedback>
                        <View style={styles.toutiao}>
                            <Text style={{color:'#00bfff',fontWeight:'600',marginRight:10}}>头条</Text>
                            <ScrollVertical
                                onChange={(index => {
                                    this.index = index;
                                })}
                                onClick={(id)=>{this.props.screenProps.navigation.navigate("NoticeDetail",{id:id})}}
                                enableAnimation={true}
                                data={realmObj.objects("Notice")}
                                delay={2500}
                                duration={1000}
                                scrollHeight={17}
                                scrollStyle={{flex:1 }}
                                kbContainer={{flex:1,marginTop:(Platform.OS === 'ios') ? 4 : 0}}
                                textStyle={{fontSize: 12 }} />
                            <Image style={{width:14,height:14}} source={require('../../assets/icon/icongo.png')}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[globalStyle.flex1,styles.block]}>
                    <GongYiZuZhi {...this.props}/>
                </View>
                <View style={[globalStyle.flex1,styles.block]}>
                    <GongYiDaRen {...this.props}/>
                </View>
                <View style={[styles.block,globalStyle.flex1]}>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Text style={globalStyle.flex1}>热门公益</Text>
                        <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={colors.c99}>更多</Text>
                                <Image style={[colors.tint99,{width:15,height:15}]} source={require('../../assets/icon/icongo.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{backgroundColor:'#ddd',overflow:'hidden'}}>
                        <Image style={{width:width,height:150,flex:1}} resizeMode="stretch" source={require('../../assets/mock_data/banner/3.jpg')}/>
                    </View>
                </View>
                <View style={[styles.block,globalStyle.flex1]}>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Text style={globalStyle.flex1}>精选动态</Text>
                    </View>
                    <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                        <FlatList
                            renderItem={this.renderRow}
                            data={this.state.dongtai}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                        />
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8,
    },
    carousel:{
        width:width - 16,//去掉两边的padding
        height:150
    },
    toutiao:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:8,
    },
    p:{
        color:'#666',
        fontSize:12,
        marginBottom:3
    },
    b:{
        color:'#333'
    },
});