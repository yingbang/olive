import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    Button,
    FlatList,
    RefreshControl
} from 'react-native';
//公共头部
import {connect} from 'react-redux';
import {List, ListItem, Header} from 'react-native-elements';
import {getHuodongUserAction} from '../../actions/userAction';
import {getFullPath} from '../common/public';
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';

class BaomingList extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.navigation.goBack();} }}
                centerComponent={{ text: '活动报名会员'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            isFinished:false,
            loading:false,
            data:[],
            contentid:this.props.navigation.state.params.id,//活动ID
            host:realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value,
        }
    }
    //组件加载完成
    componentDidMount() {
        //从realm中读取数据，如果没有内容，则发送action请求网络数据，收到数据以后，先保存到realm数据库，然后执行回调函数，重新读取realm
        try{
            let contentList = realmObj.objects("HuodongBaoming").filtered("huodongid == "+this.state.contentid);
            if(contentList !== null && contentList.length > 0){
                this.setState({
                    data:contentList,
                });
            }
        }catch(e){
            console.log(e);
        }finally{
            this.props.dispatch(getHuodongUserAction(this.state.contentid,this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
        }
    }
    //下拉刷新
    _refresh = ()=>{
        this.setState({
            loading:true,
        });
        this.props.dispatch(getZanAction(this.state.contentid,1,(totalPage)=>{this._loadComplete(totalPage)}));
    };
    //判断是否滚动到底部
    _contentViewScroll = (e)=>{
        let offsetY = parseInt(e.nativeEvent.contentOffset.y); //滑动距离
        let contentSizeHeight = parseInt(e.nativeEvent.contentSize.height); //scrollView contentSize高度
        let oriageScrollHeight = parseInt(e.nativeEvent.layoutMeasurement.height); //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            if(this.state.isFinished === false){
                this.props.dispatch(getHuodongUserAction(this.state.contentid,this.state.currentPage,(totalPage)=>{this._loadComplete(totalPage)}));
            }
        }
    };
    //网络请求数据接收完成以后执行，重新从realm中获取数据
    _loadComplete(totalPage){
        try{
            let contentList = realmObj.objects("HuodongBaoming").filtered("huodongid == "+this.state.contentid);
            if(contentList.length > 0){
                let page = this.state.currentPage;
                this.setState({
                    data:contentList,
                    currentPage:page + 1,
                    isFinished:page >= totalPage,
                    loading:false
                });
            }else{
                this.setState({
                    loading:false,
                });
            }
        }catch(e){}
    }
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <ListItem
            roundAvatar
            key={item.id}
            hideChevron={true}
            title={item.name}
            avatar={item['avatar'] ? {uri:getFullPath(item['avatar'],this.state.host)} : require('../../assets/icon/iconhead.png')}
            onPress={()=>{this.props.navigation.navigate("PersonalHome",{id:item['userid']})}}
            containerStyle={[globalStyle.listItem,{marginTop:0}]}
            {...this.props}
        />
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
                        showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            >
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
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
export default connect(select)(BaomingList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    thumb:{
        width:60,
        height:60,
        borderRadius:30,
        marginLeft:20
    },
    cell_container:{
        flex:1,
        flexDirection:'row',
    },
    itemLeft:{
        flex:1,
        paddingLeft:10,
    },
});