/**
 * 动态详情
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import { Header} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import {getDateTimeDiff} from '../common/public';
import {getZanAction,getPinglunAction,getZanDongtaiAction} from '../../actions/userAction';

class DongTaiDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            dongtaiId:this.props.navigation.state.params.id,//动态ID
            dongtai:{},//动态内容
            pinglun:[],//评论列表
            zan:[],//点赞列表
            currentPinglunPage:1,//当前的页码
            loadPinglunFinish:false,//评论是否获取完毕
            loading:false,//下拉刷新显示
        }
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '动态详情'}}
                rightComponent={{ icon: 'more-horiz'}}
                backgroundColor="#ffffff"
            />
        }
    };
    componentDidMount(){
        try{
            //获取动态内容
            let dongtai = realmObj.objects("Dongtai").filtered("id = " + this.state.dongtaiId);
            if(dongtai.length > 0){
                this.setState({
                    dongtai:dongtai[0]
                });
            }
            //获取点赞列表
            let zan = realmObj.objects("Zan").filtered("contentid = " + this.state.dongtaiId).slice(0, 6);
            if(zan.length > 0){
                this.setState({
                    zan:zan
                });
            }
            //获取评论列表
            let pinglun = realmObj.objects("Pinglun").filtered("type = 1 and contentid = " + this.state.dongtaiId);
            if(pinglun.length > 0){
                this.setState({
                    pinglun:pinglun
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getZanAction(this.state.dongtaiId,1,this._loadZanComplete));
            this.props.dispatch(getPinglunAction(this.state.dongtaiId,this.state.currentPinglunPage,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
        }
    }
    //获取点赞列表完毕
    _loadZanComplete = ()=>{
        try{
            let zan = realmObj.objects("Zan").filtered("contentid = " + this.state.dongtaiId).slice(0, 6);
            if(zan.length > 0){
                this.setState({
                    zan:zan
                });
            }
        }catch(e){}
    };
    //获取评论列表完毕
    _loadPinglunComplete(totalPage){
        try{
            let contentList = realmObj.objects("Pinglun").filtered("type = 1 and contentid = " + this.state.dongtaiId);
            if(contentList.length > 0){
                let page = this.state.currentPinglunPage;
                this.setState({
                    pinglun:contentList,
                    currentPinglunPage:page + 1,
                    loadPinglunFinish:page >= totalPage,
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
            if(this.state.loadPinglunFinish === false){
                this.props.dispatch(getPinglunAction(this.state.dongtaiId,this.state.currentPinglunPage,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getPinglunAction(this.state.dongtaiId,1,(totalPage)=>{this._loadPinglunComplete(totalPage)}));
    };
    //评论项
    renderRow = ({item}) => (
        <View style={{paddingTop:8,paddingBottom:8,borderBottomWidth:1,borderBottomColor:'#f8f8f8'}}>
            <View style={{flexDirection:'row'}}>
                <Image style={{width:30,height:30,borderRadius:15,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                <View style={{flex:1}}>
                    <Text style={{fontSize:12}}>{item['name']}</Text>
                    <Text style={{fontSize:10}}>{getDateTimeDiff(item['dateline'])}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback>
                        <Image style={{width:15,height:15,marginRight:15}} source={require('../../assets/icon/iconhuifu.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={{flexDirection:'row'}}>
                            <Image style={{width:15,height:15,marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                            <Text style={{fontSize:10}}>4</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{marginLeft:30,marginTop:8}}>
                <Text style={{fontSize:12}}>{item['content']}</Text>
            </View>
        </View>
    );
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    render(){
        const {dongtai} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}
                            onMomentumScrollEnd = {this._contentViewScroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loading}
                                    onRefresh={this._refresh.bind(this)}
                                />
                            }
                >
                    <View style={styles.block}>
                        <View>
                            <View style={{flexDirection:'row',marginBottom:20,marginTop:12}}>
                                <Image style={{width:40,height:40,borderRadius:20,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                                <View>
                                    <Text>{dongtai['name']}</Text>
                                    <Text style={{color:'#999999',fontSize:12}}>{getDateTimeDiff(dongtai['dateline'])}</Text>
                                </View>
                            </View>
                            <View style={{marginBottom:20}}>
                                <Text>{dongtai['content']}</Text>
                            </View>
                            <View>
                                {
                                    dongtai['zan'] > 0 ?
                                        <View style={{marginBottom:15,borderBottomWidth:1,borderBottomColor:'#f8f8f8',paddingBottom:15}}>
                                            <Text style={{fontSize:14,color:'#666',marginBottom:10,marginTop:15}}>{dongtai['zan']}人赞了</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} horizontal={true}>
                                                    {
                                                        this.state.zan.map((item,i)=>{
                                                            return (
                                                                <TouchableWithoutFeedback key={i} onPress={()=>{this.props.navigation.navigate("PersonalHome",{id:item['userid']})}}>
                                                                    <Image style={{width:40,height:40,borderRadius:20,marginRight:20}} source={require('../../assets/mock_data/1.jpg')}/>
                                                                </TouchableWithoutFeedback>
                                                            );
                                                        })
                                                    }
                                                </ScrollView>
                                                <TouchableWithoutFeedback>
                                                    <Image style={{width:40,height:40}} source={require('../../assets/icon/icongengduo.png')}/>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        : <View style={{marginBottom:15,borderBottomWidth:1,borderBottomColor:'#f8f8f8',paddingBottom:15}}></View>
                                }

                                {
                                    dongtai['pinglun'] > 0 ?
                                        <View>
                                            <Text style={{marginBottom:8,fontSize:14}}>{dongtai['pinglun']}条评论</Text>
                                            <FlatList
                                                renderItem={this.renderRow}
                                                data={this.state.pinglun}
                                                extraData={this.state}
                                                keyExtractor={this._keyExtractor}
                                            />
                                        </View>
                                        :
                                         <View>
                                            <Text style={{marginBottom:8,fontSize:14}}>评论</Text>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{marginTop:30}}>还没有人评论过，不如你来抢沙发</Text>
                                            </View>
                                         </View>
                                }

                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:80}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity style={{flex:1,height:40}}>
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder="评论"
                                    underlineColorAndroid={"#f2f2f2"}
                                    style={styles.textInputStyle}
                                    clearButtonMode="while-editing"
                                    clearTextOnFocus={true}
                                    enablesReturnKeyAutomatically={true}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSubmitComment()}>
                            <Text style={styles.cancelText}>发表</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',borderTopColor:'#f8f8f8',borderTopWidth:1,height:30}}>
                        <TouchableWithoutFeedback onPress={()=>{alert('赞')}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                <Text style={{fontSize:12}}>赞</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{alert('分享')}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconfenxiang.png')}/>
                                <Text style={{fontSize:12}}>分享</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{alert('收藏')}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconshoucang.png')}/>
                                <Text style={{fontSize:12}}>收藏</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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
export default connect(select)(DongTaiDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8,
        flex:1,
    },
    inputView:{
        flex:1,
        height: 40,
        //设置圆角程度
        borderRadius: 6,
        //设置边框的颜色
        borderColor: '#f2f2f2',
        backgroundColor:'#f2f2f2',
        //设置边框的宽度
        borderWidth: 1,
        //内边距
        paddingLeft: 5,
        paddingRight: 5,
        //外边距
        marginRight: 8,
        marginLeft:8,
        marginBottom:8,
        //设置相对父控件居中
        alignSelf: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    textInputStyle:{
        height:40,
        fontSize:12,
        flex:1,
    },
    cancelText:{
        color:'#00BFFF',
        marginRight:8
    },
});