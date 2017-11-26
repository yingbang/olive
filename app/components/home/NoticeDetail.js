/**
 * 公告详情
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
    TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';

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

export default class NoticeDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            content:""
        }
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '公告详情'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    componentDidMount(){
        let id = this.props.navigation.state.params.id;
        let item = realmObj.objects("Notice").filtered("id="+id);
        if(item !== null && item.length > 0){
            this.setState({
                title:item[0]['title'],
                content:item[0]['content']
            });
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.title}</Text>
                <ScrollView style={styles.htmlContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <HTMLView
                        value={this.state.content}
                        stylesheet={styles}
                        renderNode={renderNode}
                        addLineBreaks={false}
                        onLinkPress={(url) => {this.props.screenProps.navigation.navigate("ShowUrl",{url:url})}}
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
        marginBottom:8
    },
    div:{
        marginBottom:8
    },
});