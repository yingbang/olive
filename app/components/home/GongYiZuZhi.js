/**
 * 推荐公益组织：热门和关注里面都有
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

export default class GongYiZuZhi extends Component {

    render() {
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',marginBottom:12}}>
                    <Text style={globalStyle.flex1}>推荐公益组织</Text>
                    <Text style={colors.cBlue}>换一批</Text>
                </View>
                <ScrollView horizontal={true}>
                    {
                        contentList.map((item, i) => (
                            <TouchableWithoutFeedback key={i} onPress={()=>{this.props.screenProps.navigation.navigate("PersonalHome")}}>
                                <View style={{justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#eeeeee',borderRadius:8,padding:15,marginRight:10}}>
                                    <Image style={{width:70,height:70,borderRadius:35,marginBottom:10}} source={require('../../assets/mock_data/1.jpg')}/>
                                    <Text>520格格子</Text>
                                    <Text style={{fontSize:12,marginTop:8,marginBottom:8}}>社交达人</Text>
                                    <Text onPress={()=>{alert('加入')}} style={{padding:5,backgroundColor:'#00bfff',color:'#ffffff',borderRadius:10,fontSize:12}}>加入</Text>
                                    <TouchableWithoutFeedback onPress={()=>{alert('close')}}>
                                        <Image style={{position:'absolute',top:5,right:5,width:15,height:15,tintColor:'#999999'}} source={require('../../assets/icon/iconclose.png')}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}