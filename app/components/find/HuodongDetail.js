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
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import { Card, List, ListItem, Button,Header} from 'react-native-elements';
import {formatTime,isExpired} from '../common/public';
import globalStyle from '../common/GlobalStyle';
import {getHuodongInfoByIdAction,getBaomingInfoByIdAction} from '../../actions/userAction';

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
            baoming:false
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
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        try{
            let item = realmObj.objects("Huodong").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    huodong:item[0],
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
            this.props.dispatch(getHuodongInfoByIdAction(this.state.id,this._loadHuodongComplete));
            this.props.dispatch(getBaomingInfoByIdAction(userid,this.state.id,this._loadBaomingComplete));
        }
    }
    //获取活动内容完毕
    _loadHuodongComplete = ()=>{
        try{
            let item = realmObj.objects("Huodong").filtered("id = " + this.state.id);
            if(item !== null && item.length > 0){
                this.setState({
                    huodong:item[0],
                });
            }
        }catch(e){}
    };
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
    render(){
        let item = this.state.huodong;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Card containerStyle={{marginLeft:0,marginRight:0,marginTop:10,marginBottom:10}} image={require('../../assets/mock_data/2.jpg')}>
                        <View>
                            <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                            <View style={styles.huodongItemTime}>
                                <Image style={[styles.huodongItemTimeImage,{width:22,height:22}]} source={require('../../assets/icon/icontime.png')}/>
                                <Text style={{flex:1,fontSize:12}}>{formatTime(item['starttime'],"yyyy年MM月dd日 周w hh:mm")}</Text>
                            </View>
                            <View style={styles.huodongItemTime}>
                                <Image style={styles.huodongItemTimeImage} source={require('../../assets/icon/iconaddress.png')}/>
                                <Text style={{flex:1,fontSize:12}}>{item['address']}</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.huodongDetail}>
                        <Text>活动详情</Text>
                    </View>
                    <HTMLView
                        value={item['content']}
                        stylesheet={styles}
                        renderNode={renderNode}
                        addLineBreaks={false}
                        onLinkPress={(url) => {this.props.navigation.navigate("ShowUrl",{url:url})}}
                    />
                </ScrollView>
                <View style={styles.baoming}>
                    {
                        isExpired(item['jiezhitime']) ?
                            <Button
                                backgroundColor='#dddddd'
                                color='#666666'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title={isExpired(item['endtime']) ? '活动已结束' : '报名已截止'} /> :
                            <Button
                                backgroundColor={this.state.baoming ? '#dddddd' : '#03A9F4'}
                                color={this.state.baoming ? '#666666' : '#ffffff'}
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                onPress={this.state.baoming ? ()=>{} : () => {this.props.navigation.navigate("HuodongBaoMing",{id:item['id']})}}
                                title={this.state.baoming ? '您已经报名' : '立即报名'} />
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