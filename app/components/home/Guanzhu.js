/**
 * 首页：关注
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
    FlatList,
    RefreshControl,
    Platform,
} from 'react-native';
import {List} from 'react-native-elements';
import {getDongtaiAction,zanDongtaiAction} from '../../actions/userAction';
import DongtaiItem from '../common/DongtaiItem';
import {LazyloadScrollView, LazyloadView, LazyloadImage} from '../common/lazyload';

export default class Guanzhu extends Component{

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
            zanDongtaiList:[],//点赞过的列表
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
            userid:'1',//管理员
        };
        this.lazyloadName = "lazyload-guanzhulist";//懒加载的name
    }

    //动态项
    renderRow = ({item}) => (
        <DongtaiItem name={this.lazyloadName} item={item} zan={this.state.zanDongtaiList} {...this.props}/>
    );
    //点赞、取消点赞
    zanDongtai(id,type){
        this.props.screenProps.dispatch(zanDongtaiAction(id,type,()=>{this._loadZanDongtaiComplete()}));
    }
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;

    //获取动态
    componentDidMount(){
        try{
            //动态
            let dongtaiList = realmObj.objects("Dongtai").filtered("guanzhu = 1");
            //点赞列表
            let zanDongtaiList = realmObj.objects("ZanDongtai");
            this.setState({
                dongtai:dongtaiList.length >= 0 ? dongtaiList.sorted('id',true) : [],
                zanDongtaiList:zanDongtaiList.length >= 0 ? zanDongtaiList : [],
            });
        }catch(e){
            console.log(e);
        }finally {
            this.props.screenProps.dispatch(getDongtaiAction(this.state.userid,this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
        }
    }
    //网络请求加载完成
    _loadDongtaiComplete(totalPage){
        try{
            let contentList = realmObj.objects("Dongtai").filtered("guanzhu = 1");
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
                this.props.screenProps.dispatch(getDongtaiAction(this.state.userid,this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.screenProps.dispatch(getDongtaiAction(this.state.userid,1,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
    };
    render(){
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
                <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0,padding:(Platform.OS === 'ios') ? 0 : 8}}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.dongtai}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                    />
                </List>
            </LazyloadScrollView>
        );
    }
}

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
    }
});