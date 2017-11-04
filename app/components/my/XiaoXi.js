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

export default class XiaoXi extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <MyTop title="消息" {...HeaderProps}/>
        }
    };
    state = {selected: (new Map())};
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
            <Image style={{width:60,height:60,borderRadius:30,marginRight:15}} source={require('../../test/mock_data/1.jpg')}/>
            <View style={{flex:1}}>
                <Text>小编</Text>
                <Text style={{fontSize:12}}>女孩请进，男生止步！</Text>
            </View>
            <View style={{marginRight:5,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:10,marginBottom:5}}>09-15</Text>
                <Text style={{fontSize:10,backgroundColor:'#ff4343',width:16,height:16,borderRadius:8,textAlign:'center',color:'#ffffff',justifyContent:'center',}}>99</Text>
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
                ListHeaderComponent={Blank}
                onRefresh={()=>{alert(1)}}
                refreshing={false}
            />
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