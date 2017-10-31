import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

// this is a traditional React component connected to the redux store
export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <Text style={{fontWeight: '500'}}>请登录{this.props.loginReducer.data}</Text>
            </View>
        );
    }
}