import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    Button,
    FlatList
} from 'react-native';
//公共头部
import { Card, List, ListItem, Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';

const contentList = [
    {
        key:0,
        title: '橄榄枝小助手',
    },
    {
        key:1,
        title: '莎莎',
    },
    {
        key:2,
        title: '明明',
    },
    {
        key:3,
        title: '花花',
    },
]

export default class XiaoXi extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '我的消息'}}
                rightComponent={<Text>联系人</Text>}
                backgroundColor="#ffffff"
            />
        }
    };
    renderRow = ({item}) => (
        <ListItem
            roundAvatar
            hideChevron
            title={item.title}
            subtitle={
                <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>女孩请进，男孩止步</Text>
                </View>
            }
            avatar={require('../../assets/mock_data/1.jpg')}
            avatarStyle={styles.avatar}
            rightTitle="9-20"
            containerStyle={[globalStyle.listItem,{marginTop:item.isDivider ? 8 : 0}]}
        />
    );
    render(){
        return (
            <ScrollView style={styles.container}>
                <List containerStyle={globalStyle.listContainer}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={contentList}
                    />
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    avatar:{
        width:40,
        height:40
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        color: 'grey'
    }
});