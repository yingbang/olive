/**
 * 资讯详情页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
//公共头部
import { Header, Icon} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

export default class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            isCollect:true
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                rightComponent={<View style={globalStyle.flexRow}>
                    <Icon style={styles.icon} onPress={()=>{HeaderProps.scene.route.params.collect()}} name={HeaderProps.scene.route.params.isCollect ? "star" : "star-o"} type="font-awesome"/>
                    <Icon style={styles.icon} onPress={()=>{HeaderProps.scene.route.params.share()}} name="share-alt" type="font-awesome"/>
                </View>}
                backgroundColor="#ffffff"
            />
        }
    };
    //组件加载完成以后，获取文章内容
    componentDidMount(){
        this.props.navigation.setParams({isCollect:this.state.isCollect,collect:()=>{this._collect()}, share:()=>{this._share()}});
        //先从realm中读取数据，如果有，直接显示，否则发送action请求网络数据
        try{

        }catch(e){}
    }
    //收藏
    _collect(){
        let newState = !this.state.isCollect;
        this.setState({
            isCollect:newState
        });
        this.props.navigation.setParams({isCollect:newState});
    }
    //分享
    _share(){
        alert(this.state.id)
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>newsDetail{this.state.id}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    icon:{
        marginLeft:10
    }
});