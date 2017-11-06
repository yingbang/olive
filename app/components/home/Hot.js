/**
 * 首页：热门
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
import Carousel from '../common/Carousel';
import GongYiZuZhi from './GongYiZuZhi';
import GongYiDaRen from './GongYiDaRen';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

const { width, height } = Dimensions.get('window');
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

export default class Hot extends Component{

    static navigationOptions = {
        header:<HeaderWithSearch/>
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    renderRow = ({item}) => (
        <View style={{marginBottom:15}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.screenProps.navigation.navigate("DongTaiDetail");}}>
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
                <View style={styles.block}>
                    <Carousel
                        delay={4000}
                        style={styles.carousel}
                        autoplay
                        pageInfo={false}
                        swiper
                        onAnimateNextPage={(p) => {}}
                        bullets={true}
                    >
                        <View style={styles.carousel}>
                            <Image style={styles.carousel} source={{uri:'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201707/jiaoben5258/images/3-1.jpg'}}/>
                        </View>
                        <View style={styles.carousel}>
                            <Image style={styles.carousel} source={{uri:'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201707/jiaoben5258/images/2-1.jpg'}}/>
                        </View>
                        <View style={styles.carousel}>
                            <Image style={styles.carousel} source={{uri:'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201707/jiaoben5258/images/1-1.jpg'}}/>
                        </View>
                    </Carousel>
                    <TouchableWithoutFeedback>
                        <View style={styles.toutiao}>
                            <Text style={{color:'#00bfff',fontWeight:'600',marginRight:10}}>头条</Text>
                            <Text style={{flex:1,fontSize:12}}>橄榄枝公益活动火热进行中</Text>
                            <Image style={{width:14,height:14}} source={require('../../assets/icon/icongo.png')}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[globalStyle.flex1,styles.block]}>
                    <GongYiZuZhi {...this.props}/>
                </View>
                <View style={[globalStyle.flex1,styles.block]}>
                    <GongYiDaRen {...this.props}/>
                </View>
                <View style={[styles.block,globalStyle.flex1]}>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Text style={globalStyle.flex1}>热门公益</Text>
                        <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={colors.c99}>更多</Text>
                                <Image style={[colors.tint99,{width:15,height:15}]} source={require('../../assets/icon/icongo.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{backgroundColor:'#ddd',overflow:'hidden'}}>
                        <Image style={{width:width,height:150,flex:1}} resizeMode="stretch" source={require('../../assets/mock_data/banner/3.jpg')}/>
                    </View>
                </View>
                <View style={[styles.block,globalStyle.flex1]}>
                    <View style={{flexDirection:'row',marginBottom:12}}>
                        <Text style={globalStyle.flex1}>精选动态</Text>
                        <TouchableWithoutFeedback onPress={()=>{alert('更多')}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={colors.c99}>更多</Text>
                                <Image style={[colors.tint99,{width:15,height:15}]} source={require('../../assets/icon/icongo.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <List containerStyle={{marginTop:0,marginBottom:20,borderTopWidth:0}}>
                        <FlatList
                            renderItem={this.renderRow}
                            data={contentList}
                        />
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8,
    },
    carousel:{
        width:width - 16,//去掉两边的padding
        height:150
    },
    toutiao:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:8,
    },
});