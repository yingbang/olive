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
    RefreshControl
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {getDateTimeDiff,inArray} from '../common/public';
import {List} from 'react-native-elements';
import HeaderWithSearch from '../common/HeaderWithSearch';
import {getDongtaiAction,getZanDongtaiAction,zanDongtaiAction} from '../../actions/userAction';

export default class Guanzhu extends Component{

    static navigationOptions = {
        header:<HeaderWithSearch/>
    };

    constructor(props) {
        super(props);

        this.state = {
            dongtai:[],
            currentDongtaiPage:1,
            loadDongtaiFinish:false,
            loading:false,
            userid:'1',//默认是显示管理员，多个用逗号隔开
            zanDongtaiList:[],//点赞过的列表
        };
    }

    //动态项
    renderRow = ({item}) => (
        <View style={{marginBottom:15}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                <View>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Image style={{width:40,height:40,borderRadius:20,marginRight:10}} source={item['avatar'] ? {uri:item['avatar']} : require('../../assets/mock_data/1.jpg')}/>
                        <View>
                            <Text>{item['name']}</Text>
                            <Text style={{color:'#999999',fontSize:12}}>{getDateTimeDiff(item['dateline'])}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{item['content']}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            {
                                inArray(this.state.zanDongtaiList,item['id'],'id') ?
                                    <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],0)}}>
                                        <Image style={{width:15,height:15,tintColor:'#333333',marginRight:15}} source={require('../../assets/icon/iconzan2.png')}/>
                                    </TouchableWithoutFeedback>
                                    :
                                    <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],1)}}>
                                        <Image style={{width:15,height:15,tintColor:'#999999',marginRight:15}} source={require('../../assets/icon/iconzan.png')}/>
                                    </TouchableWithoutFeedback>
                            }
                            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail",{id:item['id']})}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:15}} source={require('../../assets/icon/iconpinglun.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{UShare.share('你好', '分享内容', '','',()=>{},()=>{})}}>
                                <Image style={{width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconfenxiang.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={()=>{}}>
                                <Image style={{width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconmore.png')}/>
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
            if(dongtaiList.length > 0){
                dongtaiList = dongtaiList.sorted('id',true);
                this.setState({
                    dongtai:dongtaiList
                });
            }
            //点赞列表
            let zanDongtaiList = realmObj.objects("ZanDongtai");
            if(zanDongtaiList.length > 0){
                this.setState({
                    zanDongtaiList:zanDongtaiList
                });
            }
        }catch(e){
            console.log(e);
        }finally {
            this.props.screenProps.dispatch(getDongtaiAction(this.state.userid,this.state.currentDongtaiPage,(totalPage)=>{this._loadDongtaiComplete(totalPage)}));
            this.props.screenProps.dispatch(getZanDongtaiAction(1,this._loadZanDongtaiComplete.bind(this)));
        }
    }
    //网络请求加载完成
    _loadDongtaiComplete(totalPage){
        try{
            let contentList = realmObj.objects("Dongtai").filtered("guanzhu = 1");
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
            <ScrollView style={styles.container}
                        onMomentumScrollEnd = {this._contentViewScroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.loading}
                                onRefresh={this._refresh.bind(this)}
                            />
                        }
            >
                <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.dongtai}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                    />
                </List>
            </ScrollView>
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