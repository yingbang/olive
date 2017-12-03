/**
 * 搜索页面
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Button
} from 'react-native';
import SearchHeader from './SearchHeader';

export default class Index extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <SearchHeader {...HeaderProps}/>
        }
    };
    render(){
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>热门搜索</Text>
                <View style={styles.hot}>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"跑步"});}} style={styles.item}>跑步</Text>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"健身"});}} style={styles.item}>健身</Text>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"骑行"});}} style={styles.item}>骑行</Text>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"拉伸"});}} style={styles.item}>拉伸</Text>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"拉伸运动视频"});}} style={styles.item}>拉伸运动视频</Text>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"热身"});}} style={styles.item}>热身</Text>
                    <Text onPress={()=>{this.props.navigation.navigate("SearchResult",{keyword:"运动团"});}} style={styles.item}>运动团</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding:8,
        paddingTop:20
    },
    title:{
        color:'#aaa'
    },
    hot:{
        marginTop:20,
        flexWrap:'wrap',
        flexDirection:'row'
    },
    item:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#f2f2f2',
        marginRight:8,
        marginBottom:8
    },
});