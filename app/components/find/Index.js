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
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import { List} from 'react-native-elements';
import {getHuodongAction,getQuanziAction,getHuodongByUseridAction} from '../../actions/userAction';
import HuodongItem from './HuodongItem';
import QuanziItem from './QuanziItem';
import {LazyloadScrollView, LazyloadView, LazyloadImage} from '../common/lazyload';


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
        this.lazyloadName = "lazyload-huodongList";//懒加载的name
    }
    //获取活动
    componentDidMount(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        try{
            //活动
            let huodongList = realmObj.objects("Huodong");
            //获取圈子
            let quanziList = realmObj.objects("Quanzi");
            //我已经报名的活动
            let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+userid);
            this.setState({
                huodong:huodongList.sorted('id',true),
                quanzi:quanziList,
                baoming:baoming,
            });
        }catch(e){
            console.log(e);
        }finally {
            this.props.dispatch(getHuodongAction(this.state.currentHuodongPage,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
            this.props.dispatch(getQuanziAction(1,"",1,(totalPage)=>{this._loadQuanziComplete(totalPage)}));
            this.props.dispatch(getHuodongByUseridAction(userid,1));
        }
    }
    //网络请求加载完成
    _loadHuodongComplete(totalPage){
        try{
            let contentList = realmObj.objects("Huodong");
            if(contentList.length >= 0){
                contentList = contentList.sorted('id',true);
                let page = this.state.currentHuodongPage;
                this.setState({
                    huodong:contentList,
                    currentHuodongPage:page + 1,
                    loadHuodongFinish:page >= totalPage,
                    loading:false,
                });
            }
        }catch(e){}
    }
    _loadQuanziComplete(totalPage){
        try{
            let contentList = realmObj.objects("Quanzi");
            if(contentList.length >= 0){
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
        <HuodongItem name={this.lazyloadName} baoming={this.state.baoming} item={item} {...this.props}/>
    );
    renderQuanziRow = ({item}) => (
        <QuanziItem item={item} {...this.props}/>
    );
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
                            <Image style={styles.quanziMore} source={require('../../assets/icon/icongengduo3.png')}/>
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
                    />
                </List>
            </LazyloadScrollView>
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
    },
    quanziText:{
        fontSize:12,
        marginTop:8
    },
});