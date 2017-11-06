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
        title: '头像',
        rTitle:' ',
        avatar:"https://imgsa.baidu.com/news/q%3D100/sign=24c56caafc03918fd1d139ca613c264b/3b87e950352ac65c57da5d39f0f2b21192138a98.jpg",
    },
    {
        key:1,
        title: '名字',
        rTitle:'颜子轩',
    },
    {
        key:2,
        title: '公司',
        rTitle:'阿里巴巴',
    },
    {
        key:3,
        title: '职务',
        rTitle:'CEO',
    },
    {
        key:4,
        title: '手机',
        rTitle:'15958746214',
        isDivider:true,
    },
    {
        key:5,
        title: '邮箱',
        rTitle:'25478412@qq.com',
    },
    {
        key:6,
        title: '城市',
        rTitle:'山东青岛',
    },
    {
        key:7,
        title: '座右铭',
        rTitle:" ",
    },
    {
        key:8,
        title: '认证',
        rTitle:" ",
    },
]

export default class ZiLiao extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '个人资料'}}
                rightComponent={{icon:'qrcode',type:"font-awesome"}}
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
            rightTitle={item.rTitle}
            rightIcon={item.avatar ? <Image source={{uri:item.avatar}} style={{width:20,height:20}} /> : {name: 'chevron-right'}}
            containerStyle={[globalStyle.listItem,{marginTop:item.isDivider ? 8 : 0}]}
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