/**
 * 发现
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
    FlatList,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import fonts from '../common/Fonts';
import { Card, List, ListItem, Button} from 'react-native-elements';
import {formatTime} from '../common/public';
import {getHuodongAction} from '../../actions/userAction';
const {width} = Dimensions.get("window");

class FindIndex extends Component{
    constructor(props) {
        super(props);

        this.state = {
            huodong:[],
            currentHuodongPage:1,
            loadHuodongFinish:false,
            loading:false,
        };
    }
    //获取活动
    componentDidMount(){
        try{
            //活动
            let huodongList = realmObj.objects("Huodong");
            if(huodongList.length > 0){
                huodongList = huodongList.sorted('id',true);
                this.setState({
                    huodong:huodongList
                });
            }
        }catch(e){
            console.log(e);
        }finally {
            this.props.dispatch(getHuodongAction(this.state.currentHuodongPage,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
        }
    }
    //网络请求加载完成
    _loadHuodongComplete(totalPage){
        try{
            let contentList = realmObj.objects("Huodong");
            if(contentList.length > 0){
                contentList = contentList.sorted('id',true);
                let page = this.state.currentHuodongPage;
                this.setState({
                    huodong:contentList,
                    currentHuodongPage:page + 1,
                    loadHuodongFinish:page >= totalPage,
                    loading:false,
                });
            }
        }catch(e){}
    }
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.loadHuodongFinish === false){
                this.props.dispatch(getHuodongAction(this.state.currentHuodongPage,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
            }
        }
    };
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getHuodongAction(1,(totalPage)=>{this._loadHuodongComplete(totalPage)}));
    };
    //在上面遮罩了一层透明的，这样就可以点击了
    renderRow = ({item}) => (
        <Card containerStyle={{marginLeft:8,marginRight:8,marginTop:10}} image={require('../../assets/mock_data/2.jpg')}>
            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("HuodongDetail",{id:item.id})}}>
                <View style={{height:150,width:width-18,flex:1,backgroundColor:"transparent",position:'absolute',top:-150,left:0}}>
                    <Text> </Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("HuodongDetail",{id:item.id})}}>
                <View>
                    <Text style={styles.huodongItemTitle}>{item['title']}</Text>
                    <Text style={{marginBottom: 10,fontSize:14,color:'#666666'}}>{item['intro']}</Text>
                    <View style={styles.huodongItemTime}>
                        <Image style={styles.huodongItemTimeImage} source={require('../../assets/icon/icontime.png')}/>
                        <Text style={{flex:1,fontSize:12}}>{formatTime(item['starttime'],"MM月dd日 周w hh:mm")}</Text>
                        <Text style={{fontSize:12}}>已有<Text style={{color:'#00bfff'}}>{item['number']}</Text>人报名</Text>
                    </View>
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='我要报名' />
                </View>
            </TouchableWithoutFeedback>
        </Card>

    );
    render(){
        return (
            <ScrollView style={styles.container}
                        onMomentumScrollEnd = {this._contentViewScroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.loading}
                                onRefresh={this._refresh.bind(this)}
                            />
                        }
            >
                <View style={styles.quanziContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
                        <TouchableWithoutFeedback>
                            <View style={styles.quanziView}>
                                <Image style={styles.quanziImage} source={require('../../assets/mock_data/1.jpg')}/>
                                <Text style={styles.quanziText}>我的圈子</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.quanziView}>
                                <Image style={styles.quanziImage} source={require('../../assets/mock_data/1.jpg')}/>
                                <Text style={styles.quanziText}>科技</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.quanziView}>
                                <Image style={styles.quanziImage} source={require('../../assets/mock_data/1.jpg')}/>
                                <Text style={styles.quanziText}>软件开发</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <List containerStyle={[globalStyle.listContainer,colors.bgF8]}>
                    <FlatList
                        renderItem={this.renderRow}
                        data={this.state.huodong}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                    />
                </List>
            </ScrollView>
        );
    }
}

function select(state) {
    const {userReducer} = state;
    return {
        userReducer
    }
}
export default connect(select)(FindIndex);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
    },
    quanziContainer:{
        backgroundColor:'#ffffff',
        paddingBottom:8
    },
    quanziView:{
        alignItems:'center',
        marginLeft:8
    },
    quanziImage:{
        width:40,
        height:40,
        borderRadius:20
    },
    quanziText:{
        fontSize:12,
        marginTop:8
    },
    huodongItemTitle:{
        fontSize:16,
        color:'#333333',
        marginBottom:5
    },
    huodongItemTime:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    huodongItemTimeImage:{
        width:18,
        height:18,
        marginRight:3
    },
});