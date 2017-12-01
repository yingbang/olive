/**
 * 资讯：使用Realm保存数据
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    Text,
    Platform,
    ScrollView,
    RefreshControl,
    InteractionManager
} from 'react-native';
import {
    List,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import {formatTime,isExpired,getFullPath} from '../common/public';
import BlankContent from '../common/BlankContent';
import {getNewsListAction} from '../../actions/newsAction';

export default class NewsIndex extends Component{

    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            isFinished:false,
            loading:false,
            data:[],
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        }
    }
    //组件加载完成
    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            //从realm中读取数据，如果没有内容，则发送action请求网络数据，收到数据以后，先保存到realm数据库，然后执行回调函数，重新读取realm
            try{
                let newsList = realmObj.objects("News");
                if(newsList.length > 0){
                    newsList = newsList.sorted([['flags',true],['id',true]]);
                    this.setState({
                        data:newsList
                    });
                }
            }catch(e){
                console.log(e);
            }finally{
                this.props.dispatch(getNewsListAction(this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
            }
        });
    }
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadComplete(totalPage){
        try{
            let newsList = realmObj.objects("News");
            if(newsList.length > 0){
                newsList = newsList.sorted([['flags',true],['id',true]]);
                let page = this.state.currentPage;
                this.setState({
                    data:newsList,
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
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getNewsListAction(1,(totalPage)=>{this._loadComplete(totalPage)}));
    };
    //文章属性
    _flags = (flagStr)=>{
        if(!flagStr || flagStr === null || flagStr === undefined) return;
        let flagArr = flagStr.split(",");
        if(!flagArr) return;
        let flagText = ['推荐','热点','头条','精选','幻灯'];
        return (
            flagArr.map(function(item){
                return (
                    <Text key={item} style={[styles.bottomText,styles.textBorder]}>{flagText[item-1]}</Text>
                );
            })
        )
    };
    //橄榄枝推荐
    _leftTop = (str)=>{
        if(!str || str === null || str === undefined) return;
        return (
            <Text style={styles.leftTop}>{str}</Text>
        );
    };
    //渲染每一行样式
    renderRow = ({item}) => (
        <ListItem style={{marginLeft:0}} onPress={()=>{this.props.navigation.navigate("NewsDetail",{id:item.id})}}>
            <Body>
            <View style={styles.cell_container}>
                <View style={styles.itemLeft}>
                    {this._leftTop(item.author)}
                    <Text style={styles.leftMiddle}>{item.title}</Text>
                    <View style={styles.leftBottom}>
                        {this._flags(item.flags)}
                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_views.png')}/>
                        <Text style={styles.bottomText}>{item.views}</Text>
                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_pinglun.png')}/>
                        <Text style={styles.bottomText}>{item.comments}</Text>
                    </View>
                </View>
            </View>
            </Body>
            <Thumbnail square style={styles.thumb} source={!!item.pic ? {uri:getFullPath(item.pic,this.state.host)} : require('../../assets/images/nopic1.jpg')} />
        </ListItem>
    );
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.isFinished === false){
                this.props.dispatch(getNewsListAction(this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
            }
        }
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
                        showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            >
                <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0,flex:1}}>
                <FlatList
                    renderItem={this.renderRow}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={BlankContent}
                />
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    cell_container:{
        flex:1,
        flexDirection:'row',
    },
    itemLeft:{
        flex:1,
        paddingLeft:10,
    },
    leftTop:{
        fontSize:12,
        color:'#00BFFF',
        marginBottom:8
    },
    leftMiddle:{
        fontSize:14,
        color:'#333333',
        marginBottom:8,
        flex:1
    },
    leftBottom:{
        flexDirection:'row',
        alignItems:'center'
    },
    textBorder:{
        borderWidth:1,
        borderColor:'#ff4343',
        padding:3,
        paddingRight:1,
        color:'#ff4343',
    },
    bottomText:{
        fontSize:10,
        marginRight:10
    },
    bottomImage:{
        width:12,
        height:12,
        marginRight:2,
        tintColor:'#aaaaaa'
    },
    thumb:{
        width:100,
        height:100,
        marginLeft:20
    }
});
