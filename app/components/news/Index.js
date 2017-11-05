/**
 * 资讯
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
    Container,
    Content,
    Button,
    Item,
    Input,
    Label,
    List,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';

const list = [
    {
        key:0,
        name: '20次公益',
        icon: 'feather',
        iconType:'entypo',
        subtitle: '最近参加公益5次',
        nav:'GongYi'
    },
    {
        key:1,
        name: '我的组织',
        icon: 'group',
        iconType:'font-awesome',
        nav:'ZuZhi',
        isDivider:true
    },
    {
        key:2,
        name: '我的荣誉勋章',
        icon: 'trophy',
        iconType:'font-awesome',
        nav:'ZuZhi'
    },
    {
        key:3,
        name: '我的公益活动',
        icon: 'gift',
        iconType:'font-awesome',
        nav:'ZuZhi'
    },
    {
        key:4,
        name: '我的收藏',
        icon: 'star',
        nav:'ZuZhi'
    },
    {
        key:5,
        name: '订单',
        icon: 'reorder',
        iconType:'font-awesome',
        nav:'ZuZhi',
        isDivider:true
    },
    {
        key:6,
        name: '意见反馈',
        icon: 'notification',
        iconType:'entypo',
        nav:'ZuZhi',
        isDivider:true
    },
    {
        key:7,
        name: '设置',
        icon: 'cog',
        iconType:'font-awesome',
        nav:'SheZhi',
        isDivider:true
    },
];

export default class NewsIndex extends Component{

    constructor(props){
        super(props);
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

    renderRow = ({item}) => (
        <ListItem style={{marginLeft:0}}>
            <Body>
            <View style={styles.cell_container}>
                <View style={styles.itemLeft}>
                    <Text style={styles.leftTop}>橄榄枝推荐</Text>
                    <Text style={styles.leftMiddle}>新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题</Text>
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
    )

    render(){
        return (
            <Container>
                <Content>
                    <List>
                        <FlatList
                            renderItem={this.renderRow}
                            data={list}
                        />
                    </List>
                </Content>
            </Container>
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
