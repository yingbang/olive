/**
 * 个人主页动态列表
 *
 */
import React,{Component} from 'react';
import {Image,View,Text,TouchableWithoutFeedback,StyleSheet} from 'react-native';

export default class PersonalDongtaiListItem extends Component {
    render() {
        return(
            <View style={{marginBottom:8}}>
                <TouchableWithoutFeedback>
                    <View>
                        <View style={{padding:8}}>
                            <Text>橄榄枝新品发布会成功举行！两款智能装备将为这个跑马季带来无限新动力！智能跑鞋源自UA生产线，采用创新高科技鞋底技术</Text>
                            <Text style={{color:'#00bfff',marginTop:5}}>查看全文</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,marginBottom:10,paddingTop:5,paddingLeft:8,paddingBottom:5,backgroundColor:'#f8f8f8'}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <TouchableWithoutFeedback onPress={()=>{alert('赞')}}>
                                    <View style={{flexDirection:'row',marginRight:15,alignItems:'center'}}>
                                        <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                        <Text>33</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                                    <View style={{flexDirection:'row',marginRight:15,alignItems:'center'}}>
                                        <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconpinglun.png')}/>
                                        <Text>10</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cell_container:{
        flex:1,
        flexDirection:'row',
    },
    itemLeft:{
        flex:1,
        paddingLeft:10,
    },
    leftTop:{
        fontSize:12,
        color:'#00BFFF',
        marginBottom:8
    },
    leftMiddle:{
        fontSize:14,
        color:'#333333',
        marginBottom:8
    },
    leftBottom:{
        flexDirection:'row',
        alignItems:'center'
    },
    textBorder:{
        borderWidth:1,
        borderColor:'#ff4343',
        paddingLeft:3,
        paddingRight:1,
        color:'#ff4343'
    },
    bottomText:{
        fontSize:10,
        marginRight:10
    },
    bottomImage:{
        width:12,
        height:12,
        marginRight:2,
        tintColor:'#aaaaaa'
    },
    itemRight:{
        flex:1,
        alignItems:'center',
    },
    rightImage:{
        width:140,
        height:90
    }
});