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
    FlatList
} from 'react-native';
import request from 'superagent';
import { Card, List, ListItem} from 'react-native-elements';
import HeaderWithSearch from '../common/HeaderWithSearch';
import Carousel from '../common/Carousel';
import GongYiZuZhi from './GongYiZuZhi';
import GongYiDaRen from './GongYiDaRen';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {getSlideAction, getNoticeAction} from '../../actions/toolAction';
import ScrollVertical from '../common/ScrollVertical';

const { width, height } = Dimensions.get('window');
const contentList = [
    {
        key:0,
        title: 'Appointments',
    },
    {
        key:1,
        title: 'Trips',
    },
    {
        key:2,
        title: 'Trips',
    },
    {
        key:3,
        title: 'Trips',
    },
    {
        key:4,
        title: 'Trips',
    },
]

export default class Hot extends Component{

    static navigationOptions = {
        header:<HeaderWithSearch/>
    };

    constructor(props) {
        super(props);

        this.state = {
            slide:[],
            notice:[],
            currentSlidePage:0,
        };
    }

    //动态项
    renderRow = ({item}) => (
        <View style={{marginBottom:15}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail");}}>
                <View>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Image style={{width:40,height:40,borderRadius:20,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                        <View>
                            <Text>橄榄枝编辑</Text>
                            <Text style={{color:'#999999',fontSize:12}}>3天前</Text>
                        </View>
                    </View>
                    <View>
                        <Text>橄榄枝新品发布会成功举行！两款智能装备将为这个跑马季带来无限新动力！智能跑鞋源自UA生产线，采用创新高科技鞋底技术</Text>
                        <Text style={{color:'#00bfff',marginTop:5}}>查看全文</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TouchableWithoutFeedback onPress={()=>{alert('赞')}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:15}} source={require('../../assets/icon/iconzan.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:15}} source={require('../../assets/icon/iconpinglun.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{UShare.share('你好', '分享内容', '','',()=>{},()=>{})}}>
                                <Image style={{width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconfenxiang.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                                <Image style={{width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconmore.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                        <View>
                            <View style={{flexDirection:'row',marginBottom:8}}>
                                <Image style={{width:15,height:15,tintColor:'#333',marginRight:5}} source={require('../../assets/icon/iconzan2.png')}/>
                                <Text style={{fontSize:12,color:'#333'}}>102人赞了</Text>
                            </View>
                            <Text style={{fontSize:12}}><Text style={{color:'#333'}}>逍遥：</Text>我是沙发啊</Text>
                            <Text style={{fontSize:12}}><Text style={{color:'#333'}}>吐槽君：</Text>这一听就很不错，小编说的非常对。</Text>
                            <Text style={{color:'#00bfff',marginTop:5,fontSize:12}}>查看所有100条评论</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

    //获取幻灯片、头条、公益组织、达人、动态等
    componentDidMount(){
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
        }catch(e){
            console.log(e);
        }finally {
            this.props.screenProps.dispatch(getSlideAction(this._loadSlideComplete.bind(this)));
            this.props.screenProps.dispatch(getNoticeAction(this._loadNoticeComplete.bind(this)));
        }
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

    onPressSlide(){
        let item = this.state.slide[this.state.currentSlidePage];
        this.props.screenProps.navigation.navigate("ShowUrl",{url:item.url});
    }
    render(){
        return (
            <ScrollView style={styles.container}>
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
                                        <Image style={styles.carousel} source={{uri:item['pic']}}/>
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
                                onClick={(id)=>{this.props.navigation.navigate("NoticeDetail",{id:id})}}
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
                        <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={colors.c99}>更多</Text>
                                <Image style={[colors.tint99,{width:15,height:15}]} source={require('../../assets/icon/icongo.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                        <FlatList
                            renderItem={this.renderRow}
                            data={contentList}
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
});