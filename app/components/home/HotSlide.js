import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
} from 'react-native';
import Carousel from '../common/Carousel';
import ScrollVertical from '../common/ScrollVertical';
import {getSlideAction, getNoticeAction} from '../../actions/toolAction';
import {getFullPath} from '../common/public';
import {CachedImage} from '../common/ImageCacheMy';

const { width } = Dimensions.get('window');

export default class HotSlide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slide:[{}],//幻灯片
            currentSlidePage:0,//幻灯片索引，从0开始
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    //获取幻灯片、头条、公益组织、达人、动态等
    componentDidMount(){
        try{
            //幻灯片
            let slideList = realmObj.objects("Slide");
            this.setState({
                slide:slideList.length >= 0 ? slideList.sorted('id',true) : [{}],
            });
        }catch(e){
            console.log(e);
        }finally {
            this.props.screenProps.dispatch(getSlideAction());
            this.props.screenProps.dispatch(getNoticeAction(1));
        }
    }
    onPressSlide(){
        let item = this.state.slide[this.state.currentSlidePage];
        this.props.screenProps.navigation.navigate("ShowUrl",{url:item.url});
    }
    render(){
        return (
            <View style={styles.block}>
                <Carousel
                    delay={4000}
                    style={styles.carousel}
                    autoplay
                    pageInfo={false}
                    swiper
                    onAnimateNextPage={(p) => {this.setState({currentSlidePage:p})}}
                    bullets={true}
                    onClick={()=>{this.onPressSlide()}}
                >
                    {
                        this.state.slide.map((item,i)=>{
                            return (
                                <View key={i} style={styles.carousel}>
                                    <CachedImage style={styles.carousel} source={{uri:getFullPath(item['pic'],this.state.host)}}/>
                                </View>
                            );
                        })
                    }
                </Carousel>
                <TouchableWithoutFeedback>
                    <View style={styles.toutiao}>
                        <Text style={{color:'#00bfff',fontWeight:'600',marginRight:10}}>头条</Text>
                        <ScrollVertical
                            onChange={(index => {
                                this.index = index;
                            })}
                            onClick={(id)=>{this.props.screenProps.navigation.navigate("NoticeDetail",{id:id})}}
                            enableAnimation={true}
                            data={realmObj.objects("Notice").filtered("type == 0")}
                            delay={2500}
                            duration={1000}
                            scrollHeight={17}
                            scrollStyle={{flex:1}}
                            kbContainer={{flex:1,marginTop:(Platform.OS === 'ios') ? 4 : 0}}
                            textStyle={{fontSize: 12 }} />
                        <View style={{height:20,position:'absolute',right:0,top:4,backgroundColor:'#ffffff'}}>
                            <CachedImage style={{width:14,height:14}} source={require('../../assets/icon/icongo.png')}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8,
    },
    carousel:{
        width:width - 16,//去掉两边的padding
        height:150
    },
    toutiao:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:8,
        overflow:'hidden'
    },
});