/**
 * 我的公益：即将进行
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
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../../common/GlobalStyle';
import colors from '../../common/Colors';
import fonts from '../../common/Fonts';
import { Card, List, ListItem, Button} from 'react-native-elements';
import {formatTime,isExpired,getFullPath} from '../../common/public';
import {getHuodongAction,getHuodongByUseridAction} from '../../../actions/userAction';
const {width} = Dimensions.get("window");
import BlankGongYi from '../../common/BlankGongYi';

class Willcome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            huodong:[],
            currentPage:1,
            loadFinish:false,
            loading:false,
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
            userid:realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value
        };
    }
    //获取活动
    componentDidMount(){
        try{
            //已经报名的活动
            let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+this.state.userid);
            if(baoming !== null && baoming.length > 0){
                let huodongArr = [];
                for(let i=0;i<baoming.length;i++){
                    //活动
                    let huodongList = realmObj.objects("Huodong").filtered("id == "+baoming[i]['huodongid']);
                    if(huodongList.length > 0){
                        //没过期才放入
                        if(isExpired(huodongList[0]['endtime']) === false){
                            huodongArr.push(huodongList[0]);
                        }
                    }
                }
                this.setState({
                    huodong:huodongArr
                });
            }
        }catch(e){
            console.log(e);
        }finally {
            this.props.dispatch(getHuodongByUseridAction(this.state.userid,this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
        }
    }
    //网络请求加载完成
    _loadComplete(totalPage){
        try{
            //已经报名的活动
            let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+this.state.userid);
            if(baoming !== null && baoming.length > 0){
                let huodongArr = [];
                for(let i=0;i<baoming.length;i++){
                    //活动
                    let huodongList = realmObj.objects("Huodong").filtered("id == "+baoming[i]['huodongid']);
                    if(huodongList.length > 0){
                        //没过期才放入
                        if(isExpired(huodongList[0]['endtime']) === false){
                            huodongArr.push(huodongList[0]);
                        }
                    }
                }
                let page = this.state.currentPage;
                this.setState({
                    huodong:huodongArr,
                    currentPage:page + 1,
                    loadFinish:page >= totalPage,
                    loading:false,
                });
            }
        }catch(e){}
    }
    renderRow = ({item}) => (
        <Card containerStyle={{marginLeft:8,marginRight:8,marginTop:10}} image={item['pic'] ? {uri:getFullPath(item['pic'],this.state.host)} : require('../../../assets/images/nopic1.jpg')}>
            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("HuodongDetail",{id:item.id})}}>
                <View style={{height:150,width:width-18,flex:1,backgroundColor:"transparent",position:'absolute',top:-150,left:0}}>
                    <Text> </Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("HuodongDetail",{id:item.id})}}>
                <View>
                    <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                    <Text style={{marginBottom: 10,fontSize:14,color:'#666666'}}>{item['intro']}</Text>
                    <View style={styles.huodongItemTime}>
                        <Image style={styles.huodongItemTimeImage} source={require('../../../assets/icon/icontime.png')}/>
                        <Text style={{flex:1,fontSize:12}}>{formatTime(item['starttime'],"MM月dd日 周w hh:mm")}</Text>
                        <Text style={{fontSize:12}}>已有<Text style={{color:'#00bfff'}}>{item['number']}</Text>人报名</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Card>
    );
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadFinish === false){
                this.props.dispatch(getHuodongByUseridAction(this.state.userid,this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getHuodongByUseridAction(this.state.userid,1,(totalPage)=>{this._loadComplete(totalPage)}));
    };
    _keyExtractor = (item, index) => item.id;
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
                <FlatList
                    renderItem={this.renderRow}
                    data={this.state.huodong}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={BlankGongYi}
                />
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
export default connect(select)(Willcome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    huodongItemTitle:{
        fontSize:16,
        color:'#333333',
        marginBottom:5
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
        flexDirection:'row'
    },
    name:{
        marginRight:5
    }
});