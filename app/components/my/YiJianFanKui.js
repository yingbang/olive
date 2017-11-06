import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
} from 'react-native';
//公共头部
import { Card, List, ListItem, Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

export default class YiJianFanKui extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '意见反馈'}}
                backgroundColor="#ffffff"
            />
        }
    };
    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.inputView,{height:80}]}>
                    <TextInput
                        placeholder="手机号或QQ号（必填）"
                        placeholderTextColor={"#999999"}
                        underlineColorAndroid={"#ffffff"}
                        style={[styles.textInputStyle,{height:40}]}
                        autoFocus={false}
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        clearTextOnFocus={true}
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
                <View style={[styles.inputView,{height:180}]}>
                    <TextInput
                        placeholder="问题描述（选填）"
                        placeholderTextColor={"#999999"}
                        underlineColorAndroid={"#ffffff"}
                        style={[styles.textInputStyle,{height:140}]}
                        autoFocus={false}
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        clearTextOnFocus={true}
                        multiline={true}
                        enablesReturnKeyAutomatically={true}
                        textAlignVertical="top"
                    />
                </View>
                <View>
                    <Text style={styles.button}>提交</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    inputView:{
        backgroundColor: '#ffffff',
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    },
    textInputStyle:{
        fontSize:12,
        flex:1,
    },
    button:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:50,
        paddingRight:50,
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        borderRadius:20,
        backgroundColor:'#00bfff',
        color:'#ffffff',
        justifyContent:'center',
        alignSelf:'center',
    },
});