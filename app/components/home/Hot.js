/**
 * 首页：热门
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
import HeaderWithSearch from '../common/HeaderWithSearch';
import Carousel from '../common/Carousel';

const { width, height } = Dimensions.get('window');

export default class Hot extends Component{

    static navigationOptions = {
        header:<HeaderWithSearch/>
    };

    constructor(props) {
        super(props);

        this.state = {
            size: { width:width, height:150 },
        };
    }

    render(){
        return (
            <View style={styles.container}>
                <Carousel
                    delay={4000}
                    style={this.state.size}
                    autoplay
                    pageInfo={false}
                    swiper
                    onAnimateNextPage={(p) => console.log(p)}
                    bullets={true}
                >
                    <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}>
                        <Image style={{width:width,height:150}} source={{uri:'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201707/jiaoben5258/images/3-1.jpg'}}/>
                    </View>
                    <View style={[{ backgroundColor: 'green' }, this.state.size]}>
                        <Image style={{width:width,height:150}} source={{uri:'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201707/jiaoben5258/images/2-1.jpg'}}/>
                    </View>
                    <View style={[{ backgroundColor: 'blue' }, this.state.size]}>
                        <Image style={{width:width,height:150}} source={{uri:'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201707/jiaoben5258/images/1-1.jpg'}}/>
                    </View>
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    block:{
        backgroundColor:'#ffffff',
        padding:8,
        marginBottom:8
    },
    page: {
        flex: 1,
        height: 130,
        resizeMode: 'stretch'
    },
    toutiao:{
        flexDirection:'row',
        alignItems:'center'
    },
});