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
import DetailTop from '../../common/DetailTop';

export default class NewsDetail extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <DetailTop {...HeaderProps}/>
        }
    };
    render(){
        return (
            <View style={styles.container}>
                <Text>newsDetail</Text>
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
});