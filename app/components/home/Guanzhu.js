/**
 * 首页：关注
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Button,
    FlatList
} from 'react-native';
import { Card, List, ListItem} from 'react-native-elements';
import HeaderWithSearch from '../common/HeaderWithSearch';

const contentList = [
    {
        key:0,
        title: 'Appointments',
    },
    {
        key:1,
        title: 'Trips',
    },
    {
        key:2,
        title: 'Trips',
    },
    {
        key:3,
        title: 'Trips',
    },
    {
        key:4,
        title: 'Trips',
    },
]
export default class Guanzhu extends Component{

    static navigationOptions = {
        header:<HeaderWithSearch/>
    };

    renderRow = ({item}) => (
        <View style={{marginBottom:15}}>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("DongTaiDetail");}}>
                <View>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Image style={{width:40,height:40,borderRadius:20,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                        <View>
                            <Text>橄榄枝编辑</Text>
                            <Text style={{color:'#999999',fontSize:12}}>3天前</Text>
                        </View>
                    </View>
                    <View>
                        <Text>橄榄枝新品发布会成功举行！两款智能装备将为这个跑马季带来无限新动力！智能跑鞋源自UA生产线，采用创新高科技鞋底技术</Text>
                        <Text style={{color:'#00bfff',marginTop:5}}>查看全文</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TouchableWithoutFeedback onPress={()=>{alert('赞')}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:15}} source={require('../../assets/icon/iconzan.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:15}} source={require('../../assets/icon/iconpinglun.png')}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{UShare.share('你好', '分享内容', '','',()=>{},()=>{})}}>
                                <Image style={{width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconfenxiang.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                                <Image style={{width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconmore.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                        <View>
                            <View style={{flexDirection:'row',marginBottom:8}}>
                                <Image style={{width:15,height:15,tintColor:'#333',marginRight:5}} source={require('../../assets/icon/iconzan2.png')}/>
                                <Text style={{fontSize:12,color:'#333'}}>102人赞了</Text>
                            </View>
                            <Text style={{fontSize:12}}><Text style={{color:'#333'}}>逍遥：</Text>我是沙发啊</Text>
                            <Text style={{fontSize:12}}><Text style={{color:'#333'}}>吐槽君：</Text>这一听就很不错，小编说的非常对。</Text>
                            <Text style={{color:'#00bfff',marginTop:5,fontSize:12}}>查看所有100条评论</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

    render(){
        return (
            <ScrollView style={styles.container}>
                <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={contentList}
                    />
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding:8
    },
});