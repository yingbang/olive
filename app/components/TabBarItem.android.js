/**
 * 封装底部Tab中的每一项
 *
 */
import React,{Component} from 'react';
import {Image,View} from 'react-native';

export default class TabBarItem extends Component {

    render() {
        return(
            <View style={this.props.imageViewStyle}>
                <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                       style={ [{ tintColor:this.props.tintColor,width:this.props.imageWidth ? this.props.imageWidth : 25,height:this.props.imageHeight ? this.props.imageHeight : 25 },this.props.imageStyle ? this.props.imageStyle : {}] }
                />
            </View>
        )
    }
}