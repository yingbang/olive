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

import { Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base';

export default class FindIndex extends Component{
    render(){
        return (
            <Container>
                <Tabs initialPage={0} tabBarUnderlineStyle={{width:100}}>
                    <Tab heading="tab1" tabStyle={{width:100}} activeTabStyle={{width:100}}>
                        <View>
                            <Text>tab1</Text>
                        </View>
                    </Tab>
                    <Tab heading="tab2" tabStyle={{width:100}} activeTabStyle={{width:100}}>
                        <View>
                            <Text>tab2</Text>
                        </View>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});