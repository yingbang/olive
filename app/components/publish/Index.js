/**
 * 发布
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Item,
    Input,
    Label,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';

const {height, width} = Dimensions.get('window');

export default class PublishIndex extends Component{


    /**
     * 点击发布动态
     */
    pressFabuDongtai(){
        this.props.navigation.navigate('PublishEdit',{quanzi:0});
    }
    /**
     * 点击取消按钮
     */
    pressCancel(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Tab'}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
    render(){
        return (
            <Container style={globalStyle.containerWithoutStatusBar}>
                <StatusBar hidden={true}/>
                <Content style={globalStyle.content}>
                    <ImageBackground style={globalStyle.wholeBackground} source={require('../../assets/images/publish_bg.jpg')}>
                        <View style={styles.fabuView}>
                            <TouchableWithoutFeedback onPress={()=>this.pressFabuDongtai()}>
                                <View style={[colors.bgBlue,styles.fabuImageView]}>
                                    <Image style={[colors.tintWhite,styles.fabuImage]} source={require('../../assets/icon/iconpublish_fabu.png')}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text>发布动态</Text>
                            <TouchableOpacity onPress={()=>this.pressCancel()}>
                                <Image style={[colors.tintBlue,styles.fabuImageClose]} source={require('../../assets/icon/iconpublish_close.png')}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    fabuView:{
        flex:1,
        alignItems:'center',
        position:'absolute',
        bottom:30,
        left:width/2 - 40
    },
    fabuImageView:{
        width:80,
        height:80,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    },
    fabuImage:{
        width:40,
        height:40,
    },
    fabuImageClose:{
        width:30,
        height:30,
        marginTop:50
    },
});