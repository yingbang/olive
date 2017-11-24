/**
 * 活动报名
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import {connect} from 'react-redux';
//公共头部
import { Card, List, ListItem, Button,Header} from 'react-native-elements';
import {formatTime} from '../common/public';
import {isMobile} from '../common/Validate';
import {toastShort} from '../common/ToastTool';
import {getBaomingInfoByIdAction,huodongBaomingAction} from '../../actions/userAction';


class HuodongBaoMing extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            huodong:{},
            userInfo:{},
            baoming:false,//是否报名
            mobile:"",//有可能会修改电话
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '活动报名'}}
                backgroundColor="#ffffff"
            />
        }
    };
    //组件加载完成以后，获取活动内容
    componentDidMount(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        try{
            //获取活动信息
            let item = realmObj.objects("Huodong").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    huodong:item[0],
                });
            }
            //获取会员信息
            let userInfo = realmObj.objects("User").filtered("id == "+userid);
            if(userInfo !== null && userInfo.length > 0){
                this.setState({
                    userInfo:userInfo[0],
                });
            }
            //是否已经报名
            let baoming = realmObj.objects("HuodongBaoming").filtered("userid == "+userid+" and huodongid == "+this.state.id);
            if(baoming !== null && baoming.length > 0){
                this.setState({
                    baoming:true,
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getBaomingInfoByIdAction(userid,this.state.id,this._loadBaomingComplete));
        }
    }
    //获取报名信息完毕
    _loadBaomingComplete = ()=>{
        try{
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            let item = realmObj.objects("HuodongBaoming").filtered("userid == "+userid+" and huodongid == "+this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    baoming:true,
                });
            }
        }catch(e){}
    };
    //确认报名
    baomingSubmit(){
        let mobile = this.state.mobile || this.state.userInfo['mobile'];
        if(isMobile(mobile) !== true){
            toastShort("手机号码不正确");
            return;
        }
        this.props.dispatch(huodongBaomingAction(this.state.id,this.state.userInfo['nickname'],mobile,(result)=>{this._loadSubmitComplete(result)}));
    }
    //报名完成
    _loadSubmitComplete(result){
        if(result.state === 'fail'){
            toastShort("报名失败："+result.msg);
        }else{
            toastShort("报名成功！");
            this.setState({
                baoming:true,
            });
        }
    }
    render(){
        let item = this.state.huodong;
        let user = this.state.userInfo;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Card containerStyle={{marginLeft:0,marginRight:0,marginTop:10,marginBottom:10}} image={require('../../assets/mock_data/2.jpg')}>
                        <View>
                            <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                            <View style={styles.huodongItemTime}>
                                <Text>活动日期：</Text>
                                <Text style={{flex:1,fontSize:12}}>{formatTime(item['starttime'],"yyyy年MM月dd日 周w hh:mm")}</Text>
                            </View>
                            <View style={styles.huodongItemTime}>
                                <Text>活动地点：</Text>
                                <Text style={{flex:1,fontSize:12}}>{item['address']}</Text>
                            </View>
                            <View style={styles.huodongItemTime}>
                                <Text>报名人：</Text>
                                <Text style={{flex:1,fontSize:12}}>{user['nickname']}</Text>
                            </View>
                            <View style={styles.huodongItemTime}>
                                <Text>手机号码：</Text>
                                <TextInput style={{flex:1,width:null,height: 30, borderColor: '#f2f2f2', borderWidth: 1}} defaultValue={user['mobile']} onChangeText={(text)=>{this.setState({mobile:text});}}/>
                            </View>
                        </View>
                    </Card>
                </ScrollView>
                <View style={styles.baoming}>
                    {
                        this.state.baoming ?
                            <Button
                                backgroundColor='#dddddd'
                                color='#666666'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title={'您已经报名！'} /> :
                            <Button
                                backgroundColor='#03A9F4'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                onPress={() => {this.baomingSubmit()}}
                                title='确认报名' />
                    }
                </View>
            </View>
        );
    }
}

function select(state) {
    const {userReducer} = state;
    return {
        userReducer
    }
}
export default connect(select)(HuodongBaoMing);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title:{
        padding:8,
        paddingTop:12,
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16
    },
    htmlContainer:{
        padding:8,
        paddingTop:0
    },
    p:{
        marginBottom:8
    },
    div:{
        marginBottom:8
    },
    icon:{
        marginLeft:10
    },
    huodongItemTitle:{
        fontSize:16,
        color:'#333333',
        marginBottom:15,
    },
    huodongItemTime:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        marginBottom:10,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2'
    },
    huodongItemTimeImage:{
        width:18,
        height:18,
        marginRight:3
    },
    huodongDetail:{
        marginTop:10,
        marginBottom:20,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2'
    },
    baoming:{
        paddingTop:8,
        paddingBottom:8,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2'
    }
});