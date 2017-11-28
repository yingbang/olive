import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    Alert,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {imageUploadFetch,imageUploadBase64} from '../common/public';
//公共头部
import {  Header} from 'react-native-elements';
const {width,height} = Dimensions.get('window');
import globalStyle from '../common/GlobalStyle';
import colors from '../common/Colors';
import {uniqueArray} from '../common/public';
import {toastShort} from '../common/ToastTool';
import {fabuDongtaiAction} from '../../actions/userAction';

class PublishEdit extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.scene.route.params.back()} }}
                rightComponent={<Text onPress={()=>{HeaderProps.scene.route.params.fabu()}}>发布</Text>}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    constructor(props){
        super(props);
        this.state={
            images:[],//图片列表，用于显示
            fileArr:[],//用于上传
            hasChanged:false,//内容是否改变
            content:'',//内容
            urlArr:[],//上传成功的图片地址
            quanzi:0,//圈子ID
        }
    }
    componentDidMount(){
        //QuanziDongtai中过来的
        let quanzi = this.props.navigation.state.params.quanzi;
        if(quanzi>0){
            this.setState({
                quanzi:quanzi
            });
        }
        this.props.navigation.setParams({fabu:()=>{this._fabu()}, back:()=>{this._back()}});
    }
    _fabu(){
        let content = this.state.content;
        let fileArr = this.state.fileArr;
        if(content === "" && fileArr.length === 0){
            toastShort("请选择图片");
            return false;
        }
        //上传图片：递归
        if(fileArr.length > 0){
            this.uploadImage(fileArr[0],0);
        }
    }
    //发布完成
    _fabuComplete(result){
        if(result.state === "ok"){
            toastShort("发布成功！");
            //从圈子过来的再返回去
            if(this.state.quanzi > 0){
                this.props.navigation.goBack();
            }else{
                this.props.navigation.navigate("Tab");
            }
        }else{
            toastShort("发布失败，请重试！");
        }
    }
    //返回判断
    _back(){
        if(this.state.hasChanged){
            let _that = this;
            Alert.alert(
                "是否退出此次编辑？",
                "",
                [
                    {text: '取消', onPress: ()=>{}},
                    {text: '退出编辑', onPress: ()=>{
                        _that.props.navigation.goBack();
                    }}
                ],
                {cancelable: true}
            );
        }else{
            this.props.navigation.goBack();
        }
    }
    //上传图片
    uploadImage(file,i){
        //上传图片
        let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
        let userid = realmObj.objects("Global").filtered("key == 'currentUserId'")[0].value;
        let fileArr = this.state.fileArr;
        imageUploadFetch(host + "/api/tool/uploadByFetch?userid=" + userid + "&_t=" + Math.random(),'file',{path:file}).then((result)=>{
            if(result.url){
                //把图片的url保存起来
                let newUrl = [];
                newUrl.push(result.url);
                let oldUrl = this.state.urlArr;
                this.setState({
                    urlArr:oldUrl.concat(newUrl),
                });
                //当最后一个图片上传完成时，发布
                if(i === fileArr.length - 1){
                    //发布动态
                    let pics = this.state.urlArr.join(",");
                    this.props.dispatch(fabuDongtaiAction(this.state.content,pics,this.state.quanzi,(result)=>{this._fabuComplete(result)}));
                }
                //递归调用，一个一个上传
                else{
                    i = i + 1;
                    this.uploadImage(fileArr[i], i);
                }
            }
        }).catch((err)=>{});
    }
    //打开图片选择器
    openPicker(){
        ImagePicker.openPicker({
            multiple:true,
            cropping: true,
            maxFiles:9 - this.state.images.length,
            mediaType:'photo',
            compressImageQuality:0.4
        }).then(images => {
            let imageArr = [];
            let fileArr = [];
            images.map((item,index)=>{
                let source;
                if (Platform.OS === 'android') {
                    source = {uri: item.path, isStatic: true}
                } else {
                    source = {uri: item.path.replace('file://', ''), isStatic: true}
                }
                let file;
                if(Platform.OS === 'android'){
                    file = item.path;
                }else {
                    file = item.path.replace('file://', '');
                }
                imageArr.push(source);
                fileArr.push(file);
            });
            let oldImage = this.state.images;
            let oldFile = this.state.fileArr;
            this.setState({
                images:oldImage.concat(imageArr),
                fileArr:oldFile.concat(fileArr),
                hasChanged:true,
            });
        }).catch(e => {
            toastShort("选择图片出错！")
        });
    }
    //删除某张图片
    removeImage(index){
        let oldImages = this.state.images;
        let oldFiles = this.state.fileArr;
        oldImages.splice(index,1);
        oldFiles.splice(index,1);
        this.setState({
            images:oldImages,
            fileArr:oldFiles,
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="输入你想说的..."
                            placeholderTextColor={"#999999"}
                            underlineColorAndroid={"#ffffff"}
                            autoFocus={false}
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                            clearTextOnFocus={true}
                            multiline={true}
                            enablesReturnKeyAutomatically={true}
                            textAlignVertical="top"
                            onChangeText={(text)=>{this.setState({content:text,hasChanged:true});}}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                {
                    this.state.images.map((item,i)=>{
                        return (
                            <TouchableWithoutFeedback key={i} onPress={()=>{}}>
                                <View style={styles.selectImage}>
                                    <Image style={styles.selectImageSize} source={item}/>
                                    <TouchableWithoutFeedback onPress={()=>{this.removeImage(i)}}>
                                        <Image style={[colors.tintWhite,styles.close]} source={require('../../assets/icon/iconclose.png')}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })
                }
                {
                    this.state.images.length < 9 ?
                        <TouchableWithoutFeedback onPress={()=>{this.openPicker()}}>
                            <View style={styles.addImage}>
                                <Image style={{width:25,height:25,tintColor:'#e6e6e6'}} source={require('../../assets/icon/iconadd.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                        : null
                }
                </View>
            </View>
        );
    }
}

function select(state) {
    const {userReducer} = state;
    return {
        userReducer
    }
}
export default connect(select)(PublishEdit);

const imageViewSize = (width - 60) / 3;
const imageSize = imageViewSize - 6;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    input:{
        height:200,
    },
    selectImage:{
        borderWidth:1,
        borderColor:'#e6e6e6',
        padding:3,
        borderRadius:5,
        width:imageViewSize,
        height:imageViewSize,
        marginLeft:15,
        marginBottom:15,
        alignItems:'center',
        justifyContent:'center',
    },
    selectImageSize:{
        width:imageSize,
        height:imageSize,
    },
    addImage:{
        borderWidth:1,
        borderColor:'#e6e6e6',
        padding:20,
        borderRadius:5,
        width:imageViewSize,
        height:imageViewSize,
        marginLeft:15,
        marginBottom:15,
        alignItems:'center',
        justifyContent:'center',
    },
    close:{
        position:'absolute',
        top:5,
        right:5,
        width:16,
        height:16,
        borderRadius:8,
        backgroundColor:'rgba(0,0,0,0.5)',
        padding:3,
    },
});