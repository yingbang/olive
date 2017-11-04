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
import MyTop from './MyTop';
import ShouCangTab from './ShouCangTab';

export default class ShouCang extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <MyTop title="我的收藏" {...HeaderProps}/>
        }
    };
    render(){
        return (
            <ShouCangTab screenProps={this.props}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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