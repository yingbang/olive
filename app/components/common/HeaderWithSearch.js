/**
 * 点击搜索框会跳转到搜索页面
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
import { SearchBar } from 'react-native-elements';
import Colors from './Colors';

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
        //点击后让它失去焦点，要不会一直往搜索页跳
        this.search.blur();
        this.props.navigation.navigate("Search");
        //嵌套的时候可能需要使用下面的方法，这里暂时不需要，用的话只需加个if判断即可
        //this.props.screenProps.navigation.navigate("Search");
    }
    render(){
        return (
            <View style={styles.container}>
                <SearchBar
                    ref={(search)=>{this.search=search}}
                    lightTheme
                    onChangeText={()=>{}}
                    containerStyle={styles.searchContainer}
                    inputStyle={Colors.bgF2}
                    placeholderTextColor={'#aaa'}
                    onFocus={()=>{this.goSearch()}}
                    placeholder='搜索公益圈 文章' />
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