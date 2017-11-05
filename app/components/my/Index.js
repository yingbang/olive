/**
 * 我的
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    ScrollView,
    Easing,
    PanResponder,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import globalStyle from '../common/GlobalStyle';
import { List, ListItem } from 'react-native-elements';

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
export default class MyIndex extends Component{
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header:null
    };
    renderRow = ({item}) => (
        <ListItem
            key={item.key}
            title={item.name}
            subtitle={item.subtitle}
            leftIcon={{name: item.icon,color:'#00bfff',size:18,type:item.iconType ? item.iconType : ''}}
            onPress={()=>{this.props.navigation.navigate(item.nav)}}
            containerStyle={{borderBottomColor:'#f8f8f8',marginTop:item.isDivider ? 8 : 0,backgroundColor:'#ffffff'}}
        />
    )

    render(){
        return (
            <ScrollView style={[globalStyle.statusHeight,styles.container]}>
                <View style={styles.top}>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_xiaoxi')}}>
                        <View style={styles.header}>
                            <Image source={require('../../assets/icon/iconmessage.png')} style={styles.image} />
                            <View style={styles.imageTip}>
                                <Text style={styles.tipText}>3</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={()=>{this.onClick('my_ziliao')}}>
                    <View style={styles.baseInfo}>
                        <Animated.Image
                            source={require('../../assets/mock_data/2.jpg')}
                            style={[styles.infoImage,{marginRight:10}]}
                        />
                        <View style={{flex:1}}>
                            <Text>Alice Li245</Text>
                        </View>
                        <Image source={require('../../assets/icon/icongo.png')} style={styles.more}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.otherInfo}>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_guanzhu')}}>
                        <View style={styles.otherInfoItem}>
                            <Text>0</Text>
                            <Text style={styles.otherInfoItemText}>关注</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_fensi')}}>
                        <View style={styles.otherInfoItem}>
                            <Text>0</Text>
                            <Text style={styles.otherInfoItemText}>粉丝</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.onClick('my_dongtai')}}>
                        <View style={styles.otherInfoItem}>
                            <Text>0</Text>
                            <Text style={styles.otherInfoItemText}>动态</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
        backgroundColor:'#f8f8f8',
    },
    top:{
        height:30,
    },
    header:{
        height:30,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingRight:10,
        backgroundColor:'#ffffff',
    },
    image:{
        width:25,
        height:25,
    },
    more:{
        width:15,
        height:15,
        tintColor:'#999999'
    },
    baseInfo:{
        paddingLeft:8,
        paddingRight:8,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#f8f8f8',
        paddingBottom:15,
        paddingTop:10,
        backgroundColor:'#ffffff',
    },
    otherInfo:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#ffffff',
        marginBottom:8,
    },
    otherInfoItem:{
        flex:1,
        alignItems:'center',
    },
    otherInfoItemText:{
        fontSize:12,
        color:'#999999'
    },
    infoImage:{
        width:60,
        height:60,
        borderRadius:30,
    },
    imageTip:{
        backgroundColor:'#ff4343',
        position:'absolute',
        top:3,
        right:5,
        width:14,
        height:14,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    tipText:{
        fontSize:10,
        color:'#ffffff'
    },
});


