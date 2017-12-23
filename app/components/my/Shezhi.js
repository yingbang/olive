import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    Button,
    FlatList,
    Alert
} from 'react-native';
//公共头部
import {connect} from 'react-redux';
import { Card, List, ListItem, Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {toastShort} from '../common/ToastTool';
import {logout} from '../../actions/loginAction';

const contentList = [
    {
        key:0,
        title: '账户资料',
        action:"shezhi_ziliao",
    },
    {
        key:1,
        title: '消息通知设置',
        action:"shezhi_xiaoxi",
    },
    {
        key:2,
        title: '隐私',
        action:"shezhi_yinsi",
    },
    {
        key:3,
        title: '意见反馈',
        action:"shezhi_yijian",
    },
    {
        key:4,
        title: '给橄榄枝评分',
        action:"shezhi_pingfen",
    },
    {
        key:5,
        title: '邀请好友使用',
        action:"shezhi_yaoqing",
    },
    {
        key:6,
        title: '关于橄榄枝',
        isDivider:true,
        action:"shezhi_guanyu",
    },
    {
        key:7,
        title: '退出登录',
        action:"shezhi_tuichu",
        isDivider:true,
        hideChevron:true,
        titleStyle:{color:'red'},
        titleContainerStyle:{alignItems:'center'}
    },
]

export class Shezhi extends Component{
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '设置'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    onClick(tag) {
        let TargetComponent;
        switch (tag) {
            case 'shezhi_ziliao':
                TargetComponent = 'ZiLiao';
                break;
            case 'shezhi_xiaoxi':
                TargetComponent = '';
                toastShort("暂未开放此功能！");
                break;
            case 'shezhi_yinsi':
                TargetComponent = '';
                toastShort("暂未开放此功能！");
                break;
            case 'shezhi_yijian':
                TargetComponent = 'YiJianFanKui';
                break;
            case 'shezhi_pingfen':
                TargetComponent = '';
                toastShort("暂未开放此功能！");
                break;
            case 'shezhi_yaoqing':
                TargetComponent = 'ContactsList';
                break;
            case 'shezhi_guanyu':
                TargetComponent = 'AboutUs';
                break;
            case 'shezhi_tuichu':
                let _that = this;
                Alert.alert(
                    "您确定要退出登录吗？",
                    "",
                    [
                        {text: '取消', onPress: ()=>{}},
                        {text: '确定', onPress: ()=>{
                            //删除登录状态
                            try{
                                realmObj.write(()=>{
                                    let userid = realmObj.objects('Global').filtered("key == 'currentUserId'");
                                    let userMobile = realmObj.objects('Global').filtered("key == 'currentUserMobile'");
                                    realmObj.delete(userid);
                                    realmObj.delete(userMobile);
                                    realmObj.delete(realmObj.objects("Global").filtered("key == 'guanzhuTotal'"));
                                    realmObj.delete(realmObj.objects("Global").filtered("key == 'fensiTotal'"));
                                    realmObj.delete(realmObj.objects("Global").filtered("key == 'dongtaiTotal'"));
                                    realmObj.delete(realmObj.objects("User"));
                                    realmObj.delete(realmObj.objects("HiddenUser"));
                                    realmObj.delete(realmObj.objects("JoinCompany"));
                                    realmObj.delete(realmObj.objects("FollowUser"));
                                    realmObj.delete(realmObj.objects("Fensi"));
                                    realmObj.delete(realmObj.objects("ZanDongtai"));
                                    realmObj.delete(realmObj.objects("Cang"));
                                    realmObj.delete(realmObj.objects("HuodongBaoming"));
                                    realmObj.delete(realmObj.objects("Tongxunlu"));
                                    //realmObj.deleteAll();//清空
                                });
                            }catch(e){}
                            _that.props.dispatch(logout());
                        }}
                    ],
                    {cancelable: true}
                );
                break;
        }
        if (TargetComponent) {
            //跳转页面
            this.props.navigation.navigate(TargetComponent);
        }
    }

    renderRow = ({item}) => (
        <ListItem
            title={item.title}
            containerStyle={[globalStyle.listItem,{marginTop:item.isDivider ? 8 : 0}]}
            hideChevron={item.hideChevron}
            titleContainerStyle={item.titleContainerStyle}
            titleStyle={item.titleStyle}
            onPress={()=>{this.onClick(item.action)}}
        />
    );
    render(){
        return (
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <List containerStyle={[globalStyle.listContainer,colors.bgF8]}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={contentList}
                    />
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
});

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(Shezhi);