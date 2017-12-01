/**
 * 圈子详情页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
//公共头部
import HTMLView from 'react-native-htmlview';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import { Card, List, ListItem, Button,Header} from 'react-native-elements';
import {formatTime,isExpired,getFullPath,removeHTMLTag} from '../common/public';
import globalStyle from '../common/GlobalStyle';
import {toastShort} from '../common/ToastTool';
import {getQuanziInfoByIdAction,getQuanziJoinInfoAction,getQuanziUserAction,QuanziJoinAction} from '../../actions/userAction';

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

class QuanziDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            quanzi:{},
            join:false,
            users:[],//圈子成员
            currentPage:1,
            isFinished:false,
            loading:false,
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '圈子详情'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    //组件加载完成以后，获取活动内容
    componentDidMount(){
        //先从realm中读取数据，如果有，直接显示，否则发送action请求网络数据
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        try{
            //圈子详情
            let item = realmObj.objects("Quanzi").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    quanzi:item[0],
                });
            }
            //是否已经加入
            let join = realmObj.objects("QuanziUser").filtered("userid == "+userid+" and quanzi == "+this.state.id);
            if(join !== null && join.length > 0){
                this.setState({
                    join:true,
                });
            }
            //圈子成员
            let contentList = realmObj.objects("QuanziUser").filtered("quanzi == "+this.state.id);
            if(contentList.length > 0){
                let page = this.state.currentPage;
                this.setState({
                    users:contentList,
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getQuanziInfoByIdAction(this.state.id,this._loadQuanziComplete));//圈子详情
            this.props.dispatch(getQuanziJoinInfoAction(userid,this.state.id,this._loadJoinComplete));//是否加入
            this.props.dispatch(getQuanziUserAction(this.state.id,this.state.currentPage,(totalPage)=>{this._loadUserComplete(totalPage)}));//圈子所有成员
        }
    }
    //获取活动内容完毕
    _loadQuanziComplete = ()=>{
        try{
            let item = realmObj.objects("Quanzi").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    quanzi:item[0],
                });
            }
        }catch(e){}
    };
    _loadJoinComplete = ()=>{
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let join = realmObj.objects("QuanziUser").filtered("userid == "+userid+" and quanzi == "+this.state.id);
        if(join !== null && join.length > 0){
            this.setState({
                join:true,
            });
        }else{
            this.setState({
                join:false,
            });
        }
    };
    _loadUserComplete(totalPage){
        try{
            let contentList = realmObj.objects("QuanziUser").filtered("quanzi == "+this.state.id);
            if(contentList.length > 0){
                let page = this.state.currentPage;
                this.setState({
                    users:contentList,
                    currentPage:page + 1,
                    isFinished:page >= totalPage,
                    loading:false
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
            if(this.state.isFinished === false){
                this.props.dispatch(getQuanziUserAction(this.state.id,this.state.currentPage,(totalPage)=>{this._loadUserComplete(totalPage)}));
            }
        }
    };
    //加入或退出圈子
    joinQuanzi(type){
        this.props.dispatch(QuanziJoinAction(type,this.state.id,(result)=>{this._loadJoinQuanziComplete(result)}));
    }
    _loadJoinQuanziComplete(result){
        if(result.state === 'fail'){
            toastShort("操作失败！");
        }else{
            toastShort("操作成功！");
        }
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        this.props.dispatch(getQuanziJoinInfoAction(userid,this.state.id,this._loadJoinComplete));//是否加入
    }
    _keyExtractor = (item, index) => item.id;
    renderRow = ({item}) => (
        <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("PersonalHome",{id:item['userid']})}}>
            <View style={styles.quanziView}>
                <Image style={styles.quanziImage} source={item['avatar'] ? {uri:getFullPath(item['avatar'],this.state.host)} : require('../../assets/icon/iconhead.png')}/>
                <Text>{item['name']}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
    render(){
        let item = this.state.quanzi;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.htmlContainer}
                    onMomentumScrollEnd = {this._contentViewScroll}
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                >
                    <List containerStyle={[globalStyle.listContainer,colors.bgF8]}>
                        <ListItem
                            title={"圈子头像"}
                            rightIcon={<Image style={{width:60,height:60,borderRadius:30}} source={item['pic'] ? {uri:getFullPath(item['pic'],this.state.host)} : require('../../assets/icon/iconhead.png')} />}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        />
                        <ListItem
                            title={"圈子名称"}
                            rightTitle={item.title}
                            rightIcon={{name: 'chevron-right'}}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        />
                        <ListItem
                            title={"圈子简介"}
                            rightTitle={item.intro}
                            rightIcon={{name: 'chevron-right'}}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        />
                        <ListItem
                            title={"圈子公告"}
                            rightTitle={removeHTMLTag(item.content)+" "}
                            rightIcon={{name: 'chevron-right'}}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        />
                        <ListItem
                            title={"圈子二维码"}
                            rightIcon={<Image style={{width:40,height:40,tintColor:'#bdc6cf'}} source={item['erweima'] ? {uri:getFullPath(item['erweima'],this.state.host)} : require('../../assets/images/erweima.png')} />}
                            containerStyle={[globalStyle.listItem,{marginTop:0}]}
                        />
                        <ListItem
                            title={"圈子成员"}
                            hideChevron={true}
                            rightTitle={item.number+"人"}
                            containerStyle={[globalStyle.listItem,{marginTop:8}]}
                        />
                    </List>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.users}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                    />
                </ScrollView>
                <View style={styles.baoming}>
                    <Button
                        backgroundColor={this.state.join ? '#e60000' : '#03A9F4'}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={this.state.join ? ()=>{this.joinQuanzi(0)} : () => {this.joinQuanzi(1)}}
                        title={this.state.join ? '退出圈子' : '申请加入'} />
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
export default connect(select)(QuanziDetail);

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
    },
    quanziView:{
        marginLeft:10,
        marginBottom:8,
        flexDirection:'row',
        paddingBottom:8,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        alignItems:'center'
    },
    quanziImage:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10,
    },
    quanziUser:{
        marginTop:10,
        marginBottom:20,
        paddingLeft:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
    },
    baoming:{
        paddingTop:8,
        paddingBottom:8,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2'
    }
});