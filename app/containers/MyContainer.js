/**
 * 容器型组件
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import { Header } from 'react-native-elements';
import MyIndex from '../components/my/Index';

class MyContainer extends Component {
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                rightComponent={<TouchableWithoutFeedback onPress={()=>{HeaderProps.navigation.navigate('XiaoXi')}}>
                    <View style={styles.header}>
                        <Image source={require('../assets/icon/iconmessage.png')} style={styles.image} />
                        <View style={styles.imageTip}>
                            <Text style={styles.tipText}>3</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>}
                backgroundColor="#ffffff"
                outerContainerStyles={{borderBottomWidth:0,paddingBottom:0}}
            />
        }
    };
    render() {
        return (
            <MyIndex {...this.props}/>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        height:30,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingRight:10,
        backgroundColor:'#ffffff',
    },
    image:{
        width:25,
        height:25,
    },
    imageTip:{
        backgroundColor:'#ff4343',
        position:'absolute',
        top:3,
        right:5,
        width:14,
        height:14,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    tipText:{
        fontSize:10,
        color:'#ffffff'
    },
});

function select(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}
export default connect(select)(MyContainer);