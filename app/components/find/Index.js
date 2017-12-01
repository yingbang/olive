/**
 * 发现
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
    FlatList,
    RefreshControl,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import { Card, List, ListItem, Button} from 'react-native-elements';
import {formatTime,isExpired,getFullPath,inArray} from '../common/public';
import {getHuodongAction,getQuanziAction,getHuodongByUseridAction} from '../../actions/userAction';
const {width} = Dimensions.get("window");
import BlankContent from '../common/BlankContent';

class FindIndex extends Component{
    constructor(props) {
        super(props);

        this.state = {
            huodong:[],
            quanzi:[],
            baoming:[],//我的报名列表
            currentHuodongPage:1,
            loadHuodongFinish:false,
            loading:false,
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }

    //获取活动
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            try{
                //活动
                let huodongList = realmObj.objects("Huodong");
                if(huodongList.length > 0){
                    huodongList = huodongList.sorted('id',true);
                    this.setState({
                        huodong:huodongList
                    });
                }
                //获取圈子
                let quanziList = realmObj.objects("Quanzi");
                if(quanziList.length > 0){
                    this.setState({
                        quanzi:quanziList,
                    });
                }
                //我已经报名的活动
                let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+userid);
                if(baoming !== null && baoming.length > 0){
                    this.setState({
                        baoming:baoming,
                    });
                }
            }catch(e){
                console.log(e);
            }finally {
                this.props.dispatch(getHuodongAction(this.state.currentHuodongPage,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
                this.props.dispatch(getQuanziAction(1,"",1,(totalPage)=>{this._loadQuanziComplete(totalPage)}));
                this.props.dispatch(getHuodongByUseridAction(userid,1));
            }
        });
    }
    //网络请求加载完成
    _loadHuodongComplete(totalPage){
        try{
            let contentList = realmObj.objects("Huodong");
            if(contentList.length > 0){
                contentList = contentList.sorted('id',true);
                let page = this.state.currentHuodongPage;
                this.setState({
                    huodong:contentList,
                    currentHuodongPage:page + 1,
                    loadHuodongFinish:page >= totalPage,
                    loading:false,
                });
            }else{
                this.setState({
                    loading:false,
                });
            }
        }catch(e){}
    }
    _loadQuanziComplete(totalPage){
        try{
            let contentList = realmObj.objects("Quanzi");
            if(contentList.length > 0){
                this.setState({
                    quanzi:contentList,
                });
            }
        }catch(e){}
    }
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadHuodongFinish === false){
                this.props.dispatch(getHuodongAction(this.state.currentHuodongPage,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getHuodongAction(1,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
    };
    //在上面遮罩了一层透明的，这样就可以点击了
    renderRow = ({item}) => (
        <Card containerStyle={{marginLeft:8,marginRight:8,marginTop:10}} image={item['pic'] ? {uri:getFullPath(item['pic'],this.state.host)} : require('../../assets/images/nopic1.jpg')}>
            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("HuodongDetail",{id:item.id})}}>
                <View style={{height:150,width:width-18,flex:1,backgroundColor:"transparent",position:'absolute',top:-150,left:0}}>
                    <Text> </Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("HuodongDetail",{id:item.id})}}>
                <View>
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:8,overflow:'hidden'}}>
                        {item['name'] ? "" :
                            <Text style={{
                                color: '#fff',
                                fontSize: 14,
                                backgroundColor: '#00bfff',
                                paddingTop: 3,
                                paddingBottom: 3,
                                paddingLeft: 8,
                                paddingRight: 8,
                                borderRadius: 10,
                                marginRight: 8
                            }}>官方</Text>
                        }
                        <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                    </View>
                    <Text style={{marginBottom: 10,fontSize:14,color:'#555555'}}>{item['intro']}</Text>
                    <View style={styles.huodongItemTime}>
                        <Image style={styles.huodongItemTimeImage} source={require('../../assets/icon/icontime.png')}/>
                        <Text style={{flex:1,fontSize:12}}>{formatTime(item['starttime'],"MM月dd日 周w hh:mm")}</Text>
                        <Text style={{fontSize:12}}>已有<Text style={{color:'#00bfff'}}>{item['number']}</Text>人报名</Text>
                    </View>
                    <View style={styles.baoming}>
                        <View style={styles.author}>
                            <Image style={{width:30,height:30,marginRight:5}} source={require('../../assets/icon/iconguan.png')}/>
                            <Text style={[colors.cBlue,styles.name]}>{item['name'] ? item['name'] : '官方'}</Text>
                            <Text>发布了该活动</Text>
                            <Image style={[styles.huodongItemTimeImage,{marginLeft:8}]} source={require('../../assets/icon/iconaddress.png')}/>
                            <Text>{item['city']}</Text>
                        </View>
                        <View>
                            {
                                isExpired(item['jiezhitime']) ?
                                    <Button
                                        backgroundColor='#dddddd'
                                        color='#666666'
                                        buttonStyle={{padding:8,borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                        containerViewStyle={{marginLeft:0,marginRight:0}}
                                        title={isExpired(item['endtime']) ? '活动已结束' : '报名已截止'} /> :
                                    <Button
                                        backgroundColor={inArray(this.state.baoming,item['id'],'huodongid') ? '#e60000' : "#03A9F4"}
                                        buttonStyle={{padding:8,borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                        containerViewStyle={{marginLeft:0,marginRight:0}}
                                        onPress={() => {this.props.navigation.navigate("HuodongBaoMing",{id:item['id']})}}
                                        title={inArray(this.state.baoming,item['id'],'huodongid') ? '您已报名' : '我要报名'} />
                            }
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Card>
    );
    renderQuanziRow = ({item}) => (
        <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("QuanziDongtai",{id:item['id']})}}>
            <View style={styles.quanziView}>
                {
                    item['pic'] ?
                        <Image style={[globalStyle.defaultAvatarImage,styles.quanziImage]} source={{uri:getFullPath(item['pic'],this.state.host)}}/>
                        :
                        <Image style={[globalStyle.defaultAvatar,styles.quanziImage]} source={require('../../assets/icon/iconhead.png')}/>
                }
                <Text style={styles.quanziText}>{item['title']}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
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
                <View style={styles.quanziContainer}>
                    <FlatList
                        renderItem={this.renderQuanziRow}
                        data={this.state.quanzi}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{flex:1}}
                    />
                    <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("Quanzi")}}>
                        <View style={styles.quanziView}>
                            <Image style={styles.quanziMore} source={require('../../assets/icon/icongengduo.png')}/>
                            <Text style={styles.quanziText}>所有圈子</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <List containerStyle={[globalStyle.listContainer,colors.bgF8]}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.huodong}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={BlankContent}
                    />
                </List>
            </ScrollView>
        );
    }
}

function select(state) {
    const {userReducer} = state;
    return {
        userReducer
    }
}
export default connect(select)(FindIndex);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    quanziContainer:{
        backgroundColor:'#ffffff',
        paddingBottom:8,
        paddingRight:8,
        flexDirection:'row'
    },
    quanziView:{
        alignItems:'center',
        marginLeft:8
    },
    quanziImage:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:0
    },
    quanziMore:{
        width:40,
        height:40,
        borderRadius:20,
        alignSelf:'center',
        tintColor:'#aaaaaa'
    },
    quanziText:{
        fontSize:12,
        marginTop:8
    },
    huodongItemTitle:{
        fontSize:16,
        color:'#333333',
    },
    huodongItemTime:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    huodongItemTimeImage:{
        width:18,
        height:18,
        marginRight:3
    },
    baoming:{
        flexDirection:'row',
        alignItems:'center'
    },
    author:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        marginRight:5
    }
});