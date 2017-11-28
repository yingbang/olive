/**
 * 多图片排列方式，根据图片个数不同，排成不同的样式
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
const { width, height } = Dimensions.get('window');
import {getFullPath} from './public';
//import {CachedImage} from "react-native-img-cache";

//判断图片是否有前缀，没有的话加上域名
function getFullUrl(path) {
    if(path === "" || path === undefined || path === null) return;
    let host = realmObj.objects("Global").filtered("key == 'REQUEST_HOST'")[0].value;
    return getFullPath(path,host);
}
//跳转到图片展示页面
function showImage(images,currentIndex,that){
    if(that.props.screenProps.screenProps){
        that.props.screenProps.screenProps.navigation.navigate("ImageShow",{images:images,index:currentIndex})
    }else{
        that.props.screenProps.navigation.navigate("ImageShow",{images:images,index:currentIndex})
    }
}

//一张图片
class OneImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,0,this)}}>
                        <Image style={styles.oneImage} source={{uri:getFullUrl(images[0])}}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
//两张图片
class TwoImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,0,this)}}>
                        <Image style={styles.twoImage} source={{uri:getFullUrl(images[0])}}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,1,this)}}>
                        <Image style={styles.twoImage} source={{uri:getFullUrl(images[1])}}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
//三张图片
class ThreeImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,0,this)}}>
                        <Image style={styles.threeImageL} source={{uri:getFullUrl(images[0])}}/>
                    </TouchableWithoutFeedback>
                    <View>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,1,this)}}>
                            <Image style={styles.threeImageR} source={{uri:getFullUrl(images[1])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,2,this)}}>
                            <Image style={styles.threeImageR} source={{uri:getFullUrl(images[2])}}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}
//四张图片
class FourImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,0,this)}}>
                        <Image style={styles.fourImage} source={{uri:getFullUrl(images[0])}}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,1,this)}}>
                        <Image style={styles.fourImage} source={{uri:getFullUrl(images[1])}}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,2,this)}}>
                        <Image style={styles.fourImage} source={{uri:getFullUrl(images[2])}}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{showImage(images,3,this)}}>
                        <Image style={styles.fourImage} source={{uri:getFullUrl(images[3])}}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
//五张图片
class FiveImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,0,this)}}>
                            <Image style={styles.fiveImageT} source={{uri:getFullUrl(images[0])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,1,this)}}>
                            <Image style={styles.fiveImageT} source={{uri:getFullUrl(images[1])}}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,2,this)}}>
                            <Image style={styles.fiveImageB} source={{uri:getFullUrl(images[2])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,3,this)}}>
                            <Image style={styles.fiveImageB} source={{uri:getFullUrl(images[3])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,4,this)}}>
                            <Image style={styles.fiveImageB} source={{uri:getFullUrl(images[4])}}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}
//六张图片
class SixImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,0,this)}}>
                            <Image style={styles.sixImage} source={{uri:getFullUrl(images[0])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,1,this)}}>
                            <Image style={styles.sixImage} source={{uri:getFullUrl(images[1])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,2,this)}}>
                            <Image style={styles.sixImage} source={{uri:getFullUrl(images[2])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,3,this)}}>
                            <Image style={styles.sixImage} source={{uri:getFullUrl(images[3])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,4,this)}}>
                            <Image style={styles.sixImage} source={{uri:getFullUrl(images[4])}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{showImage(images,5,this)}}>
                            <Image style={styles.sixImage} source={{uri:getFullUrl(images[5])}}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}
//六张以上图片
class MoreImage extends Component{
    render() {
        const images = this.props.images;
        return (
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {
                            images.map((item,i)=>{
                                return (
                                    <TouchableWithoutFeedback key={i} onPress={()=>{showImage(images,i,this)}}>
                                        <Image style={styles.moreImage} source={{uri:getFullUrl(item)}}/>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
}

export default class ImageRange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageIndex: 1,
        };
    }
    componentDidMount(){
        let images = this.props.images;
        if(images !== '' && images !== null && images !== undefined){
            let imagesArr = images.split(",");
            this.setState({
                images:imagesArr
            });
        }
    }
    render() {
        let imageNumber = this.state.images.length;
        let imageArr = this.state.images;
        switch(imageNumber){
            case 1:
                return (
                    <OneImage images={imageArr} screenProps={this.props}/>
                );
                break;
            case 2:
                return (
                    <TwoImage images={imageArr} screenProps={this.props}/>
                );
                break;
            case 3:
                return (
                    <ThreeImage images={imageArr} screenProps={this.props}/>
                );
                break;
            case 4:
                return (
                    <FourImage images={imageArr} screenProps={this.props}/>
                );
                break;
            case 5:
                return (
                    <FiveImage images={imageArr} screenProps={this.props}/>
                );
                break;
            case 6:
                return (
                    <SixImage images={imageArr} screenProps={this.props}/>
                );
                break;
            case 7:
            case 8:
            case 9:
                return (
                    <MoreImage images={imageArr} screenProps={this.props}/>
                );
                break;
            default:
                return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffff',
        width:width,
    },
    oneImage:{
        width:width-16,
        height:200
    },
    twoImage:{
        width:(width-24) / 2,
        height:200,
        marginRight:8,
    },
    threeImageL:{
        width:(width-16) / 3 * 2,
        height:300,
        marginRight:8
    },
    threeImageR:{
        width:(width-16) / 3 - 8,
        height:146,
        marginBottom:8
    },
    fourImage:{
        width:(width-24) / 2,
        height:146,
        marginBottom:8,
        marginRight:8,
    },
    fiveImageT:{
        width:(width-16) / 2,
        height:146,
        marginBottom:8,
        marginRight:8,
    },
    fiveImageB:{
        width:(width-24) / 3,
        height:146,
        marginRight:8
    },
    sixImage:{
        width:(width-24) / 3,
        height:146,
        marginBottom:8,
        marginRight:8,
    },
    moreImage:{
        width:(width-24) / 3,
        height:100,
        marginBottom:8,
        marginRight:8,
    },
});