/**
 * 推荐公益组织：热门和关注里面都有
 *
 */
import React,{Component} from 'react';
import {Image,Text,View,ScrollView,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import request from 'superagent';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {getArrayItems,inArray,getFullPath} from '../common/public';
import {toastShort} from '../common/ToastTool';
import {getUserListAction,getJoinCompanyAction} from '../../actions/userAction';
//import {LazyloadImage} from '../common/lazyload';//LazyloadImage host={this.lazyloadName}
import {CachedImage} from '../common/ImageCacheMy';


export default class GongYiZuZhi extends Component {

    constructor(props){
        super(props);
        this.state={
            content:[],
            currentPage:1,
            joinList:[]
        };
        //this.lazyloadName = this.props.name;//懒加载的name
    }

    componentDidMount(){
        try{
            let contentList = realmObj.objects("User").filtered("visible == true and type == 1 and flag == 1");
            if(contentList && contentList.length >= 0){
                this.setState({
                    content:getArrayItems(contentList,10)
                });
            }
        }catch(e){
            console.log(e)
        }finally{
            this.props.screenProps.dispatch(getUserListAction(this.state.currentPage,1,1,this._loadComplete.bind(this)));
            this.props.screenProps.dispatch(getJoinCompanyAction(1,this._loadCompanyComplete.bind(this)));
        }
    }
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadComplete(){
        try{
            let contentList = realmObj.objects("User").filtered("visible == true and type == 1 and flag == 1");
            if(contentList.length >= 0){
                this.setState({
                    content:getArrayItems(contentList,10),
                    currentPage:this.state.currentPage++
                });
            }
        }catch(e){}
    }
    _loadCompanyComplete(){
        try{
            let contentList = realmObj.objects("JoinCompany");
            if(contentList && contentList.length >= 0){
                this.setState({
                    joinList:contentList
                });
            }
        }catch(e){}
    }

    //加入、退出公益组织
    join(id,status){
        try{
            //更新服务器
            let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let text = '加入';
            request.get(host + '/api/user/join').query({userid:userid,followid:id,status:status,_t:Math.random()}).end((err,res)=>{
                if(res.body.state === 'ok'){
                    realmObj.write(()=>{
                        if(status === 1){
                            realmObj.create("JoinCompany",{id:id},true);
                        }else{
                            text = '退出';
                            realmObj.delete(realmObj.objects("JoinCompany").filtered("id == " + id));
                        }
                        let contentList = realmObj.objects("JoinCompany");
                        if(contentList && contentList.length >= 0){
                            this.setState({
                                joinList:contentList
                            });
                        }
                    });
                    toastShort(text + "成功");
                }else{
                    toastShort(text + "失败，请重试")
                }
            });
        }catch(e){}
    }

    //不显示会员
    hideUser(id,key){
        try{
            let user = realmObj.objects("User").filtered("id == " + id);
            if(user && user.length > 0){
                realmObj.write(()=>{
                    realmObj.create('User', {id: id, visible:false}, true);
                    //从当前数组中删除
                    let oldContent = this.state.content;
                    oldContent.splice(key,1);
                    this.setState({
                        content:oldContent
                    });
                    //更新数据库
                    realmObj.create("HiddenUser",{id:id},true);
                });
            }
        }catch(e){
            console.log(e)
        }
    }

    //换一批
    changeContent(){
        this.props.screenProps.dispatch(getUserListAction(this.state.currentPage,1,1,this._loadComplete.bind(this)));
    }

    render() {
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',marginBottom:12}}>
                    <Text style={[globalStyle.flex1,globalStyle.homeTitle]}>推荐公益组织</Text>
                    <Text style={colors.cBlue} onPress={()=>{this.changeContent()}}>换一批</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {
                        this.state.content.map((item, i) => (
                            <TouchableWithoutFeedback key={i} onPress={()=>{this.props.screenProps.navigation.navigate("PersonalHome",{id:item['id']})}}>
                                <View style={styles.container}>
                                    {
                                        (item['avatar'] !== "") ?
                                            <CachedImage style={styles.img} source={{uri:getFullPath(item['avatar'],host),cache:'force-cache'}}/>
                                            :
                                            <CachedImage style={[globalStyle.defaultAvatar,{marginBottom:10}]} source={require('../../assets/icon/iconhead.png')}/>
                                    }
                                    <Text style={{marginBottom:10}}>{item['nickname']}</Text>
                                    {
                                        inArray(this.state.joinList, item['id'], 'id') ?
                                        <Text onPress={() => {
                                            this.join(item['id'], 0)
                                        }} style={[colors.bgF8, colors.c99, styles.btn]}>退出</Text>
                                        : <Text onPress={() => {
                                            this.join(item['id'], 1)
                                        }} style={[colors.bgBlue, colors.cWhite, styles.btn]}>加入</Text>
                                    }
                                    <TouchableWithoutFeedback onPress={()=>{this.hideUser(item['id'],i)}}>
                                        <Image style={[colors.tint99,styles.close]} source={require('../../assets/icon/iconclose.png')}/>
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

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        width:150,
        borderWidth:1,
        borderColor:'#eeeeee',
        borderRadius:8,
        padding:10,
        marginRight:10
    },
    img:{
        width:70,
        height:70,
        borderRadius:35,
        marginBottom:10
    },
    btn:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:10,
        fontSize:12
    },
    close:{
        position:'absolute',
        top:5,
        right:5,
        width:15,
        height:15
    },
});