/**
 * 点击搜索框会跳转到搜索页面，只是用View模拟搜索框
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform
} from 'react-native';
import { SearchBar,Icon } from 'react-native-elements';
import Colors from './Colors';
import normalizeSize from './normalizeSize';

export default class HeaderWithSearch extends Component{
    constructor(props){
        super(props);
    }
    /**
     * 点击扫描按钮，跳转到新页面打开摄像头
     */
    pressScan(){
        this.props.navigation.navigate("CameraPage")
    }
    goSearch(){
        this.props.navigation.navigate("Search");
        //嵌套的时候可能需要使用下面的方法，这里暂时不需要，用的话只需加个if判断即可
        //this.props.screenProps.navigation.navigate("Search");
    }
    render(){
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>this.goSearch()}>
                <View style={styles.searchView}>
                    <Icon
                        size={16}
                        style={[styles.icon, styles.searchIcon]}
                        name={'search'}
                        color={'#aaaaaa'}
                    />
                    <Text style={styles.searchText}>搜索公益圈 文章</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.pressScan()}>
                    <Image source={require('../../assets/icon/iconscan.png')} style={styles.scanImage}/>
                </TouchableWithoutFeedback >
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingTop:(Platform.OS === 'ios') ? 26 : 0,
        alignItems:'center',
        paddingRight:10
    },
    searchView:{
        flex:1,
        paddingLeft: 26,
        paddingRight: 19,
        margin: 8,
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#f2f2f2',
        flexDirection:'row',
        alignItems:'center',
        height: 40,
        ...Platform.select({
            ios: {
                height: 30,
            },
            android: {
                borderWidth: 0,
            },
        }),
    },
    icon: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 8.5,
        ...Platform.select({
            android: {
                top: 13,
            },
        }),
    },
    searchIcon: {
        left: 10,
    },
    searchText:{
        color:'#aaaaaa',
        fontSize: normalizeSize(14),
        marginLeft:4
    },
    searchContainer:{
        backgroundColor:'#fff',
        borderBottomWidth:0,
        borderTopWidth:0,
        flex:1
    },
    scanImage:{
        height:20,
        width:20
    },
});