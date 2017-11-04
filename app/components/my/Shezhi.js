import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    Button
} from 'react-native';
//公共头部
import MyTop from './MyTop';

export default class Shezhi extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <MyTop title="设置" {...HeaderProps}/>
        }
    };
    onClick(tag) {
        let TargetComponent;
        const { navigation } = this.props;
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
            navigation.navigate(TargetComponent);
        }
    }
    _getItem(callBack, text, hasLine, tintStyle, expandableIco){
        return (
            <TouchableWithoutFeedback
                onPress={callBack}>
                <View style={[styles.setting_item_container,hasLine ? {borderBottomColor:'#f8f8f8',borderBottomWidth:1,} : {}]}>
                    <View style={{flex:1,marginLeft:8}}>
                        <Text style={{fontSize:12}}>{text}</Text>
                    </View>
                    <Image source={expandableIco ? expandableIco : require('../../assets/icon/icongo.png')}
                           style={[{
                               height: 15,
                               width: 15,
                               tintColor:'#999999'
                           }, tintStyle]}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    getItem(tag, text, hasLine) {
        return this._getItem(()=>this.onClick(tag), text, hasLine,null,null);
    }
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.block}>
                        {this.getItem('shezhi_ziliao', '账户资料',true)}
                        {this.getItem('shezhi_xiaoxi', '消息通知设置',true)}
                        {this.getItem('shezhi_yinsi', '隐私',true)}
                        {this.getItem('shezhi_yijian', '意见反馈',true)}
                        {this.getItem('shezhi_pingfen', '给橄榄枝评分',true)}
                        {this.getItem('shezhi_yaoqing', '邀请好友使用')}
                    </View>
                    <View style={styles.block}>
                        {this.getItem('shezhi_guanyu', '关于橄榄枝')}
                    </View>
                    <View style={styles.block}>
                        <TouchableWithoutFeedback>
                            <View style={{justifyContent:'center',alignItems:'center',padding:8}}>
                                <Text style={{color:'#ff4343'}}>退出登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    setting_item_container: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        height:40,
    },
    block:{
        marginTop:10,
        backgroundColor:'#ffffff'
    },
});