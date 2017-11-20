import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
} from 'react-native';
//公共头部
import {connect} from 'react-redux';
import { Card, List, ListItem, Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import {toastShort} from '../common/ToastTool';
import {updateUserInfoAction,getUserInfoByIdAction} from '../../actions/userAction';

class ZiLiaoUpdate extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={<Text onPress={()=>{HeaderProps.navigation.goBack();}}>取消</Text>}
                centerComponent={{ text: HeaderProps.scene.route.params.text}}
                rightComponent={<Text onPress={()=>{HeaderProps.scene.route.params.save()}}>确定</Text>}
                backgroundColor="#ffffff"
            />
        }
    };
    constructor(props){
        super(props);
        this.state={
            content:this.props.navigation.state.params.defaultValue,
            target:this.props.navigation.state.params.target,
            callback:this.props.navigation.state.params.callback,
        }
    }
    componentDidMount(){
        //确定
        this.props.navigation.setParams({save:()=>{this._save()}});
    }
    _save(){
        let content = this.state.content;
        let target = this.state.target;
        if(content === "" || target === ""){
            toastShort("请输入内容");
            return false;
        }
        this.props.dispatch(updateUserInfoAction(target + "=" + encodeURIComponent(content),(result)=>{this._saveComplete(result)}));
    }
    _saveComplete(result){
        if(result.state === 'ok'){
            toastShort("保存成功");
            //更新realm本地会员信息并回调
            let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
            this.props.dispatch(getUserInfoByIdAction(userid,this.state.callback));
            this.props.navigation.goBack();
        }else{
            toastShort("保存失败，请重试");
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.inputView,{height:180}]}>
                    <TextInput
                        placeholder=""
                        placeholderTextColor={"#999999"}
                        underlineColorAndroid={"#ffffff"}
                        style={[styles.textInputStyle,{height:this.props.navigation.state.params.multiline ? 160 : 40}]}
                        autoFocus={true}
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        clearTextOnFocus={false}
                        multiline={this.props.navigation.state.params.multiline}
                        defaultValue={this.props.navigation.state.params.defaultValue}
                        enablesReturnKeyAutomatically={true}
                        textAlignVertical="top"
                        onChangeText={(text)=>{this.setState({content:text})}}
                    />
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
export default connect(select)(ZiLiaoUpdate);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    inputView:{
        backgroundColor: '#ffffff',
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection:'row',
        //alignItems:'center',
        marginTop:10,
    },
    textInputStyle:{
        fontSize:12,
        flex:1,
    },
});