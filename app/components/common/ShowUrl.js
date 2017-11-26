/**
 * 专门用来显示网页url
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    WebView,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Header} from 'react-native-elements';
import globalStyle from '../common/GlobalStyle';


export default class ShowUrl extends Component{
    constructor(props){
        super(props);
        this.state = {
            url:"",
            title:"",
            canGoBack:false
        }
    }
    static navigationOptions = {
        header:(HeaderProps)=>{
            return <Header
                leftComponent={{ icon: 'arrow-back', onPress:()=>{HeaderProps.scene.route.params.onBack()} }}
                centerComponent={{ text: '详情'}}
                backgroundColor="#ffffff"
                outerContainerStyles={globalStyle.androidHeaderStyle}
            />
        }
    };
    componentDidMount(){
        let url = this.props.navigation.state.params.url;
        this.setState({
            url:url
        });
        this.props.navigation.setParams({onBack:()=>{this._onBack()}});
    }
    _onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else{
            this.props.navigation.goBack();
        }
    }
    onNavigationStateChange(event){
        this.setState({
            canGoBack:event.canGoBack,
            title:event.title
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url,method: 'GET'}}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});