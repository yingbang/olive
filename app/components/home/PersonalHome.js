/**
 * 个人主页
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import ParallaxScrollView from '../common/parallax/index';
import Blank from '../common/Blank';

const window = Dimensions.get('window');
const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 40;

const contentList = [
    {
        key:0,
        title: 'Appointments',
    },
    {
        key:1,
        title: 'Trips',
    },
    {
        key:2,
        title: 'Trips',
    },
    {
        key:3,
        title: 'Trips',
    },
    {
        key:4,
        title: 'Trips',
    },
]
export default class PersonalHome extends Component{

    static navigationOptions = {
        header:null
    };
    /**
     * 点击返回按钮
     */
    pressBack(){
        this.props.navigation.goBack();
    }
    _onPressItem = (id) => {
        this.props.navigation.navigate("NewsDetail");
    };
    renderRow = ({item}) => (
        <View style={{marginBottom:8}}>
            <TouchableWithoutFeedback>
                <View>
                    <View style={{padding:8}}>
                        <Text>橄榄枝新品发布会成功举行！两款智能装备将为这个跑马季带来无限新动力！智能跑鞋源自UA生产线，采用创新高科技鞋底技术</Text>
                        <Text style={{color:'#00bfff',marginTop:5}}>查看全文</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:10,paddingTop:5,paddingLeft:8,paddingBottom:5,backgroundColor:'#f8f8f8'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TouchableWithoutFeedback onPress={()=>{alert('赞')}}>
                                <View style={{flexDirection:'row',marginRight:15,alignItems:'center'}}>
                                    <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconzan.png')}/>
                                    <Text>33</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{alert('评论')}}>
                                <View style={{flexDirection:'row',marginRight:15,alignItems:'center'}}>
                                    <Image style={{width:15,height:15,tintColor:'#999999',marginRight:5}} source={require('../../assets/icon/iconpinglun.png')}/>
                                    <Text>10</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
    render(){
        const { onScroll = () => {} } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <ParallaxScrollView
                        onScroll={onScroll}
                        BackgroundColor="#ffffff"
                        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                        backgroundSpeed={10}
                        renderBackground={() => (
                            <View key="background">
                                <Image source={{uri: 'https://b-ssl.duitang.com/uploads/item/201601/19/20160119123125_sFyLM.thumb.700_0.png',
                                    width: window.width,
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                                <View style={{position: 'absolute',
                                    top: 0,
                                    width: window.width,
                                    backgroundColor: 'rgba(0,0,0,.4)',
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                            </View>
                        )}
                        renderForeground={() => (
                            <View key="parallax-header" style={ styles.parallaxHeader }>
                                <Image style={ styles.avatar } source={{
                                    uri: 'https://b-ssl.duitang.com/uploads/item/201708/11/20170811231309_WF8f3.thumb.700_0.jpeg',
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE
                                }}/>
                                <Text style={ styles.sectionSpeakerText }>小鱼儿</Text>
                                <Text style={ styles.sectionTitleText }>
                                    寻找那属于所有人的美好
                                </Text>
                            </View>
                        )}
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection}>
                                <TouchableWithoutFeedback onPress={()=>this.pressBack()}>
                                    <View>
                                        <Image style={{width:15,height:15,marginLeft:8}} source={require('../../assets/icon/iconback.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={styles.stickySectionText}>小鱼儿</Text>
                                <TouchableWithoutFeedback>
                                    <View>
                                        <Text style={{fontSize:14,marginRight:8}}>编辑</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                        renderFixedHeader={()=>(
                            <View key="fixed-header" style={styles.fixedSection}>
                                <TouchableWithoutFeedback onPress={()=>this.pressBack()}>
                                    <View style={{flex:1}}>
                                        <Image style={{width:15,height:15,marginLeft:8,tintColor:'#ffffff'}} source={require('../../assets/icon/iconback.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View>
                                        <Text style={{color:'#ffffff',fontSize:14,marginRight:8}}>编辑</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                    >
                        <FlatList
                            renderItem={this.renderRow}
                            data={contentList}
                            style={styles.container}
                            ListFooterComponent={Blank}
                            ListHeaderComponent={Blank}
                        />

                    </ParallaxScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#f8f8f8'
    },
    stickySectionText: {
        fontSize: 14,
        textAlign:'center',
        flex:1
    },
    fixedSection: {
        flexDirection:'row',
        alignItems:'center',
    },
    fixedSectionText: {
        fontSize: 14,
        color:'#ffffff',
        marginRight:8
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop:50
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 12,
        paddingVertical: 5
    },
});