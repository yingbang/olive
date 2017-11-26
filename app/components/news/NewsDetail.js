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
import { Header, Icon} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import {getNewsInfoByIdAction} from '../../actions/newsAction';
import {cangDongtaiAction} from '../../actions/userAction';
import UShare from '../common/UShare';

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
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                rightComponent={<View style={globalStyle.flexRow}>
                    <Icon style={styles.icon} onPress={()=>{HeaderProps.scene.route.params.collect()}} name={HeaderProps.scene.route.params.isCollect ? "star" : "star-o"} type="font-awesome"/>
                    <Icon style={styles.icon} onPress={()=>{HeaderProps.scene.route.params.share()}} name="share-alt" type="font-awesome"/>
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
            let item = realmObj.objects("NewsData").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    title:item[0]['title'],
                    content:item[0]['content'],
                    intro:item[0]['intro'],
                    pic:item[0]['pic'],
                    isCollect:item[0]['shoucang'] === 1
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getNewsInfoByIdAction(this.state.id,this._loadNewsComplete));
            //设置收藏和分享
            this.props.navigation.setParams({isCollect:this.state.isCollect,collect:()=>{this._collect()}, share:()=>{this._share()}});
        }
    }
    //获取新闻内容完毕
    _loadNewsComplete = ()=>{
        try{
            let item = realmObj.objects("NewsData").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
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
    _loadCangComplete(){
        let status = !this.state.isCollect;
        this.setState({
            isCollect:status
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.title}</Text>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <HTMLView
                        value={this.state.content}
                        stylesheet={styles}
                        renderNode={renderNode}
                        addLineBreaks={false}
                        onLinkPress={(url) => {this.props.navigation.navigate("ShowUrl",{url:url})}}
                    />
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
    htmlContainer:{
        padding:8,
        paddingTop:0
    },
    p:{
        marginBottom:8
    },
    div:{
        marginBottom:8
    },
    icon:{
        marginLeft:10
    }
});