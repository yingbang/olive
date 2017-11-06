/**
 * 动态详情
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Header} from 'react-native-elements';

export default class DongTaiDetail extends Component{
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '动态详情'}}
                rightComponent={{ icon: 'more-horiz'}}
                backgroundColor="#ffffff"
            />
        }
    };
    onSubmitComment(){

    }
    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={styles.block}>
                        <View style={{marginBottom:10}}>
                            <TouchableWithoutFeedback onPress={()=>{alert('详情')}}>
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
                                    </View>
                                    <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                                        <View>
                                            <View style={{marginBottom:8,borderBottomWidth:1,borderBottomColor:'#f8f8f8',paddingBottom:8}}>
                                                <Text style={{fontSize:12,color:'#666',marginBottom:5,marginTop:15}}>102人赞了</Text>
                                                <View style={{flexDirection:'row'}}>
                                                    <TouchableWithoutFeedback>
                                                        <Image style={{width:30,height:30,borderRadius:15,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                                                    </TouchableWithoutFeedback>
                                                    <TouchableWithoutFeedback>
                                                        <Image style={{width:30,height:30,borderRadius:15,marginRight:10}} source={require('../../assets/mock_data/2.jpg')}/>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{marginBottom:8,fontSize:12}}>23条评论</Text>

                                                <View style={{paddingTop:8,paddingBottom:8,borderBottomWidth:1,borderBottomColor:'#f8f8f8'}}>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Image style={{width:30,height:30,borderRadius:15,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                                                        <View style={{flex:1}}>
                                                            <Text style={{fontSize:12}}>天空中的柠檬</Text>
                                                            <Text style={{fontSize:10}}>7小时前</Text>
                                                        </View>
                                                        <View style={{flexDirection:'row'}}>
                                                            <TouchableWithoutFeedback>
                                                                <Image style={{width:15,height:15,marginRight:15}} source={require('../../assets/icon/iconhuifu.png')}/>
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback>
                                                                <View style={{flexDirection:'row'}}>
                                                                    <Image style={{width:15,height:15,marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                                                    <Text style={{fontSize:10}}>4</Text>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                    <View style={{marginLeft:30,marginTop:8}}>
                                                        <Text style={{fontSize:12}}>金牛座默默的看着</Text>
                                                    </View>
                                                </View>

                                                <View style={{paddingTop:8,paddingBottom:8,borderBottomWidth:1,borderBottomColor:'#f8f8f8'}}>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Image style={{width:30,height:30,borderRadius:15,marginRight:10}} source={require('../../assets/mock_data/1.jpg')}/>
                                                        <View style={{flex:1}}>
                                                            <Text style={{fontSize:12}}>天空中的柠檬</Text>
                                                            <Text style={{fontSize:10}}>7小时前</Text>
                                                        </View>
                                                        <View style={{flexDirection:'row'}}>
                                                            <TouchableWithoutFeedback>
                                                                <Image style={{width:15,height:15,marginRight:15}} source={require('../../assets/icon/iconhuifu.png')}/>
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback>
                                                                <View style={{flexDirection:'row'}}>
                                                                    <Image style={{width:15,height:15,marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                                                    <Text style={{fontSize:10}}>4</Text>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                    <View style={{marginLeft:30,marginTop:8}}>
                                                        <Text style={{fontSize:12}}>金牛座默默的看着</Text>
                                                    </View>
                                                </View>


                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:80}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity style={{flex:1,height:40}}>
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder="评论"
                                    underlineColorAndroid={"#f2f2f2"}
                                    style={styles.textInputStyle}
                                    clearButtonMode="while-editing"
                                    clearTextOnFocus={true}
                                    enablesReturnKeyAutomatically={true}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSubmitComment()}>
                            <Text style={styles.cancelText}>发表</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',borderTopColor:'#f8f8f8',borderTopWidth:1,height:30}}>
                        <TouchableWithoutFeedback onPress={()=>{alert('赞')}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                <Text style={{fontSize:12}}>赞</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{alert('分享')}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderRightWidth:1,borderRightColor:'#f8f8f8'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconfenxiang.png')}/>
                                <Text style={{fontSize:12}}>分享</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{alert('收藏')}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                                <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconshoucang.png')}/>
                                <Text style={{fontSize:12}}>收藏</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8,
        flex:1,
    },
    inputView:{
        flex:1,
        height: 40,
        //设置圆角程度
        borderRadius: 6,
        //设置边框的颜色
        borderColor: '#f2f2f2',
        backgroundColor:'#f2f2f2',
        //设置边框的宽度
        borderWidth: 1,
        //内边距
        paddingLeft: 5,
        paddingRight: 5,
        //外边距
        marginRight: 8,
        marginLeft:8,
        marginBottom:8,
        //设置相对父控件居中
        alignSelf: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    textInputStyle:{
        height:40,
        fontSize:12,
        flex:1,
    },
    cancelText:{
        color:'#00BFFF',
        marginRight:8
    },
});