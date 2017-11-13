/**
 * 倒计时组件
 */
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
export default class TimerButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 90,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: true,
        };
        this._shouldStartCountting = this._shouldStartCountting.bind(this)
        this._countDownAction = this._countDownAction.bind(this)
    }

    _countDownAction(){
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() =>{
            const timer = this.state.timerCount - 1
            if(timer===0){
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            }else{
                console.log("---- timer ",timer);
                this.setState({
                    timerCount:timer,
                    timerTitle: `重新获取(${timer}s)`,
                })
            }
        },1000)
    }
    _shouldStartCountting(shouldStart){
        if (this.state.counting) {return}
        if (shouldStart) {
            this._countDownAction()
            this.setState({counting: true,selfEnable:false})
        }else{
            this.setState({selfEnable:true})
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        const {onClick,style,textStyle,enable,disableColor} = this.props
        const {counting,timerTitle,selfEnable} = this.state
        return (
            <Text onPress={()=>{
                if (!counting && enable && selfEnable) {
                    this.setState({selfEnable:false})
                    this.props.onClick(this._shouldStartCountting)
                };
            }} style={[{fontSize: 16},textStyle,{color: ((!counting && enable && selfEnable) ? textStyle.color : disableColor || 'gray')}]}>{timerTitle}</Text>
        )
    }
}
/**
 *
 *
 * 可以用这个：https://github.com/yongqianvip/RNCountDown
 *
<TimerText enable={this.state.mobile.length}
 style={colors.cWhite}
 textStyle={{color:'#fff'}}
 timerCount={10}
 onClick={(shouldStartCountting)=>{this.getCode(shouldStartCountting)}}/>


getCode(callback) {
    //验证信息
    let mobile = this.state.mobile;
    let checkMobile = isMobile(mobile);
    if(checkMobile.msg){
        toastShort(checkMobile.msg);
        return false;
    }
    //执行回调
    callback && callback(true);
    //发送
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    let _that = this;
    request('GET',host + '/api/user/sendCode?mobile=' + mobile + '&type=0')
        .set('accept','json')
        .end(function (err, res) {
            if(res.body.state === 'fail'){
                //执行回调
                callback && callback(false);
                toastShort("短信发送失败！");
            }else if(res.body.state === 'ok'){
                toastShort("短信发送成功！");
            }
        });
}

 onClick：触发后按钮selfEnable会立即被置为false
 通过onClick中的一系列逻辑处理之后需要调用回调函数结束倒计时
 shouldStartCountting：回调函数，接受一个Bool类型的参数
 shouldStartCountting(true)，开始倒计时，倒计时结束时自动恢复初始状态
 shouldStartCountting(false)， 按钮的selfEnable会立即被置为true

 *
 *
 *
 */