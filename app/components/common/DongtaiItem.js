/**
 * 单个动态
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
    Platform,
    FlatList,
    RefreshControl,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {getDateTimeDiff,inArray,getFullPath,removeHTMLTag,strCut} from '../common/public';
import {zanDongtaiAction} from '../../actions/userAction';
import globalStyle from '../common/GlobalStyle';
import ImageRange from '../common/ImageRange';
import UShare from '../common/UShare';
import {LazyloadView,LazyloadImage} from '../common/lazyload';//LazyloadImage host={this.lazyloadName}
import {CachedImage} from '../common/ImageCacheMy';


export default class DongtaiItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zanDongtaiList:this.props.zan || [],
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
        this.lazyloadName = this.props.name;//懒加载的name
    }
    //点赞、取消点赞
    zanDongtai(id,type){
        if(this.props.screenProps){
            this.props.screenProps.dispatch(zanDongtaiAction(id,type,()=>{this._loadZanDongtaiComplete()}));
        }else{
            this.props.dispatch(zanDongtaiAction(id,type,()=>{this._loadZanDongtaiComplete()}));
        }
    }
    _loadZanDongtaiComplete(){
        try{
            let contentList = realmObj.objects("ZanDongtai");
            if(contentList.length >= 0){
                this.setState({
                    zanDongtaiList:contentList
                });
            }
        }catch(e){}
    }
    dongtaiDetail(id){
        if(this.props.screenProps){
            this.props.screenProps.navigation.navigate("DongTaiDetail",{id:id})
        }else{
            this.props.navigation.navigate("DongTaiDetail",{id:id});
        }
    }
    personalHome(userid){
        if(this.props.screenProps){
            this.props.screenProps.navigation.navigate("PersonalHome",{id:userid});
        }else{
            this.props.navigation.navigate("PersonalHome",{id:userid});
        }
    }
    //分享
    myShare(item){
        let images = item['pics'];
        let shareImg = "https://mmbiz.qlogo.cn/mmbiz_png/7HmKrmWJ6Xfkm49C15ThoI8q6rexlGgIWKAp9szBq0uzYtnEkSpHib2dEmRq15jBuYdMnkaCpsqvPWaDaemSorg/0?wx_fmt=png";
        if(images !== '' && images !== null && images !== undefined){
            let imagesArr = images.split(",");
            shareImg = getFullPath(imagesArr[0],this.state.host);
        }
        UShare.share("橄榄枝精选动态",item['content'],
            shareImg,
            this.state.host + "/h5/dongtai?id="+item['id'],()=>{},()=>{});
    }
    render(){
        let item = this.props.item;
        let from = 0;//暂时不要了，【个人中心的样式稍微不一样，this.props.from || 0】
        //个人中心样式
        if(from === 1){
            return (
                <LazyloadView host={this.lazyloadName} style={{marginBottom:15,overflow:'hidden'}}>
                    <TouchableWithoutFeedback onPress={()=>{this.dongtaiDetail(item['id'])}}>
                        <View>
                            <View style={[globalStyle.dongtaiAvatarView,{padding:8,paddingBottom:0}]}>
                                {
                                    (item['avatar'] !== "") ?
                                        <CachedImage style={globalStyle.dongtaiAvatar} source={{uri:getFullPath(item['avatar'],this.state.host),cache:'force-cache'}}/>
                                        :
                                        <CachedImage style={globalStyle.defaultAvatar} source={require('../../assets/icon/iconhead.png')}/>
                                }
                                <View>
                                    <Text>{item['name']}</Text>
                                    <Text style={{color:'#999999',fontSize:12}}>{getDateTimeDiff(item['dateline'])}</Text>
                                </View>
                            </View>
                            <View style={{padding:8,paddingTop:0}}>
                                <Text style={globalStyle.homeDongtaiText}>{item['content']}</Text>
                                <ImageRange name={this.lazyloadName} images={item['pics']} {...this.props}/>
                            </View>
                            <View style={{flexDirection:'row',backgroundColor:'#f8f8f8',borderTopWidth:1,borderTopColor:'#f2f2f2',padding:8}}>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    {
                                        inArray(this.state.zanDongtaiList,item['id'],'id') ?
                                            <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],0)}}>
                                                <View style={{flexDirection:'row',marginRight:20,alignItems:'center'}}>
                                                    <Image style={[globalStyle.dongtaiIcon,{marginRight:5}]} source={require('../../assets/icon/iconzan2.png')}/>
                                                    <Text>取消赞</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            :
                                            <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],1)}}>
                                                <View style={{flexDirection:'row',marginRight:20,alignItems:'center'}}>
                                                    <Image style={[globalStyle.dongtaiIcon,{marginRight:5}]} source={require('../../assets/icon/iconzan.png')}/>
                                                    <Text>赞</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                    }
                                    <TouchableWithoutFeedback onPress={()=>{this.dongtaiDetail(item['id'])}}>
                                        <View style={{flexDirection:'row',marginRight:20,alignItems:'center'}}>
                                            <CachedImage style={[globalStyle.dongtaiIcon,{marginRight:5}]} source={require('../../assets/icon/iconpinglun.png')}/>
                                            <Text>评论</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={()=>{UShare.share('你好', '分享内容', '','',()=>{},()=>{})}}>
                                        <CachedImage style={[globalStyle.dongtaiIcon,{marginRight:0}]} source={require('../../assets/icon/iconshare.png')}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{padding:8}}>
                                {
                                    item['zan'] > 0 ?
                                        <View style={{flexDirection:'row',marginBottom:8}}>
                                            <CachedImage style={{width:15,height:15,tintColor:'#333',marginRight:5}} source={require('../../assets/icon/iconzan2.png')}/>
                                            <Text style={{fontSize:12,color:'#333'}}>{item['zan']}人赞了</Text>
                                        </View>
                                        : null
                                }

                                <HTMLView
                                    value={item['pinglunlist']}
                                    stylesheet={styles}
                                    addLineBreaks={false}
                                    onLinkPress={(url) => {}}
                                />
                                {
                                    item['pinglun'] > 3 ? <Text style={{color:'#00bfff',marginTop:5,fontSize:12}}>查看所有{item['pinglun']}条评论</Text> : null
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </LazyloadView>
            );
        }
        //热门、关注样式
        return (
            <View host={this.lazyloadName} style={{marginBottom:15,overflow:'hidden'}}>
                <TouchableWithoutFeedback onPress={()=>{this.dongtaiDetail(item['id'])}}>
                    <View>
                        <TouchableWithoutFeedback onPress={()=>{this.personalHome(item['userid'])}}>
                            <View style={globalStyle.dongtaiAvatarView}>
                                {
                                    (item['avatar'] !== "") ?
                                        <CachedImage style={globalStyle.dongtaiAvatar} source={{uri:getFullPath(item['avatar'],this.state.host),cache:'force-cache'}}/>
                                        :
                                        <CachedImage style={[globalStyle.defaultAvatar,{width:40,height:40,borderRadius:20}]} source={require('../../assets/icon/iconhead.png')}/>
                                }
                                <View>
                                    <Text>{item['name']}</Text>
                                    <Text style={{color:'#999999',fontSize:12}}>{getDateTimeDiff(item['dateline'])}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={globalStyle.homeDongtaiText}>{strCut(removeHTMLTag(item['content']),130)}</Text>
                            <ImageRange name={this.lazyloadName} images={item['pics']} {...this.props}/>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                {
                                    inArray(this.state.zanDongtaiList,item['id'],'id') ?
                                        <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],0)}}>
                                            <CachedImage style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconzan2.png')}/>
                                        </TouchableWithoutFeedback>
                                        :
                                        <TouchableWithoutFeedback onPress={()=>{this.zanDongtai(item['id'],1)}}>
                                            <CachedImage style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconzan.png')}/>
                                        </TouchableWithoutFeedback>
                                }
                                <TouchableWithoutFeedback onPress={()=>{this.dongtaiDetail(item['id'])}}>
                                    <CachedImage style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconpinglun.png')}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>{this.myShare(item)}}>
                                    <CachedImage style={globalStyle.dongtaiIcon} source={require('../../assets/icon/iconfenxiang.png')}/>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={()=>{this.dongtaiDetail(item['id'])}}>
                                    <CachedImage style={[globalStyle.dongtaiIcon,{marginRight:0}]} source={require('../../assets/icon/iconmore.png')}/>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View>
                            {
                                item['zan'] > 0 ?
                                    <View style={{flexDirection:'row',marginBottom:8}}>
                                        <CachedImage style={{width:15,height:15,tintColor:'#333',marginRight:5}} source={require('../../assets/icon/iconzan2.png')}/>
                                        <Text style={{fontSize:12,color:'#333'}}>{item['zan']}人赞了</Text>
                                    </View>
                                    : null
                            }

                            <HTMLView
                                value={item['pinglunlist']}
                                stylesheet={styles}
                                addLineBreaks={false}
                                onLinkPress={(url) => {}}
                            />
                            {
                                item['pinglun'] > 3 ? <Text style={{color:'#00bfff',marginTop:5,fontSize:12}}>查看所有{item['pinglun']}条评论</Text> : null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    p:{
        color:'#666',
        fontSize:12,
        marginBottom:3
    },
    b:{
        color:'#333'
    },
});