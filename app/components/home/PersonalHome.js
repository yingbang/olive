/**
 * 个人主页
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    FlatList,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import {List} from 'react-native-elements';
import {getFullPath} from '../common/public';
import ParallaxScrollView from '../common/parallax/index';
import Blank from '../common/Blank';
import BlankDongtai from '../common/BlankDongtai';
import {getDongtaiAction,getUserInfoByIdAction,zanDongtaiAction} from '../../actions/userAction';
import DongtaiItem from '../common/DongtaiItem';
import {LazyloadScrollView, LazyloadView, LazyloadImage} from '../common/lazyload';
import {CachedImage} from '../common/ImageCacheMy';

const window = Dimensions.get('window');
const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 40;

class PersonalHome extends Component{

    static navigationOptions = {
        header:null
    };
    constructor(props) {
        super(props);

        this.state = {
            dongtai:[],
            currentDongtaiPage:1,
            loadDongtaiFinish:false,
            loading:false,
            userid:this.props.navigation.state.params.id,//只显示当前用户的动态
            userInfo:{},//会员信息
            zanDongtaiList:[],//点赞过的动态列表，用于判断是否点赞
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
        this.lazyloadName = "lazyload-personallist";//懒加载的name
    }
    //动态项
    renderRow = ({item}) => (
        <DongtaiItem name={this.lazyloadName} item={item} from={1} zan={this.state.zanDongtaiList} {...this.props}/>
    );
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;

    //获取动态
    componentDidMount(){
        try{
            //动态
            let dongtaiList = realmObj.objects("Dongtai").filtered("userid == " + this.state.userid);
            //会员信息
            let userInfo = realmObj.objects("User").filtered("id == " + this.state.userid);
            //获取作者点赞过的动态列表
            let zanDongtaiList = realmObj.objects("ZanDongtai");
            this.setState({
                dongtai:dongtaiList.sorted('id',true),
                userInfo:userInfo[0],
                zanDongtaiList:zanDongtaiList
            });
        }catch(e){
            console.log(e);
        }finally {
            this.props.dispatch(getDongtaiAction(this.state.userid,this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            this.props.dispatch(getUserInfoByIdAction(this.state.userid,this._loadUserInfoComplete));
        }
    }
    //网络请求加载完成
    _loadDongtaiComplete(totalPage){
        try{
            let contentList = realmObj.objects("Dongtai").filtered("userid == " + this.state.userid);
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
    _loadUserInfoComplete(){
        try{
            let userInfo = realmObj.objects("User").filtered("id == " + this.state.userid);
            if(userInfo.length >= 0){
                this.setState({
                    userInfo:userInfo[0]
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
                this.props.dispatch(getDongtaiAction(this.state.userid,this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getDongtaiAction(this.state.userid,1,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
    };
    /**
     * 点击返回按钮
     */
    pressBack(){
        this.props.navigation.goBack();
    }
    //编辑个人信息
    bianji(){
        this.props.navigation.navigate("ZiLiao");
    }
    render(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let isSelf = (userid - this.state.userid === 0);
        let _that =this;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true}/>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <ParallaxScrollView
                        BackgroundColor="#ffffff"
                        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                        backgroundSpeed={10}
                        renderBackground={() => (
                            <View key="background">
                                <CachedImage style={{width: window.width,height: PARALLAX_HEADER_HEIGHT}}
                                             source={require("../../assets/images/personalBg.png")}/>
                                <View style={{position: 'absolute',
                                    top: 0,
                                    width: window.width,
                                    backgroundColor: 'rgba(0,0,0,.4)',
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                            </View>
                        )}
                        renderForeground={() => (
                            <View key="parallax-header" style={ styles.parallaxHeader }>
                                {
                                    (_that.state.userInfo['avatar'] !== "") ?
                                        <CachedImage style={ [styles.avatar,{width: AVATAR_SIZE, height: AVATAR_SIZE}] } source={{uri: getFullPath(_that.state.userInfo['avatar'],_that.state.host)}}/> :
                                        <CachedImage style={ [styles.avatar,{width: AVATAR_SIZE, height: AVATAR_SIZE}] }
                                                     source={require('../../assets/icon/iconhead.png')}/>
                                }
                                <Text style={ styles.sectionSpeakerText }>{_that.state.userInfo['nickname']}</Text>
                                <Text style={ styles.sectionTitleText }>
                                    {_that.state.userInfo['intro']}
                                </Text>
                            </View>
                        )}
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection}>
                                <TouchableWithoutFeedback onPress={()=>_that.pressBack()}>
                                    <View>
                                        <CachedImage style={{width:15,height:15,marginLeft:8}} source={require('../../assets/icon/iconback.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={styles.stickySectionText}>{_that.state.userInfo['nickname']}</Text>
                                <TouchableWithoutFeedback onPress={()=>{_that.bianji()}}>
                                    <View>
                                        <Text style={{fontSize:14,marginRight:8}}>{isSelf ? "编辑" : ""}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                        renderFixedHeader={()=>(
                            <View key="fixed-header" style={styles.fixedSection}>
                                <TouchableWithoutFeedback onPress={()=>_that.pressBack()}>
                                    <View style={{flex:1}}>
                                        <CachedImage style={{width:15,height:15,marginLeft:8,tintColor:'#ffffff'}} source={require('../../assets/icon/iconback.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>{_that.bianji()}}>
                                    <View>
                                        <Text style={{color:'#ffffff',fontSize:14,marginRight:8}}>{isSelf ? "编辑" : ""}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                    >
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
                            <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0,padding:8}}>
                                <FlatList
                                    renderItem={this.renderRow}
                                    data={this.state.dongtai}
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    ListFooterComponent={Blank}
                                    ListHeaderComponent={Blank}
                                    ListEmptyComponent={BlankDongtai}
                                />
                            </List>
                        </LazyloadScrollView>

                    </ParallaxScrollView>
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
export default connect(select)(PersonalHome);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    p:{
        color:'#666',
        fontSize:12,
        marginBottom:3
    },
    b:{
        color:'#333'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#f8f8f8'
    },
    stickySectionText: {
        fontSize: 14,
        textAlign:'center',
        flex:1
    },
    fixedSection: {
        flexDirection:'row',
        alignItems:'center',
    },
    fixedSectionText: {
        fontSize: 14,
        color:'#ffffff',
        marginRight:8
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop:50
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 12,
        paddingVertical: 5,
        paddingLeft:8,
        paddingRight:8
    },
});