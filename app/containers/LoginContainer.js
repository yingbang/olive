/**
 * 容器型组件
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import request from 'superagent';
import LoginScreen from '../components/signInUp/LoginScreen';
import {connect} from 'react-redux';
//导入动作
import {loginSuccess} from '../actions/loginAction';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header:null
    };
    //返回用户信息对象
    getUserObj(json){
        return {
            id:parseInt(json['id']),
            type:parseInt(json['type']),
            flag:parseInt(json['flag']),
            name:json['name'] !== null ? json['name'] : "",
            sex:json['sex'] !== null ? json['sex'] : "",
            mobile:json['mobile'] !== null ? json['mobile'] : "",
            nickname:json['nickname'] !== null ? json['nickname'] : "",
            username:json['username'] !== null ? json['username'] : "",
            email:json['email'] !== null ? json['email'] : "",
            province:json['province'] !== null ? json['province'] : "",
            city:json['city'] !== null ? json['city'] : "",
            area:json['area'] !== null ? json['area'] : "",
            address:json['address'] !== null ? json['address'] : "",
            weixin:json['weixin'] !== null ? json['weixin'] : "",
            company:json['company'] !== null ? json['company'] : "",
            job:json['job'] !== null ? json['job'] : "",
            intro:json['intro'] !== null ? json['intro'] : "",
            renzheng:json['renzheng'] !== null ? json['renzheng']+"" : "0",
            avatar:json['avatar'] !== null ? json['avatar'] : "",
            visible:false,//自己的信息不需要显示在列表中
            renzhengleixing:json['renzhengleixing'] !== null ? json['renzhengleixing'] : 0,
            renzhengshijian:json['renzhengshijian'] !== null ? json['renzhengshijian'] : 0,
            renzhengzhuangtai:json['renzhengzhuangtai'] !== null ? json['renzhengzhuangtai'] : 0,
            shenfenzheng:json['shenfenzheng'] !== null ? json['shenfenzheng'] : "",
            idnumber:json['idnumber'] !== null ? json['idnumber'] : "",
            zhizhao:json['zhizhao'] !== null ? json['zhizhao'] : "",
            zuzhi:json['zuzhi'] !== null ? json['zuzhi'] : "",
        };
    }
    //登录成功以后
    loginSuccess = (mobile) => {
        //保存登录状态到本地数据库
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let _that = this;
        request.get(host + '/api/user/info?mobile=' + mobile).end((err,res)=>{
            let json = res.body;
            if(json.mobile !== null){
                //保存到realm
                try{
                    realmObj.write(()=>{
                        let user = this.getUserObj(json);
                        realmObj.create("User",user,true);
                        //保存当前登录的用户ID和手机号
                        realmObj.create("Global",{key:"currentUserId",value:json['id']+""},true);
                        realmObj.create("Global",{key:"currentUserMobile",value:json['mobile']},true);
                    });
                }catch(e){
                    console.log(e)
                }
                _that.props.dispatch(loginSuccess())
            }
        });
    };
    //第三方登录成功
    wxLoginSuccess = (userinfo)=>{
        try{
            realmObj.write(()=>{
                let user = this.getUserObj(userinfo);
                realmObj.create("User",user,true);
                //保存当前登录的用户ID和手机号
                realmObj.create("Global",{key:"currentUserId",value:userinfo['id']+""},true);
                realmObj.create("Global",{key:"currentUserMobile",value:userinfo['mobile']},true);
            });
        }catch(e){
            console.log(e)
        }
        this.props.dispatch(loginSuccess())
    };
    //默认显示登录页面
    render() {
        return (
            <LoginScreen {...this.props} wxLoginSuccess={(userinfo)=>{this.wxLoginSuccess(userinfo)}} loginSuccess={(mobile)=>{this.loginSuccess(mobile)}}/>
        );
    }
}

//把自己和store进行绑定，这样就可以发送action给store，然后store通过reducer发现state改变时会及时通知自己，从而改变视图内容
function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(LoginContainer);