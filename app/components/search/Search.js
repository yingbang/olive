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
    FlatList,
    Platform
} from 'react-native';
//公共头部
import { SearchBar,Icon } from 'react-native-elements';
import Colors from '../common/Colors';
import SearchTab from './SearchTab';

export default class Search extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return (
                <View style={styles.container}>
                    <Icon name='arrow-back' onPress={()=>{HeaderProps.navigation.goBack()}}/>
                    <SearchBar
                        lightTheme
                        onChangeText={(text)=>{HeaderProps.navigation.goBack()}}
                        containerStyle={styles.searchContainer}
                        inputStyle={Colors.bgF2}
                        defaultValue={HeaderProps.scene.route.params.defaultWord}
                        placeholderTextColor={'#aaa'}
                        placeholder='搜索公益圈 文章' />
                    <TouchableWithoutFeedback onPress={()=>{HeaderProps.navigation.goBack()}}>
                        <View><Text>搜索</Text></View>
                    </TouchableWithoutFeedback >
                </View>
            );
        }
    };
    constructor(props){
        super(props);
        this.state={
            keyword:this.props.navigation.state.params.keyword,
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    componentDidMount(){
        this.props.navigation.setParams({defaultWord:this.state.keyword});
    }
    render(){
        return (
            <SearchTab screenProps={this.props} keyword={this.state.keyword}/>
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