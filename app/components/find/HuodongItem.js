import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import colors from '../common/Colors';
import { Card, Button} from 'react-native-elements';
import {formatTime,isExpired,getFullPath,inArray} from '../common/public';
import {LazyloadImage} from '../common/lazyload';

const lazyloadName = "lazyload-huodongList";//懒加载的name
const {width} = Dimensions.get("window");

export default class HuodongItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baoming:this.props.baoming || [],//我的报名列表
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    render(){
        let item = this.props.item;
        return (
            <Card containerStyle={{marginLeft:8,marginRight:8,marginTop:10}} image={require('../../assets/images/nopic3.png')}>
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("HuodongDetail",{id:item.id})}}>
                    <View style={{height:150,width:width-18,flex:1,backgroundColor:"transparent",position:'absolute',top:-150,left:0}}>
                        <LazyloadImage host={lazyloadName} style={{height:150,width:width-18}} source={item['pic'] ? {uri:getFullPath(item['pic'],this.state.host)} : require('../../assets/images/nopic1.jpg')} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("HuodongDetail",{id:item.id})}}>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:8,overflow:'hidden'}}>
                            {item['name'] ? "" :
                                <Text style={{
                                    color: '#fff', fontSize: 14, backgroundColor: '#00bfff', paddingTop: 3,
                                    paddingBottom: 3, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginRight: 8
                                }}>官方</Text>
                            }
                            <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                        </View>
                        <Text style={[colors.cad,{marginBottom: 10,fontSize:12,lineHeight:23}]}>{item['intro']}</Text>
                        <View style={styles.huodongItemTime}>
                            <Image style={styles.huodongItemTimeImage} source={require('../../assets/icon/icontime.png')}/>
                            <Text style={[colors.c7b,{flex:1,fontSize:12}]}>{formatTime(item['starttime'],"MM月dd日 周w hh:mm")}</Text>
                            <Text style={[colors.c7b,{fontSize:12}]}>已有<Text style={{color:'#00bfff'}}>{item['number']}</Text>人报名</Text>
                        </View>
                        <View style={styles.baoming}>
                            <View style={styles.author}>
                                <Image style={{width:30,height:30,marginRight:5}} source={require('../../assets/icon/iconguan.png')}/>
                                <Text style={[colors.cBlue,styles.name]}>{item['name'] ? item['name'] : '官方'}</Text>
                                <Text style={colors.c7b}>发布了该活动</Text>
                                <Image style={[styles.huodongItemTimeImage,{marginLeft:4}]} source={require('../../assets/icon/iconaddress.png')}/>
                                <Text style={colors.c7b}>{item['city']}</Text>
                            </View>
                            <View>
                                {
                                    isExpired(item['jiezhitime']) ?
                                        <Button
                                            backgroundColor='#dddddd'
                                            color='#666666'
                                            buttonStyle={{padding:4,borderRadius: 6, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                            containerViewStyle={{marginLeft:0,marginRight:0}}
                                            title={isExpired(item['endtime']) ? '活动结束' : '报名截止'} /> :
                                        <Button
                                            backgroundColor={inArray(this.state.baoming,item['id'],'huodongid') ? '#ff4343' : "#03A9F4"}
                                            buttonStyle={{padding:4,borderRadius: 6, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                            containerViewStyle={{marginLeft:0,marginRight:0}}
                                            onPress={() => {this.props.navigation.navigate("HuodongBaoMing",{id:item['id']})}}
                                            title={inArray(this.state.baoming,item['id'],'huodongid') ? '取消报名' : '我要报名'} />
                                }
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    huodongItemTitle:{
        fontSize:16,
        color:'#333333',
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
    baoming:{
        flexDirection:'row',
        alignItems:'center'
    },
    author:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        marginRight:5
    }
});