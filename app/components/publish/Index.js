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
    StatusBar,
    Modal
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Item,
    Input,
    Label,
} from 'native-base';
import { NavigationActions} from 'react-navigation';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

const {width} = Dimensions.get('window');

export default class PublishIndex extends Component{

    constructor(props){
        super(props);
        this.state={
            renzheng:false
        }
    }

    componentDidMount(){
        this.getStatus();
    }

    getStatus(){
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let userInfo = realmObj.objects("User").filtered("id == "+userid);
        if(userInfo && userInfo.length > 0){
            let renzheng = userInfo[0]['renzhengzhuangtai'];
            if(renzheng === 1){
                this.setState({
                    renzheng:true
                });
            }
        }
    }

    /**
     * 点击发布动态，需要先进行身份验证
     */
    pressFabuDongtai(){
        this.getStatus();
        if(this.state.renzheng === true){
            this.props.navigation.navigate('PublishEdit',{quanzi:0});
        }else{
            this.props.navigation.navigate('Renzheng');
        }
    }
    /**
     * 点击取消按钮
     */
    pressCancel(){

        let prevState = realmObj.objects("Global").filtered("key == 'prevStateRouteIndex'");
        //console.log("c:"+prevState[0]['value']);
        let routeName="HomeContainer";
        if(prevState && prevState.length > 0){
            routeName = prevState[0]['value'];
        }
        const navigateAction = NavigationActions.navigate({
            routeName: 'Tab',
            params: {},
            action: NavigationActions.navigate({ routeName: routeName})
        });
        this.props.navigation.dispatch(navigateAction);

    }
    /*
    * 关闭按钮
    * <TouchableOpacity onPress={()=>this.pressCancel()}>
        <Image style={[colors.tintBlue,styles.fabuImageClose]} source={require('../../assets/icon/iconpublish_close.png')}/>
      </TouchableOpacity>
    * */
    render(){
        return (
            <Container style={globalStyle.containerWithoutStatusBar}>
                <StatusBar hidden={false}/>
                <Content style={globalStyle.content}>
                    <ImageBackground style={globalStyle.wholeBackground} source={require('../../assets/images/publish_bg.jpg')}>
                        <View style={styles.fabuView}>
                            <TouchableWithoutFeedback onPress={()=>this.pressFabuDongtai()}>
                                <View style={[colors.bgBlue,styles.fabuImageView]}>
                                    <Image style={[colors.tintWhite,styles.fabuImage]} source={require('../../assets/icon/iconpublish_fabu.png')}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text>发布动态</Text>
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
        bottom:120,//全屏，有关闭按钮：30
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