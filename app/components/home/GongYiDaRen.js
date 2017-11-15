/**
 * 推荐公益达人
 *
 */
import React,{Component} from 'react';
import {Image,Text,View,ScrollView,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import request from 'superagent';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {getArrayItems,inArray} from '../common/public';
import {toastShort} from '../common/ToastTool';
import {getUserListAction,getFollowUserAction} from '../../actions/userAction';

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
    constructor(props){
        super(props);
        this.state={
            content:[],
            currentPage:1,
            joinList:[]
        }
    }

    componentDidMount(){
        try{
            let contentList = realmObj.objects("User").filtered("visible = true and type = 0 and flag = 1");
            if(contentList && contentList.length > 0){
                this.setState({
                    content:getArrayItems(contentList,10)
                });
            }
        }catch(e){
            console.log(e)
        }finally{
            this.props.screenProps.dispatch(getUserListAction(this.state.currentPage,0,1,this._loadComplete.bind(this)));
            this.props.screenProps.dispatch(getFollowUserAction(1,this._loadFollowUserComplete.bind(this)));
        }
    }
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadComplete(){
        try{
            let contentList = realmObj.objects("User").filtered("visible = true and type = 0 and flag = 1");
            if(contentList.length > 0){
                this.setState({
                    content:getArrayItems(contentList,10),
                    currentPage:this.state.currentPage++
                });
            }
        }catch(e){}
    }
    _loadFollowUserComplete(){
        try{
            let contentList = realmObj.objects("FollowUser");
            if(contentList && contentList.length > 0){
                this.setState({
                    joinList:contentList
                });
            }
        }catch(e){}
    }

    //关注或取消关注
    join(id,status){
        try{
            //更新服务器
            let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let text = '关注';
            request.get(host + '/api/user/guanzhu').query({userid:userid,followid:id,status:status,_t:Math.random()}).end((err,res)=>{
                if(res.body.state === 'ok'){
                    realmObj.write(()=>{
                        if(status === 1){
                            realmObj.create("FollowUser",{id:id},true);
                        }else{
                            text = '取消关注';
                            realmObj.delete(realmObj.objects("FollowUser").filtered("id = " + id));
                        }
                        let contentList = realmObj.objects("FollowUser");
                        if(contentList && contentList.length > 0){
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
                        this.state.content.map((item, i) => (
                            <TouchableWithoutFeedback key={i} onPress={()=>{this.props.screenProps.navigation.navigate("PersonalHome",{id:item['id']})}}>
                                <View style={styles.view}>
                                    <Image style={styles.img} source={require('../../assets/mock_data/1.jpg')}/>
                                    <View style={{flex:1}}>
                                        <Text>{item['nickname']}</Text>
                                        <Text style={{fontSize:12,marginTop:8,marginBottom:8}}>{item['intro']}</Text>
                                    </View>
                                    {
                                        inArray(this.state.joinList, item['id'], 'id') ?
                                            <Text onPress={() => {
                                                this.join(item['id'], 0)
                                            }} style={[colors.bgF8, colors.c99, styles.btn]}>已关注</Text>
                                            : <Text onPress={() => {
                                                this.join(item['id'], 1)
                                            }} style={[colors.bgBlue, colors.cWhite, styles.btn]}>关注</Text>
                                    }
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
    view:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10
    },
    img:{
        width:70,
        height:70,
        marginRight:10
    },
    btn:{
        padding:5,
        borderRadius:10,
        fontSize:12
    },
});