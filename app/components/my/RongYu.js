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
import {List, ListItem, Header} from 'react-native-elements';
import BlankRongyu from "../common/BlankRongyu";

export default class RongYu extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '我的荣誉勋章'}}
                backgroundColor="#ffffff"
            />
        }
    };
    render(){
        return (
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <BlankRongyu/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});