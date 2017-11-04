/**
 * 资讯
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    Text
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Item,
    Input,
    Label,
    List,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';


export default class NewsIndex extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem style={{marginLeft:0}}>
                            <Body>
                            <View style={styles.cell_container}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.leftTop}>橄榄枝推荐</Text>
                                    <Text style={styles.leftMiddle}>新闻标题</Text>
                                    <View style={styles.leftBottom}>
                                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_views.png')}/>
                                        <Text style={styles.bottomText}>0</Text>
                                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_pinglun.png')}/>
                                        <Text style={styles.bottomText}>11</Text>
                                    </View>
                                </View>
                            </View>
                            </Body>
                            <Thumbnail square style={{width:100,height:100}} source={require('../../assets/mock_data/1.jpg')} />
                        </ListItem>
                        <ListItem style={{marginLeft:0}}>
                            <Body>
                            <View style={styles.cell_container}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.leftTop}>橄榄枝推荐</Text>
                                    <Text style={styles.leftMiddle}>新闻标题</Text>
                                    <View style={styles.leftBottom}>
                                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_views.png')}/>
                                        <Text style={styles.bottomText}>0</Text>
                                        <Image style={styles.bottomImage} source={require('../../assets/icon/iconnews_pinglun.png')}/>
                                        <Text style={styles.bottomText}>11</Text>
                                    </View>
                                </View>
                            </View>
                            </Body>
                            <Thumbnail square style={{width:100,height:100}} source={require('../../assets/mock_data/1.jpg')} />
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cell_container:{
        flex:1,
        flexDirection:'row',
    },
    itemLeft:{
        flex:1,
        paddingLeft:10,
    },
    leftTop:{
        fontSize:12,
        color:'#00BFFF',
        marginBottom:8
    },
    leftMiddle:{
        fontSize:14,
        color:'#333333',
        marginBottom:8
    },
    leftBottom:{
        flexDirection:'row',
        alignItems:'center'
    },
    textBorder:{
        borderWidth:1,
        borderColor:'#ff4343',
        paddingLeft:3,
        paddingRight:1,
        color:'#ff4343'
    },
    bottomText:{
        fontSize:10,
        marginRight:10
    },
    bottomImage:{
        width:12,
        height:12,
        marginRight:2,
        tintColor:'#aaaaaa'
    }
});
