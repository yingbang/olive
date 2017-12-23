/**
 * 橄榄枝小助手、橄榄枝小喇叭
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';
import {CachedImage} from '../common/ImageCacheMy';

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

export default class XiaoxiDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            content:[],
            type:1
        }
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '橄榄枝消息'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    componentDidMount(){
        let type = this.props.navigation.state.params.type;
        let data = this.props.navigation.state.params.data;
        this.setState({
            content:data,
            type:type
        });
    }
    _keyExtractor = (item, index) => item.id;
    _renderRow = ({item}) => (
        <View style={{flexDirection:'row',marginTop:10}}>
            <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#00bfff",marginRight:10,alignItems:'center',justifyContent:'center'}}>
                {
                    (this.state.type === 1) ?
                        <CachedImage style={{width:26,height:26,tintColor:'#ffffff'}} source={require('../../assets/icon/iconcase.png')} /> :
                        <CachedImage style={{width:20,height:20,tintColor:'#ffffff'}} source={require('../../assets/icon/iconlaba.png')} />
                }
            </View>
            <View style={{flex:1}}>
                <Text style={{marginBottom:10,fontWeight:'bold'}}>{item['title']}</Text>
                <View>
                    <HTMLView
                        value={item['content']}
                        stylesheet={styles}
                        renderNode={renderNode}
                        addLineBreaks={false}
                        onLinkPress={(url) => {this.linkPress(url)}}
                    />
                </View>
            </View>
        </View>
    );
    //打开文章中链接
    linkPress(url){
        if(this.props.screenProps){
            this.props.screenProps.navigation.navigate("ShowUrl",{url:url});
        }else{
            this.props.navigation.navigate("ShowUrl",{url:url});
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.content}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderRow}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title:{
        padding:8,
        paddingTop:12,
        alignSelf:'center',
        fontWeight:'bold'
    },
    htmlContainer:{
        padding:8,
        paddingTop:0
    },
    p:{
        marginBottom:8,
        lineHeight:26,
    },
    div:{
        marginBottom:8,
        lineHeight:26,
    },
});