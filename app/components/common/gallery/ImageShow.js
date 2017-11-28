/**
 * 图片全屏预览
 *
 */
import React,{Component,PropTypes} from 'react';
import {View,Text,Image,Modal,StatusBar} from 'react-native';
import {getFullPath} from '../public';
import Gallery from './Gallery';

export default class ImageShow extends Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
        let images = this.props.navigation.state.params.images;
        let index = this.props.navigation.state.params.index;
        //获取完整路径
        let imagesArr = [];
        if(images !== '' && images !== null && images !== undefined){
            for(let i = 0; i < images.length; i++){
                imagesArr.push(getFullPath(images[i]))
            }
        }
        this.state={
            images:imagesArr,
            index:index,//初始页面
            page:index+1,//当前页面
            totalPage:imagesArr.length
        }
    }
    render(){
        return (
            <Modal onRequestClose={()=>{this.props.navigation.goBack();}} transparent={true} visible={true} >
                <StatusBar hidden={true}/>
                <View style={{alignItems:'center',justifyContent:'center',height:50,width:null,backgroundColor:'#000000'}}>
                    <Text style={{color:'#ffffff'}}>{this.state.page} / {this.state.totalPage}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Gallery
                        style={{flex: 1, backgroundColor: '#000000'}}
                        initialPage={this.state.index}
                        pageMargin={10}
                        images={this.state.images}
                        onSingleTapConfirmed={() => {
                            this.props.navigation.goBack();
                        }}
                        onPageSelected={(page) => {
                            this.setState({page:page+1});
                        }}
                    />
                </View>
            </Modal>
        );
    }
}