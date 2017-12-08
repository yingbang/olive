/**
 * 资讯详情页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
//公共头部
import HTMLView from 'react-native-htmlview';
import { Card,Header, Icon} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import {formatTime,getFullPath} from '../common/public';
import {getNewsInfoByIdAction,setNewViewPlus} from '../../actions/newsAction';
import {cangDongtaiAction} from '../../actions/userAction';
import UShare from '../common/UShare';
import AutoSizedImageMy from '../common/AutoSizedImageMy';

//处理iframe
function renderNode(node, index) {
    if (node.name === 'iframe') {
        return (
            <View key={index} style={{width: 200, height: 200}}>
                <Text>
                    {node.attribs.src}
                </Text>
            </View>
        );
    }
    if (node.name === 'img') {
        let width =
            parseInt(node.attribs['width'], 10) || parseInt(node.attribs['data-width'], 10) || 0;
        let height =
            parseInt(node.attribs['height'], 10) ||
            parseInt(node.attribs['data-height'], 10) ||
            0;
        const imgStyle = {
            width,
            height,
        };

        const source = {
            uri: node.attribs.src,
            width,
            height,
        };
        return <AutoSizedImageMy key={index} source={source} style={imgStyle} />;
    }
}

class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            isCollect:false,
            title:"",
            content:"",
            intro:"",
            pic:"",
            dateline:0,
            views:0,
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                rightComponent={<View style={globalStyle.flexRow}>
                    <Icon style={styles.icon} size={20} color={"#cecece"} onPress={()=>{HeaderProps.scene.route.params.collect()}} name={HeaderProps.scene.route.params.isCollect ? "star" : "star-o"} type="font-awesome"/>
                    <Icon style={styles.icon} size={20} color={"#cecece"} onPress={()=>{HeaderProps.scene.route.params.share()}} name="share-alt" type="font-awesome"/>
                </View>}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    //组件加载完成以后，获取文章内容
    componentDidMount(){
        //先从realm中读取数据，如果有，直接显示，否则发送action请求网络数据
        try{
            let item = realmObj.objects("NewsData").filtered("id == " + this.state.id);
            if(item !== null && item.length >= 0){
                this.setState({
                    title:item[0]['title'],
                    content:item[0]['content'],
                    isCollect:item[0]['shoucang'] === 1,
                });
            }
            let news = realmObj.objects("News").filtered("id == " + this.state.id);
            if(news !== null && news.length >= 0){
                this.setState({
                    title:news[0]['title'],
                    intro:news[0]['intro'],
                    pic:news[0]['pic'],
                    views:news[0]['views'],
                    dateline:news[0]['dateline'],
                });
            }
        }catch(e){}finally{
            //获取新闻详情
            this.props.dispatch(getNewsInfoByIdAction(this.state.id,this._loadNewsComplete));
            //文章阅读数加1
            this.props.dispatch(setNewViewPlus(this.state.id));
            //设置收藏和分享
            this.props.navigation.setParams({isCollect:this.state.isCollect,collect:()=>{this._collect()}, share:()=>{this._share()}});
        }
    }
    //获取新闻内容完毕
    _loadNewsComplete = ()=>{
        try{
            let item = realmObj.objects("NewsData").filtered("id == " + this.state.id);
            if(item !== null && item.length >= 0){
                this.setState({
                    title:item[0]['title'],
                    content:item[0]['content'],
                    intro:item[0]['intro'],
                    pic:item[0]['pic'],
                    isCollect:item[0]['shoucang'] === 1
                });
                //设置收藏和分享
                this.props.navigation.setParams({isCollect:this.state.isCollect});
            }
            let news = realmObj.objects("News").filtered("id == " + this.state.id);
            if(news !== null && news.length >= 0){
                this.setState({
                    title:news[0]['title'],
                    intro:news[0]['intro'],
                    pic:news[0]['pic'],
                    views:news[0]['views'],
                    dateline:news[0]['dateline'],
                });
            }
        }catch(e){}
    };
    //收藏
    _collect(){
        let newState = !this.state.isCollect;
        this.setState({
            isCollect:newState
        });
        this.props.navigation.setParams({isCollect:newState});
        this.shoucang(!newState);
    }
    //分享
    _share(){
        UShare.share(this.state.title,this.state.intro,this.state.pic,this.state.host,()=>{},()=>{});
    }

    //收藏、取消收藏
    shoucang(status){
        let statusNum = status ? 0 : 1;//收藏1、取消收藏0
        this.props.dispatch(cangDongtaiAction(this.state.id,0,statusNum,this._loadCangComplete.bind(this)));
    }
    _loadCangComplete(){}

    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Card containerStyle={{marginLeft:0,marginRight:0,marginTop:10,marginBottom:10}} imageStyle={{height:200}} imageProps={{resizeMode:"stretch"}} image={this.state.pic ? {uri:getFullPath(this.state.pic,this.state.host)} : require('../../assets/images/nopic3.jpg')}>
                        <View>
                            <Text style={styles.newsItemTitle}>{this.state.title}</Text>
                            <View style={styles.newsItemView}>
                                <Text style={{flex:1,fontSize:14}}>发布时间：{formatTime(this.state.dateline,"yyyy/MM/dd hh:mm")}</Text>
                                <Text style={{fontSize:14}}>阅读：{this.state.views}</Text>
                            </View>
                        </View>
                    </Card>
                    <View>
                        <HTMLView
                            value={this.state.content}
                            stylesheet={styles}
                            renderNode={renderNode}
                            addLineBreaks={false}
                            onLinkPress={(url) => {this.props.navigation.navigate("ShowUrl",{url:url})}}
                        />
                    </View>
                </ScrollView>
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
export default connect(select)(NewsDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title:{
        padding:8,
        paddingTop:12,
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16
    },
    newsItemTitle:{
        fontSize:16,
        color:'#333333',
    },
    newsItemView:{
        marginTop:15,
        paddingTop:15,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2',
        flexDirection:'row'
    },
    htmlContainer:{
        padding:8,
        paddingTop:0
    },
    p:{
        marginBottom:8,
        lineHeight:28,
    },
    div:{
        marginBottom:8,
        lineHeight:28,
    },
    icon:{
        marginLeft:10,
    }
});