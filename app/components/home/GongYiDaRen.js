/**
 * 推荐公益达人
 *
 */
import React,{Component} from 'react';
import {Image,Text,View,ScrollView,TouchableWithoutFeedback} from 'react-native';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

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

export default class GongYiDaRen extends Component {

    render() {
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',marginBottom:12}}>
                    <Text style={globalStyle.flex1}>推荐公益达人</Text>
                    <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={colors.c99}>更多</Text>
                            <Image style={[colors.tint99,{width:15,height:15}]} source={require('../../assets/icon/icongo.png')}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView>
                    {
                        contentList.map((item, i) => (
                            <TouchableWithoutFeedback key={i} onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10}}>
                                    <Image style={{width:70,height:70,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                                    <View style={{flex:1}}>
                                        <Text>旺一下啦</Text>
                                        <Text style={{fontSize:12,marginTop:8,marginBottom:8}}>哈哈哈</Text>
                                    </View>
                                    <Text onPress={()=>{alert('关注')}} style={{padding:5,backgroundColor:'#00bfff',color:'#ffffff',borderRadius:10,fontSize:12}}>关注</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}