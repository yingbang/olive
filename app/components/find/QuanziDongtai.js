/**
 * 圈子主页：圈子动态
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
import HTMLView from 'react-native-htmlview';
import {List,Header,Icon} from 'react-native-elements';
import {getDateTimeDiff,inArray,getFullPath} from '../common/public';
import globalStyle from '../common/GlobalStyle';
import {toastShort} from '../common/ToastTool';
import Blank from '../common/Blank';
import BlankQuanzi from '../common/BlankQuanzi';
import {getDongtaiAction,getQuanziInfoByIdAction,zanDongtaiAction} from '../../actions/userAction';
import ImageRange from '../common/ImageRange';

const window = Dimensions.get('window');
const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 40;

class QuanziDongtai extends Component{

    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: HeaderProps.scene.route.params.title}}
                rightComponent={{ icon: 'gear',type:'font-awesome', onPress:()=>{HeaderProps.scene.route.params.goDetail()} }}
                backgroundColor="#ffffff"
            />
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            dongtai:[],
            currentDongtaiPage:1,
            loadDongtaiFinish:false,
            loading:false,
            id:this.props.navigation.state.params.id,//圈子ID
            quanziInfo:[],//圈子信息
            zanDongtaiList:[],//点赞过的动态列表，用于判断是否点赞
            join:false,
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
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
        }catch(e){}
    }
    //动态项
    renderRow = ({item}) => (
        <View style={{marginBottom:15}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                <View>
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
                            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                                <Image style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconpinglun.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{UShare.share('你好', '分享内容', '','',()=>{},()=>{})}}>
                                <Image style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconfenxiang.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={()=>{}}>
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
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;

    //获取动态
    componentDidMount(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        try{
            //动态
            let dongtaiList = realmObj.objects("Dongtai").filtered("quanzi = " + this.state.id);
            if(dongtaiList.length > 0){
                dongtaiList = dongtaiList.sorted('id',true);
                this.setState({
                    dongtai:dongtaiList
                });
            }
            //圈子信息
            let quanziInfo = realmObj.objects("Quanzi").filtered("id = " + this.state.id);
            if(quanziInfo.length > 0){
                this.setState({
                    quanziInfo:quanziInfo[0]
                });
                this.props.navigation.setParams({title:quanziInfo[0]['title']});
            }
            //是否已经加入圈子，没加入不能发布动态
            let join = realmObj.objects("QuanziUser").filtered("userid == "+userid+" and quanzi == "+this.state.id);
            if(join !== null && join.length > 0){
                this.setState({
                    join:true,
                });
            }
            //获取作者点赞过的动态列表
            let zanDongtaiList = realmObj.objects("ZanDongtai");
            if(zanDongtaiList.length > 0){
                this.setState({
                    zanDongtaiList:zanDongtaiList
                });
            }
        }catch(e){
            console.log(e);
        }finally {
            //this.props.dispatch(getDongtaiAction(this.state.userid,this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            this.props.dispatch(getQuanziInfoByIdAction(this.state.id,this._loadQuanziComplete));//圈子详情
            this.props.navigation.setParams({goDetail:()=>{this._goDetail()}});
        }
    }
    _goDetail(){
        this.props.navigation.navigate("QuanziDetail",{id:this.state.id});
    }
    //网络请求加载完成
    _loadDongtaiComplete(totalPage){
        try{
            let contentList = realmObj.objects("Dongtai").filtered("quanzi = " + this.state.id);
            if(contentList.length > 0){
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
    _loadQuanziComplete = ()=>{
        try{
            let item = realmObj.objects("Quanzi").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    quanziInfo:item[0],
                });
                this.props.navigation.setParams({title:item[0]['title']});
            }
        }catch(e){}
    };
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadDongtaiFinish === false){
                this.props.dispatch(getDongtaiAction("",this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getDongtaiAction("",1,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
    };
    //发布动态：先判断是否已经加入圈子
    fabu(){
        if(this.state.join === false){
            toastShort("您还没加入圈子，不能发布动态！");
            return false;
        }
        this.props.navigation.navigate("PublishEdit",{quanzi:this.state.id});
    }
    render(){
        return (
            <View style={{ flex: 1 }}>
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
                    <TouchableWithoutFeedback onPress={()=>{this._goDetail()}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                        {
                            this.state.quanziInfo['pic'] !== "" ?
                                <Image style={globalStyle.defaultAvatarImage} source={{uri:getFullPath(this.state.quanziInfo['pic'],this.state.host)}}/>
                                :
                                <Image style={globalStyle.defaultAvatar} source={require('../../assets/icon/iconhead.png')}/>
                        }
                        <View>
                            <Text style={{fontSize:16,marginBottom:5}}>{this.state.quanziInfo['title']}</Text>
                            <Text>成员{this.state.quanziInfo['number']}</Text>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={{marginTop:20,marginBottom:20}}>
                        <HTMLView
                            value={this.state.quanziInfo['content']}
                            stylesheet={styles}
                            addLineBreaks={false}
                            onLinkPress={(url) => {this.props.navigation.navigate("ShowUrl",{url:url})}}
                        />
                    </View>
                    <View style={{borderBottomWidth:1,borderTopWidth:1,borderColor:'#f2f2f2',paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                        <TouchableWithoutFeedback onPress={()=>{this.fabu()}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='edit' type='font-awesome' color='#00bfff' size={20} style={{marginRight:10}} />
                            <Text>发布</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0,padding:(Platform.OS === 'ios') ? 0 : 8}}>
                        <FlatList
                            renderItem={this.renderRow}
                            data={this.state.dongtai}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            ListFooterComponent={Blank}
                            ListHeaderComponent={Blank}
                            ListEmptyComponent={BlankQuanzi}
                        />
                    </List>
                </ScrollView>
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
export default connect(select)(QuanziDongtai);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding:8
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
        paddingVertical: 5
    },
});