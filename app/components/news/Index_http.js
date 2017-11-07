/**
 * 资讯：纯http获取数据
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    Text,
    Platform,
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

    _flags = (flagStr)=>{
        if(!flagStr) return;
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

    componentDidMount() {
        //1、组件加载完成，发送action开始获取新闻
        this.props.dispatch(getNewsListAction(this._loadComplete.bind(this)));
        this.setState({
            loading:true
        });
    }
    //上拉加载完成以后回调
    _loadComplete(){
        this.setState({
            loading:false,
            data:common.uniqueArray(this.state.data.concat(this.props.newsReducer.data))
        });
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
                currentPage:this.state.currentPage + 1,
                //data:this.props.newsReducer.data
            });
        }
    };
    //下拉刷新成功之后
    _refreshComplete(){
        this.setState({
            loading:false,
            data:common.uniqueArray(this.props.newsReducer.data.concat(this.state.data))
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

    renderRow = ({item}) => (
        <ListItem style={{marginLeft:0}}>
            <Body>
            <View style={styles.cell_container}>
                <View style={styles.itemLeft}>
                    <Text style={styles.leftTop}>橄榄枝推荐</Text>
                    <Text style={styles.leftMiddle}>{item.title}</Text>
                    <View style={styles.leftBottom}>
                        {this._flags('1,3')}
                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_views.png')}/>
                        <Text style={styles.bottomText}>0</Text>
                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_pinglun.png')}/>
                        <Text style={styles.bottomText}>11</Text>
                    </View>
                </View>
            </View>
            </Body>
            <Thumbnail square style={styles.thumb} source={require('../../assets/mock_data/1.jpg')} />
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
