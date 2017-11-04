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

export default class GuanZhu extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <MyTop title="关注" {...HeaderProps}/>
        }
    };
    state = {selected: (new Map())};
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
            <Image style={{width:60,height:60,borderRadius:30,marginRight:15}} source={require('../../test/mock_data/1.jpg')}/>
            <View>
                <Text>黑猫白猫</Text>
                <View style={{flexDirection:'row',marginTop:5,marginBottom:5,alignItems:'center'}}>
                    <View style={{flexDirection:'row',paddingLeft:3,paddingRight:3,backgroundColor:'#ff4343',borderRadius:3,marginRight:5,alignItems:'center'}}>
                        <Image style={{width:15,height:15,tintColor:'#ffffff'}} source={require('../../assets/icon/iconnan.png')}/>
                        <Text style={{fontSize:12,color:'#ffffff'}}>25</Text>
                    </View>
                    <Text style={{flexDirection:'row',fontSize:12,textAlign:'center',paddingLeft:3,paddingRight:3,borderRadius:3,borderColor:'#00bfff',borderWidth:1,color:'#00bfff',marginRight:5}}>跑步</Text>
                    <Text style={{flexDirection:'row',fontSize:12,textAlign:'center',paddingLeft:3,paddingRight:3,borderRadius:3,borderColor:'#00bfff',borderWidth:1,color:'#00bfff',marginRight:5}}>健身</Text>
                    <Text style={{flexDirection:'row',fontSize:12,textAlign:'center',paddingLeft:3,paddingRight:3,borderRadius:3,borderColor:'#00bfff',borderWidth:1,color:'#00bfff',marginRight:5}}>骑行</Text>
                </View>
                <Text>健身大拿</Text>
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