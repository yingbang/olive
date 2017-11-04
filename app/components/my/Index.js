/**
 * 我的
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Animated,
    ScrollView,
    Easing,
    PanResponder,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';

//import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { List, ListItem } from 'react-native-elements'

const list = [
    {
        key:0,
        name: 'Amy Farha',
        icon: 'av-timer',
        subtitle: 'Vice President'
    },
    {
        key:1,
        name: 'Chris Jackson',
        icon: 'av-timer',
    },
];
export default class MyIndex extends Component{
    constructor(props) {
        super(props);
    }

    renderRow = ({item}) => (
        <ListItem
            key={item.key}
            title={item.name}
            subtitle={item.subtitle}
            leftIcon={{name: item.icon}}
        />
    )

    render(){
        return (
            <List>
                <FlatList
                    renderItem={this.renderRow}
                    data={list}
                />
            </List>
        );
    }
}


const styles = StyleSheet.create({

});


