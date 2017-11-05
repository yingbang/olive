/**
 * 发现
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
    FlatList
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import { Card, List, ListItem, Button} from 'react-native-elements';

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]

const list = [
    {
        key:0,
        name: '20次公益',
        icon: 'feather',
        iconType:'entypo',
        subtitle: '最近参加公益5次',
        nav:'GongYi'
    },
    {
        key:1,
        name: '我的组织',
        icon: 'group',
        iconType:'font-awesome',
        nav:'ZuZhi',
        isDivider:true
    },
    {
        key:2,
        name: '我的荣誉勋章',
        icon: 'trophy',
        iconType:'font-awesome',
        nav:'ZuZhi'
    },
    {
        key:3,
        name: '我的公益活动',
        icon: 'gift',
        iconType:'font-awesome',
        nav:'ZuZhi'
    },
    {
        key:4,
        name: '我的收藏',
        icon: 'star',
        nav:'ZuZhi'
    },
    {
        key:5,
        name: '订单',
        icon: 'reorder',
        iconType:'font-awesome',
        nav:'ZuZhi',
        isDivider:true
    },
    {
        key:6,
        name: '意见反馈',
        icon: 'notification',
        iconType:'entypo',
        nav:'ZuZhi',
        isDivider:true
    },
    {
        key:7,
        name: '设置',
        icon: 'cog',
        iconType:'font-awesome',
        nav:'SheZhi',
        isDivider:true
    },
];


export default class FindIndex extends Component{

    renderRow = ({item}) => (
        <Card containerStyle={{marginLeft:8,marginRight:8,marginTop:10}} image={require('../../assets/mock_data/2.jpg')}>
            <Text style={styles.huodongItemTitle}>腾讯众创空间邀请30位CEO去荒岛求生</Text>
            <Text style={{marginBottom: 10}}>
                The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <View style={styles.huodongItemTime}>
                <Image style={styles.huodongItemTimeImage} source={require('../../assets/icon/icontime.png')}/>
                <Text style={{flex:1,fontSize:12}}>07月29日 周六 08:00</Text>
                <Text style={{fontSize:12}}>已有<Text style={{color:'#00bfff'}}>54</Text>人报名</Text>
            </View>
            <Button
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='我要报名' />
        </Card>
    )
    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.quanziContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
                        <TouchableWithoutFeedback>
                            <View style={styles.quanziView}>
                                <Image style={styles.quanziImage} source={require('../../assets/mock_data/1.jpg')}/>
                                <Text style={styles.quanziText}>我的圈子</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.quanziView}>
                                <Image style={styles.quanziImage} source={require('../../assets/mock_data/1.jpg')}/>
                                <Text style={styles.quanziText}>科技</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.quanziView}>
                                <Image style={styles.quanziImage} source={require('../../assets/mock_data/1.jpg')}/>
                                <Text style={styles.quanziText}>软件开发</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0,backgroundColor:'#f8f8f8'}}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={list}
                    />
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
    },
    quanziContainer:{
        backgroundColor:'#ffffff',
        paddingBottom:8
    },
    quanziView:{
        alignItems:'center',
        marginLeft:8
    },
    quanziImage:{
        width:40,
        height:40,
        borderRadius:20
    },
    quanziText:{
        fontSize:12,
        marginTop:8
    },
    huodongItemTitle:{
        fontSize:14,
        color:'#333333',
        marginBottom:5
    },
    huodongItemTime:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    huodongItemTimeImage:{
        width:18,
        height:18,
        marginRight:3
    },
});