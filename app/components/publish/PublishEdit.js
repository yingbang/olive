import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
//公共头部
import EditTop from './EditTop';


const {width,height} = Dimensions.get('window');
export default class PublishEdit extends Component{
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <EditTop onPressRightIcon={()=>{alert(1)}} title="" {...HeaderProps}/>
        }
    };
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
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.addImage}>
                        <Image style={{width:25,height:25,tintColor:'#e6e6e6'}} source={require('../../assets/icon/iconadd.png')}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    input:{
        height:200,
    },
    addImage:{
        borderWidth:1,
        borderColor:'#e6e6e6',
        padding:20,
        borderRadius:5,
        width:80,
        height:80,
        marginLeft:10,
        alignItems:'center',
        justifyContent:'center'
    }
});