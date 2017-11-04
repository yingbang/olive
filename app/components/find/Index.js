/**
 * 发现
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
} from 'react-native';

import { Card, ListItem, Button} from 'react-native-elements'

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]
export default class FindIndex extends Component{

    render(){
        return (
            <Card
                title='HELLO WORLD'
                image={require('../../assets/mock_data/2.jpg')}>
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />
            </Card>
        );
    }
}

const styles = StyleSheet.create({

});