import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import styled from 'styled-components/native';

// this is a traditional React component connected to the redux store
export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: '500'}}>请啊啊登录{this.props.loginReducer.data}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});