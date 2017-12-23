import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    Button,
    FlatList,
    RefreshControl,
    Platform
} from 'react-native';
//公共头部
import {connect} from 'react-redux';
import { Card, List, ListItem, Header} from 'react-native-elements';
import {getNoticeAction} from '../../actions/toolAction';
import globalStyle from '../common/GlobalStyle';
import {formatTime,removeHTMLTag} from '../common/public';
import HTMLView from 'react-native-htmlview';

class XiaoXi extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '我的消息'}}
                rightComponent={<Text onPress={()=>{HeaderProps.navigation.navigate("ContactsList");}}>联系人</Text>}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            isFinished:false,
            loading:false,
            data:[],
            zhushou:[],
            laba:[],
            zhushouHasNew:0,//是否有新消息
            labaHasNew:0,//是否有新消息
        }
    }
    //组件加载完成
    componentDidMount() {
        //从realm中读取数据，如果没有内容，则发送action请求网络数据，收到数据以后，先保存到realm数据库，然后执行回调函数，重新读取realm
        try{
            //默认为0
            let oldZhushouNumber = 0;
            let oldLabaNumber = 0;
            //普通公告
            let contentList = realmObj.objects("Notice").filtered("type == 0");
            //小助手
            let zhushouList = realmObj.objects("Notice").filtered("type == 1");
            let oldZhushou = realmObj.objects("Global").filtered("key == 'lastZhushouNumber'");
            if(oldZhushou && oldZhushou.length > 0){
                oldZhushouNumber = parseInt(oldZhushou[0].value);
            }
            //小喇叭
            let labaList = realmObj.objects("Notice").filtered("type == 2");
            let oldLaba = realmObj.objects("Global").filtered("key == 'lastLabaNumber'");
            if(oldLaba && oldLaba.length > 0){
                oldLabaNumber = parseInt(oldLaba[0].value);
            }
            this.setState({
                data:contentList,
                zhushou:zhushouList,
                laba:labaList,
                zhushouHasNew:zhushouList.length - oldZhushouNumber > 0 ? zhushouList.length - oldZhushouNumber : 0,
                labaHasNew:labaList.length - oldLabaNumber > 0 ? labaList.length - oldLabaNumber : 0,
            });
        }catch(e){
            console.log(e);
        }finally{
            this.props.dispatch(getNoticeAction(this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
        }
    }
    //更新消息条数，用来指示是否已读
    _hasReadZhushou(){
        realmObj.write(()=>{
            realmObj.create("Global",{key:"lastZhushouNumber",value:""+this.state.zhushou.length},true);
            this.setState({
                zhushouHasNew:0
            });
        });
    }
    _hasReadLaba(){
        realmObj.write(()=>{
            realmObj.create("Global",{key:"lastLabaNumber",value:""+this.state.laba.length},true);
            this.setState({
                labaHasNew:0
            });
        });
    }
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getNoticeAction(1,(totalPage)=>{this._loadComplete(totalPage)}));
    };
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.isFinished === false){
                this.props.dispatch(getNoticeAction(this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
            }
        }
    };
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadComplete(totalPage){
        try{
            //普通公告
            let contentList = realmObj.objects("Notice").filtered("type == 0");
            if(contentList.length >= 0){
                let page = this.state.currentPage;
                this.setState({
                    data:contentList,
                    currentPage:page + 1,
                    isFinished:page >= totalPage,
                    loading:false
                });
            }
        }catch(e){}
    }
    _keyExtractor = (item, index) => item.id;
    _renderRow = ({item}) => (
        <ListItem
            roundAvatar
            hideChevron
            title={item.title}
            subtitle={item.content ? removeHTMLTag(item.content)+" " : null}
            subtitleContainerStyle={(Platform.OS === 'ios') ? {} : {height:15,overflow:'hidden'}}
            avatar={item['avatar'] ? {uri:getFullPath(item['avatar'],this.state.host)} : <Image style={[globalStyle.defaultAvatar,{width:40,height:40,borderRadius:20}]} source={require('../../assets/icon/iconhead.png')}/>}
            avatarStyle={styles.avatar}
            rightTitle={formatTime(item.dateline,"MM-dd")}
            containerStyle={[globalStyle.listItem,{marginTop:item.isDivider ? 8 : 0}]}
            onPress={()=>{this.props.navigation.navigate("NoticeDetail",{id:item.id})}}
        />
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
                <List containerStyle={globalStyle.listContainer}>
                    <ListItem
                        title={"橄榄枝小助手"}
                        badge={{ value: this.state.zhushouHasNew, textStyle: { color: '#ffffff' },
                            containerStyle: { marginTop:8,backgroundColor:(this.state.zhushouHasNew > 0) ? '#ff4343' : '#ffffff' } }}
                        avatar={<View style={{width:40,height:40,borderRadius:20,backgroundColor:"#00bfff",marginRight:10,alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:26,height:26,tintColor:'#ffffff'}} source={require('../../assets/icon/iconcase.png')}/></View>}
                        containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        onPress={()=>{this._hasReadZhushou();this.props.navigation.navigate("XiaoxiDetail",{type:1,data:this.state.zhushou})}}
                    />
                    <ListItem
                        title={"橄榄枝小喇叭"}
                        badge={{ value: this.state.labaHasNew, textStyle: { color: '#ffffff' },
                            containerStyle: { marginTop:8,backgroundColor:(this.state.labaHasNew > 0) ? '#ff4343' : '#ffffff' } }}
                        avatar={<View style={{width:40,height:40,borderRadius:20,backgroundColor:"#00bfff",marginRight:10,alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:20,height:20,tintColor:'#ffffff'}} source={require('../../assets/icon/iconlaba.png')}/></View>}
                        containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        onPress={()=>{this._hasReadLaba();this.props.navigation.navigate("XiaoxiDetail",{type:2,data:this.state.laba})}}
                    />
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderRow}
                    />
                </List>
            </ScrollView>
        );
    }
}

function select(state) {
    const {userReducer,toolReducer} = state;
    return {
        userReducer,toolReducer
    }
}
export default connect(select)(XiaoXi);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    avatar:{
        width:40,
        height:40,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        color: 'grey'
    },
    p:{
        fontSize:14,
    },
    div:{
        fontSize:14,
    },
});