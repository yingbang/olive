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
    NetInfo
} from 'react-native';
import {LazyloadScrollView, LazyloadView, LazyloadImage} from '../common/lazyload';
import {List} from 'react-native-elements';
import GongYiZuZhi from './GongYiZuZhi';
import GongYiDaRen from './GongYiDaRen';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {getDongtaiAction,getZanDongtaiAction,getNetWorkState} from '../../actions/userAction';
import DongtaiItem from '../common/DongtaiItem';
import HotSlide from './HotSlide';

const { width, height } = Dimensions.get('window');

export default class Hot extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            dongtai:[],//动态列表
            currentDongtaiPage:1,//当前加载的动态页
            loadDongtaiFinish:false,//某一次动态加载是否完成
            zanDongtaiList:[],//点赞过的列表
        };
        this.prevDongtaiLength = 0;
        this.lazyloadName = "lazyload-hotlist";//懒加载的name

        //this.count = 0;
    }
    shouldComponentUpdate(nextProps,nextState){
        //console.log("刷新前");
        //如果动态列表的长度和点赞列表的长度都没有变化，就不更新
        if(this.prevDongtaiLength === nextState.dongtai.length){
            return false;
        }
        this.prevDongtaiLength = nextState.dongtai.length;
        //console.log("刷新了");
        return true;
    }
    //动态项
    renderRow = ({item}) => (
        <DongtaiItem name={this.lazyloadName} item={item} zan={this.state.zanDongtaiList} {...this.props}/>
    );
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    //获取幻灯片、头条、公益组织、达人、动态等
    componentDidMount(){
        try{
            //动态
            let dongtaiList = realmObj.objects("Dongtai");
            //点赞列表
            let zanDongtaiList = realmObj.objects("ZanDongtai");
            this.setState({
                dongtai:dongtaiList.length >= 0 ? dongtaiList.sorted('id',true) : [],
                zanDongtaiList:zanDongtaiList.length >= 0 ? zanDongtaiList : [],
            });
        }catch(e){
            console.log(e);
        }finally {
            this.props.screenProps.dispatch(getDongtaiAction("",this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            this.props.screenProps.dispatch(getZanDongtaiAction(1));
        }
    }
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadDongtaiComplete(totalPage){
        try{
            let contentList = realmObj.objects("Dongtai");
            if(contentList.length >= 0){
                contentList = contentList.sorted('id',true);
                let page = this.state.currentDongtaiPage;
                this.setState({
                    dongtai:contentList,
                    currentDongtaiPage:page + 1,
                    loadDongtaiFinish:page >= totalPage,
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
        //console.log("========="+(this.count++)+"========");
        return (
            <LazyloadScrollView name={this.lazyloadName} style={styles.container}
                        onMomentumScrollEnd = {this._contentViewScroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.loading}
                                onRefresh={this._refresh.bind(this)}
                            />
                        }
                        showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            >
                <HotSlide {...this.props}/>
                <View style={[globalStyle.flex1,styles.block]}>
                    <GongYiZuZhi name={this.lazyloadName} {...this.props}/>
                </View>
                <View style={[globalStyle.flex1,styles.block]}>
                    <GongYiDaRen name={this.lazyloadName} {...this.props}/>
                </View>
                <View style={[styles.block,globalStyle.flex1]}>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Text style={[globalStyle.flex1,globalStyle.homeTitle]}>热门公益</Text>
                        <TouchableWithoutFeedback onPress={()=>{}}>
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
                        <Text style={[globalStyle.flex1,globalStyle.homeTitle]}>精选动态</Text>
                    </View>
                    <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                        <FlatList
                            renderItem={this.renderRow}
                            data={this.state.dongtai}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            initialNumToRender={1}
                            removeClippedSubviews={true}
                        />
                    </List>
                </View>
            </LazyloadScrollView>
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
        overflow:'hidden'
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