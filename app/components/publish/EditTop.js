/**
 * 我的页面头部封装
 * 如果需要右侧的图标，需要设置rightIcon和onPressRightIcon
 * <MyTop title="意见反馈" onPressRightIcon={()=>{}} rightIcon={require('../../assets/icon/iconmore.png')} {...HeaderProps}/>
 *
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class EditTop extends Component {

    /**
     * 点击返回按钮
     */
    pressBack(){
        const { navigation } = this.props;
        navigation.goBack();
    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.pressBack()}>
                    <Image style={styles.imageBack} source={require('../../assets/icon/iconclose.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,height:30}}>
                    <View style={styles.textView}>
                        <Text>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.onPressRightIcon()}>
                    <View style={{marginRight:8}}>
                        <Text style={{color:'#00bfff'}}>发布</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#ffffff',
        alignItems:'center',
        padding:8,
        borderBottomWidth:1,
        borderBottomColor:'#f8f8f8'
    },
    textView:{
        flex:1,
        height: 30,
        //设置相对父控件居中
        alignSelf: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    imageBack:{
        width:15,
        height:15,
    }
});