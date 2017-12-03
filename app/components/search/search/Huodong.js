/**
 * 搜索结果：活动
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
    Button,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import BlankSearch from '../../common/BlankSearch';
import {getFullPath,strCut} from '../../common/public';
import globalStyle from '../../common/GlobalStyle';
import {getHuodongList} from '../searchAction';

const {width} = Dimensions.get("window");

class Huodong extends Component{
    constructor(props){
        super(props);
        this.state={
            keyword:this.props.screenProps.navigation.state.params.keyword,
            currentPage:1,
            isFinished:false,
            data:[],
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        };
    }
    componentDidMount(){
        let keyword = this.state.keyword;
        let page = this.state.currentPage;
        getHuodongList(keyword,page,(content)=>{this.loadUserComplete(content)});
    }
    loadUserComplete(content){
        let oldData = this.state.data;
        let newData = oldData.concat(content.list);
        let page = this.state.currentPage;
        this.setState({
            data:newData,
            currentPage:page + 1,
            isFinished:page >= content.totalPage,
        });
    }
    //把id当成key，否则会有警告
    _keyExtractor = (item, index) => item.id;
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.isFinished === false){
                getHuodongList(this.state.keyword,this.state.currentPage,(content)=>{this.loadUserComplete(content)});
            }
        }
    };
    renderRow = ({item}) => (
        <TouchableWithoutFeedback key={item.id} onPress={()=>{this.props.screenProps.navigation.navigate("HuodongDetail",{id:item.id})}}>
            <View style={{flexDirection:'row',alignItems:'center',height:100,borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                <View style={{justifyContent:'center',marginLeft:10,marginRight:10}}>
                    {
                        item['pic'] ?
                            <Image style={{width:70,height:70}} source={{uri:getFullPath(item['pic'],this.state.host)}}/> :
                            <Image style={[globalStyle.defaultAvatar,{width:70,height:70}]} source={require('../../../assets/icon/iconhead.png')}/>
                    }
                </View>
                <View>
                    <Text style={{fontSize:16,marginBottom:8,width:width-100}}>{item.title}</Text>
                    <Text style={{color:'#555',width:width-100}}>{strCut(item.intro,80)}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    render(){
        return (
            <ScrollView style={styles.container} onMomentumScrollEnd = {this._contentViewScroll} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <FlatList
                    renderItem={this.renderRow}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={BlankSearch}
                />
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
export default connect(select)(Huodong);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});