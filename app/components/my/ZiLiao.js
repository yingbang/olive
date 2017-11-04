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

export default class ZiLiao extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <MyTop title="个人资料" {...HeaderProps}/>
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
    _getItem(callBack, text, rightText, hasLine, tintStyle, expandableIco){
        return (
            <TouchableWithoutFeedback
                onPress={callBack}>
                <View style={[styles.setting_item_container,hasLine ? {borderBottomColor:'#f8f8f8',borderBottomWidth:1,} : {}]}>
                    <View style={{flex:1,marginLeft:8}}>
                        <Text style={{fontSize:12}}>{text}</Text>
                    </View>
                    <View style={{flex:1,marginLeft:8}}>
                        <Text style={{fontSize:12,textAlign:'right'}}>{rightText}</Text>
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
                        <TouchableWithoutFeedback>
                            <View style={[styles.setting_item_container,{borderBottomColor:'#f8f8f8',borderBottomWidth:1}]}>
                                <View style={{flex:1,marginLeft:8}}>
                                    <Text style={{fontSize:12}}>头像</Text>
                                </View>
                                <View style={{marginLeft:8}}>
                                    <Image style={{width:20,height:20,borderRadius:10}} source={require('../../test/mock_data/1.jpg')}/>
                                </View>
                                <Image source={require('../../assets/icon/icongo.png')}
                                       style={[{
                                           height: 15,
                                           width: 15,
                                           tintColor:'#999999'
                                       }]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        {this.getItem('shezhi_xiaoxi', '名字','刘德华',true)}
                        {this.getItem('shezhi_yinsi', '公司','香港国际电影公司',true)}
                        {this.getItem('shezhi_yijian', '职务','艺术总监')}
                    </View>
                    <View style={styles.block}>
                        {this.getItem('shezhi_yinsi', '手机','13954787547',true)}
                        {this.getItem('shezhi_yinsi', '邮箱','11554@qq.com',true)}
                        {this.getItem('shezhi_yinsi', '城市','山东 青岛',true)}
                        {this.getItem('shezhi_yinsi', '座右铭',true)}
                        {this.getItem('shezhi_guanyu', '认证')}
                    </View>
                    <View style={styles.block}>
                        <TouchableWithoutFeedback>
                            <View style={{justifyContent:'center',alignItems:'center',padding:8}}>
                                <Text style={{color:'#ff4343'}}>返回我的主页</Text>
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