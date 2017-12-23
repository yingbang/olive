import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import colors from '../common/Colors';
import globalStyle from '../common/GlobalStyle';
import { Card, Button} from 'react-native-elements';
import {formatTime,isExpired,getFullPath,inArray} from '../common/public';
//import {LazyloadImage} from '../common/lazyload';//LazyloadImage host={lazyloadName}
import {CachedImage} from '../common/ImageCacheMy';

//const lazyloadName = "lazyload-huodongList";//懒加载的name
const {width} = Dimensions.get("window");

export default class QuanziItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    render(){
        let item = this.props.item;
        return (
            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("QuanziDongtai",{id:item['id']})}}>
                <View style={styles.quanziView}>
                    {
                        item['pic'] ?
                            <CachedImage style={[globalStyle.defaultAvatarImage,styles.quanziImage]} source={{uri:getFullPath(item['pic'],this.state.host)}}/>
                            :
                            <CachedImage style={[globalStyle.defaultAvatar,styles.quanziImage]} source={require('../../assets/icon/iconhead.png')}/>
                    }
                    <Text style={styles.quanziText}>{item['title']}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    quanziView:{
        alignItems:'center',
        marginLeft:8
    },
    quanziImage:{
        width:40,
        height:40,
        borderRadius:20,
        marginRight:0
    },
    quanziMore:{
        width:40,
        height:40,
        borderRadius:20,
        alignSelf:'center',
        tintColor:'#aaaaaa'
    },
    quanziText:{
        fontSize:12,
        marginTop:8
    },
});