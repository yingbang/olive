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
            data:[]
        }
    }
    //组件加载完成
    componentDidMount() {
        //从realm中读取数据，如果没有内容，则发送action请求网络数据，收到数据以后，先保存到realm数据库，然后执行回调函数，重新读取realm
        try{
            let contentList = realmObj.objects("Notice");
            if(contentList.length > 0){
                this.setState({
                    data:contentList
                });
            }
        }catch(e){
            console.log(e);
        }finally{
            this.props.dispatch(getNoticeAction(this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
        }
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
            let contentList = realmObj.objects("Notice");
            if(contentList.length > 0){
                let page = this.state.currentPage;
                this.setState({
                    data:contentList,
                    currentPage:page + 1,
                    isFinished:page >= totalPage,
                    loading:false
                });
            }else{
                this.setState({
                    loading:false,
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
            subtitle={removeHTMLTag(item.content)+" "}
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
        height:40
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