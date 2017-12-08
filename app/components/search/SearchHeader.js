/**
 * 搜索页面使用的头部
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
import Colors from '../common/Colors';

export default class SearchHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            keyword:""
        }
    }
    /**
     * 点击搜索
     */
    pressSearch(){
        let keyword = this.state.keyword;
        if(keyword === "" || keyword === null || keyword === undefined){
            return false;
        }
        this.search.clearText();
        this.props.navigation.navigate("SearchResult",{keyword:keyword});
    }
    //加载完将光标置于输入框内
    componentDidMount(){
        this.search.focus();
    }
    //返回
    goBack(){
        this.search.blur();
        this.props.navigation.goBack();
    }
    render(){
        return (
            <View style={styles.container}>
                <Icon name='arrow-back' onPress={()=>{this.goBack()}}/>
                <SearchBar
                    ref={(search)=>{this.search=search}}
                    lightTheme
                    onChangeText={(text)=>{this.setState({keyword:text})}}
                    containerStyle={styles.searchContainer}
                    inputStyle={Colors.bgF2}
                    placeholderTextColor={'#aaaaaa'}
                    placeholder='搜索公益圈 文章' />
                <TouchableWithoutFeedback onPress={()=>this.pressSearch()}>
                    <View><Text>搜索</Text></View>
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