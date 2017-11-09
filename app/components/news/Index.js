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
    Platform
} from 'react-native';
import {
    List,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import {getNewsListAction,getMoreNewsListAction} from '../../actions/newsAction';
import * as common from '../common/public';

export default class NewsIndex extends Component{

    constructor(props){
        super(props);
        this.state={
            currentPage:2,
            isFinished:false,
            loading:false,
            data:[]
        }
    }
    //组件加载完成
    componentDidMount() {
        //从realm中读取数据，如果没有内容，则发送action请求网络数据，收到数据以后，先保存到realm数据库，然后执行回调函数，重新读取realm
        try{
            let newsList = realmObj.objects("News");
            if(newsList.length > 0){
                newsList = newsList.sorted([['flags',true],['id',true]]);
                this.setState({
                    data:newsList
                });
            }else{
                this.setState({
                    loading:true
                });
                this.props.dispatch(getNewsListAction(this._loadComplete.bind(this)));
            }
        }catch(e){
            console.log(e);
        }
    }
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadComplete(){
        try{
            let newsList = realmObj.objects("News");
            if(newsList.length > 0){
                newsList = newsList.sorted([['flags',true],['id',true]]);
                this.setState({
                    data:newsList,
                    loading:false
                });
            }
        }catch(e){}
    }
    //上拉加载更多
    _endReached = (info)=>{
        if(!this.state.isFinished){
            if(this.props.newsReducer.isFinished === true){
                this.setState({
                    isFinished:true
                });
                return;
            }
            this.props.dispatch(getMoreNewsListAction(this.state.currentPage,this._loadComplete.bind(this)));
            //增加页数
            this.setState({
                currentPage:this.state.currentPage + 1
            });
        }
    };
    //下拉刷新成功之后
    _refreshComplete(){
        this.setState({
            loading:false
        });
    }
    //下拉刷新
    _refresh = ()=>{
        this.props.dispatch(getMoreNewsListAction(1,this._refreshComplete.bind(this)));
        //重置页数
        this.setState({
            currentPage:2,
            isFinished:false,
        });
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
            <Thumbnail square style={styles.thumb} source={!!item.pic ? {uri:item.pic} : require('../../assets/mock_data/1.jpg')} />
        </ListItem>
    );
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    render(){
        return (
            <FlatList
                renderItem={this.renderRow}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                refreshing={this.state.loading}
                onRefresh={this._refresh.bind(this)}
                onEndReached={this._endReached.bind(this)}
                onEndReachedThreshold={0.2}
            />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
