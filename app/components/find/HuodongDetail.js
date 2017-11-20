/**
 * 活动详情页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
//公共头部
import HTMLView from 'react-native-htmlview';
import { Header, Icon} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import {formatTime} from "../common/public";
import {getHuodongInfoByIdAction} from '../../actions/userAction';

//处理iframe
function renderNode(node, index) {
    if (node.name === 'iframe') {
        return (
            <View key={index} style={{width: 200, height: 200}}>
                <Text>
                    {node.attribs.src}
                </Text>
            </View>
        );
    }
}

class HuodongDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            huodong:{},
        };
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '活动详情'}}
                backgroundColor="#ffffff"
            />
        }
    };
    //组件加载完成以后，获取活动内容
    componentDidMount(){
        //先从realm中读取数据，如果有，直接显示，否则发送action请求网络数据
        try{
            let item = realmObj.objects("Huodong").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    huodong:item[0],
                });
            }
        }catch(e){}finally{
            this.props.dispatch(getHuodongInfoByIdAction(this.state.id,this._loadHuodongComplete));
        }
    }
    //获取活动内容完毕
    _loadHuodongComplete = ()=>{
        try{
            let item = realmObj.objects("Huodong").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    content:item[0],
                });
            }
        }catch(e){}
    };
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.huodong['title']}</Text>
                <ScrollView style={styles.htmlContainer}>
                    <HTMLView
                        value={this.state.huodong['content']}
                        stylesheet={styles}
                        renderNode={renderNode}
                        addLineBreaks={false}
                        onLinkPress={(url) => {this.props.navigation.navigate("ShowUrl",{url:url})}}
                    />
                </ScrollView>
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
export default connect(select)(HuodongDetail);

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
    }
});