/**
 * 我的收藏：文章
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
import {getCangAction} from '../../../actions/userAction';
import {getNewsInfoByIdAction} from '../../../actions/newsAction';
const {width} = Dimensions.get("window");
import BlankShoucang from '../../common/BlankShoucang';

class WenZhang extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content:[],
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
            //已经收藏的内容
            let cang = realmObj.objects("Cang").filtered("type == 0 and userid == "+this.state.userid);
            if(cang !== null && cang.length > 0){
                let contentArr = [];
                for(let i=0;i<cang.length;i++){
                    //文章
                    let contentList = realmObj.objects("News").filtered("id == "+cang[i]['contentid']);
                    if(contentList.length > 0){
                        contentArr.push(contentList[0]);
                    }else{
                        //如果文章不存在：比如以前收藏过，后来卸载了，然后本地就没有了
                        this.props.dispatch(getNewsInfoByIdAction(cang[i]['contentid']));
                    }
                }
                this.setState({
                    content:contentArr
                });
            }
        }catch(e){
            console.log(e);
        }finally {
            this.props.dispatch(getCangAction(0,this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
        }
    }
    //网络请求加载完成
    _loadComplete(totalPage){
        try{
            //已经收藏的内容
            let cang = realmObj.objects("Cang").filtered("type == 0 and userid == "+this.state.userid);
            if(cang !== null && cang.length > 0){
                let contentArr = [];
                for(let i=0;i<cang.length;i++){
                    //文章
                    let contentList = realmObj.objects("News").filtered("id == "+cang[i]['contentid']);
                    if(contentList.length > 0){
                        contentArr.push(contentList[0]);
                    }
                }
                let page = this.state.currentPage;
                this.setState({
                    content:contentArr,
                    currentPage:page + 1,
                    loadFinish:page >= totalPage,
                    loading:false,
                });
            }
        }catch(e){}
    }
    renderRow = ({item}) => (
        <ListItem
            roundAvatar
            avatar={item['pic'] ? {uri:getFullPath(item['pic'],this.state.host)} : require('../../../assets/images/nopic1.jpg')}
            title={item['title']}
            onPress={()=>{this.props.screenProps.navigation.navigate("NewsDetail",{id:item.id})}}
            containerStyle={[globalStyle.listItem,{marginTop:0}]}
        />
    );
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadFinish === false){
                this.props.dispatch(getCangAction(0,this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getCangAction(0,1,(totalPage)=>{this._loadComplete(totalPage)}));
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
                    data={this.state.content}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={BlankShoucang}
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
export default connect(select)(WenZhang);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});