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
     * 点击扫描按钮
     */
    pressScan(){
        alert('扫描二维码');
    }
    render(){
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme
                    onChangeText={()=>{}}
                    containerStyle={styles.searchContainer}
                    inputStyle={Colors.bgF2}
                    placeholderTextColor={'#aaa'}
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