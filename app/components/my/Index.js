/**
 * 我的
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    ScrollView,
    Easing,
    PanResponder,
    TouchableWithoutFeedback,
    FlatList,
    Platform
} from 'react-native';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {formatTime,isExpired,getFullPath} from '../common/public';
import { List, ListItem, Header } from 'react-native-elements';
import {getDongtaiAction,getFollowUserAction,getFensiAction,getUserInfoByIdAction} from '../../actions/userAction';

export default class MyIndex extends Component{
    constructor(props) {
        super(props);
        this.userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value || 0;
        this.state={
            userid:this.userid,
            userInfo:{},//我的信息
            guanzhu:0,//关注人数
            fensi:0,//粉丝数
            dongtai:0,//我发布的动态条数
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
            huodong:realmObj.objects("HuodongBaoming").filtered("userid=="+this.userid).length,//公益活动次数
            back:false,//用于返回时更新界面
        };
        this.timer = null;
        this.list = [
            {
                key:0,
                name: '公益活动',
                icon: 'feather',
                iconType:'entypo',
                subtitle: '最近参加公益'+this.state.huodong+'次',
                nav:'my_gongyi'
            },
            {
                key:1,
                name: '我的组织',
                icon: 'group',
                iconType:'font-awesome',
                nav:'my_zuzhi',
                isDivider:true
            },
            {
                key:2,
                name: '我的荣誉勋章',
                icon: 'trophy',
                iconType:'font-awesome',
                nav:'my_rongyu'
            },
            {
                key:3,
                name: '我的公益活动',
                icon: 'gift',
                iconType:'font-awesome',
                nav:'my_huodong'
            },
            {
                key:4,
                name: '我的收藏',
                icon: 'star',
                nav:'my_shoucang'
            },
            {
                key:5,
                name: '订单',
                icon: 'reorder',
                iconType:'font-awesome',
                nav:'my_dingdan',
                isDivider:true
            },
            {
                key:6,
                name: '意见反馈',
                icon: 'notification',
                iconType:'entypo',
                nav:'my_yijian',
                isDivider:true
            },
            {
                key:7,
                name: '设置',
                icon: 'cog',
                iconType:'font-awesome',
                nav:'my_shezhi',
                isDivider:true
            },
        ];
    }

    componentDidMount(){
        try{
            //个人信息
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let userInfo = realmObj.objects("User").filtered("id=="+userid);
            //关注人数
            let guanzhu = realmObj.objects("Global").filtered("key == 'guanzhuTotal'");
            //粉丝
            let fensi = realmObj.objects("Global").filtered("key == 'fensiTotal'");
            //动态数量
            let dongtai = realmObj.objects("Global").filtered("key == 'dongtaiTotal'");
            this.setState({
                userid:userid,
                userInfo:userInfo.length > 0 ? userInfo[0] : {},
                guanzhu:guanzhu.length > 0 ? guanzhu[0].value : 0,
                fensi:fensi.length > 0 ? fensi[0].value : 0,
                dongtai:dongtai.length > 0 ? dongtai[0].value : 0,
            });
        }catch(e){
            console.log(e);
        }finally {
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            this.props.dispatch(getUserInfoByIdAction(userid));
            this.props.dispatch(getFollowUserAction(1,()=>{this.loadComplete()}));
            this.props.dispatch(getFensiAction(1,()=>{this.loadComplete()}));
            this.props.dispatch(getDongtaiAction(userid,1,()=>{this.loadComplete()}));
            let _that = this;
            this.timer = setInterval(()=>{
                _that.loadComplete();
            },2000);
        }
    }
    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
    loadComplete(){
        //关注人数
        let guanzhu = realmObj.objects("Global").filtered("key == 'guanzhuTotal'");
        //粉丝
        let fensi = realmObj.objects("Global").filtered("key == 'fensiTotal'");
        //动态数量
        let dongtai = realmObj.objects("Global").filtered("key == 'dongtaiTotal'");
        this.setState({
            guanzhu:guanzhu.length > 0 ? guanzhu[0].value : 0,
            fensi:fensi.length > 0 ? fensi[0].value : 0,
            dongtai:dongtai.length > 0 ? dongtai[0].value : 0,
        });
    }

    renderRow = ({item}) => (
        <ListItem
            key={item.key}
            title={item.name}
            subtitle={item.subtitle}
            leftIcon={{name: item.icon,color:'#00bfff',size:18,type:item.iconType ? item.iconType : ''}}
            onPress={()=>{this.onClick(item.nav)}}
            containerStyle={[globalStyle.listItem,{marginTop:item.isDivider ? 8 : 0}]}
            {...this.props}
        />
    );

    onClick(tag,params) {
        let TargetComponent;
        switch (tag) {
            case 'my_xiaoxi':
                TargetComponent = 'XiaoXi';
                break;
            case 'my_ziliao':
                TargetComponent = 'ZiLiao';
                params = {back:()=>{this.setState({back:!this.state.back})}}
                break;
            case 'my_guanzhu':
                TargetComponent = 'GuanZhu';
                break;
            case 'my_fensi':
                TargetComponent = 'Fensi';
                break;
            case 'my_dongtai':
                TargetComponent = 'PersonalHome';
                break;
            case 'my_zuzhi':
                TargetComponent = 'ZuZhi';
                break;
            case 'my_rongyu':
                TargetComponent = 'RongYu';
                break;
            case 'my_gongyi':
            case 'my_huodong':
                TargetComponent = 'GongYi';
                break;
            case 'my_shoucang':
                TargetComponent = 'ShouCang';
                break;
            case 'my_dingdan':
                TargetComponent = 'DingDan';
                break;
            case 'my_yijian':
                TargetComponent = 'YiJianFanKui';
                break;
            case 'my_shezhi':
                TargetComponent = 'SheZhi';
                break;
        }
        if (TargetComponent) {
            //跳转页面
            this.props.navigation.navigate(TargetComponent,params);
        }
    }

    render(){
        return (
            <ScrollView style={[styles.container]} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                <Header
                    rightComponent={<TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('XiaoXi')}}>
                        <View style={styles.header}>
                            <Image source={require('../../assets/icon/iconmessage.png')} style={styles.image} />
                        </View>
                    </TouchableWithoutFeedback>}
                    backgroundColor="#ffffff"
                    outerContainerStyles={{borderBottomWidth:0,paddingBottom:0,height:(Platform.OS === 'ios') ? 50 : 30}}
                />

                <TouchableWithoutFeedback onPress={()=>{this.onClick('my_ziliao')}}>
                    <View style={styles.baseInfo}>
                        {
                            (this.state.userInfo['avatar'] !== "") ?
                                <Image style={globalStyle.defaultAvatarImage} source={{uri:getFullPath(this.state.userInfo['avatar'],this.state.host)}}/>
                                :
                                <Image style={globalStyle.defaultAvatar} source={require('../../assets/icon/iconhead.png')}/>
                        }
                        <View style={{flex:1}}>
                            <Text>{this.state.userInfo['nickname']}</Text>
                        </View>
                        <Image source={require('../../assets/icon/icongo.png')} style={styles.more}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.otherInfo}>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_guanzhu')}}>
                        <View style={styles.otherInfoItem}>
                            <Text>{this.state.guanzhu}</Text>
                            <Text style={styles.otherInfoItemText}>关注</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_fensi')}}>
                        <View style={styles.otherInfoItem}>
                            <Text>{this.state.fensi}</Text>
                            <Text style={styles.otherInfoItemText}>粉丝</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_dongtai',{id:this.state.userid})}}>
                        <View style={styles.otherInfoItem}>
                            <Text>{this.state.dongtai}</Text>
                            <Text style={styles.otherInfoItemText}>动态</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <List containerStyle={[globalStyle.listContainer,colors.bgF8]}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.list}
                        extraData={this.state}
                    />
                </List>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f8f8f8',
    },
    header:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingRight:10,
        backgroundColor:'#ffffff',
    },

    image:{
        width:25,
        height:25,
    },
    more:{
        width:15,
        height:15,
        tintColor:'#999999'
    },
    baseInfo:{
        paddingLeft:8,
        paddingRight:8,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#f8f8f8',
        paddingBottom:15,
        paddingTop:10,
        backgroundColor:'#ffffff',
    },
    otherInfo:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#ffffff',
        marginBottom:8,
    },
    otherInfoItem:{
        flex:1,
        alignItems:'center',
    },
    otherInfoItemText:{
        fontSize:12,
        color:'#999999'
    },
    infoImage:{
        width:60,
        height:60,
        borderRadius:30,
    },
    imageTip:{
        backgroundColor:'#ff4343',
        position:'absolute',
        top:3,
        right:5,
        width:14,
        height:14,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    tipText:{
        fontSize:10,
        color:'#ffffff'
    },
});


