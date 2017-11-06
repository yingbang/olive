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
    FlatList
} from 'react-native';
//公共头部
import { Card, List, ListItem, Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

const contentList = [
    {
        key:0,
        title: '账户资料',
    },
    {
        key:1,
        title: '消息通知设置',
    },
    {
        key:2,
        title: '隐私',
    },
    {
        key:3,
        title: '意见反馈',
    },
    {
        key:4,
        title: '给橄榄枝评分',
    },
    {
        key:5,
        title: '邀请好友使用',
    },
    {
        key:6,
        title: '关于橄榄枝',
        isDivider:true,
    },
    {
        key:7,
        title: '退出登录',
        isDivider:true,
        hideChevron:true,
        titleStyle:{color:'red'},
        titleContainerStyle:{alignItems:'center'}
    },
]

export default class Shezhi extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '设置'}}
                backgroundColor="#ffffff"
            />
        }
    };
    onClick(tag) {
        let TargetComponent;
        switch (tag) {
            case 'shezhi_ziliao':
                TargetComponent = '';
                break;
            case 'shezhi_xiaoxi':
                TargetComponent = '';
                break;
            case 'shezhi_yinsi':
                TargetComponent = '';
                break;
            case 'shezhi_yijian':
                TargetComponent = 'YiJianFanKui';
                break;
            case 'shezhi_pingfen':
                TargetComponent = '';
                break;
            case 'shezhi_yaoqing':
                TargetComponent = '';
                break;
            case 'shezhi_guanyu':
                TargetComponent = 'Shezhi';
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
        />
    );
    render(){
        return (
            <ScrollView style={styles.container}>
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