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
import FenGeXian from '../../common/FenGeXian';
import Blank from '../../common/Blank';

export default class ZuZhi extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <MyTop title="我的组织" {...HeaderProps}/>
        }
    };
    state = {selected: (new Map())};
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
            <Image style={{width:100,height:100,marginRight:15}} source={require('../../test/mock_data/1.jpg')}/>
            <View style={{flex:1}}>
                <Text>小编</Text>
                <Text style={{fontSize:12,flex:1}}>女孩请进，男生止步！</Text>
            </View>
        </View>
    );
    render(){
        return (
            <FlatList
                data={[{id: 'a',title:'hello'}, {id: 'b',title:'hi'}, {id: 'c',title:'hi'}, {id: 'd',title:'hi'}, {id: 'e',title:'hi'}, {id: 'f',title:'hi'}, {id: 'g',title:'hi'}]}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                style={styles.container}
                ItemSeparatorComponent={FenGeXian}
                ListFooterComponent={Blank}
                ListHeaderComponent={ZuzhiHeaderComponent}
                onRefresh={()=>{alert(1)}}
                refreshing={false}
            />
        );
    }
}

/**
 * 列表头部
 */
class ZuzhiHeaderComponent extends Component{
    render(){
        return (
            <View style={{flex:1,padding:8,backgroundColor:'#f8f8f8',marginBottom:8}}>
                <Text>我加入的组织</Text>
            </View>
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