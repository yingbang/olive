/**
 * 关于橄榄枝
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
    Button
} from 'react-native';

export default class AboutUs extends Component{
    render(){
        return (
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Text style={styles.intro}>
                    在我国，公益慈善事业起步时间比较晚，但是近几年也取得了非常不错的成果，预计在未来会募得更多的捐助，帮助更多需要帮助的人。通过“橄榄枝APP”，我们将实现更多的公益事业，来促进和谐社会的发展根据自身需求发布活动，寻求帮助或给予帮助。
                    对积极投身公益事业的热心人士进行表彰、鼓励。
                    定期开展支援活动，对各类贫困地区贫困儿童进行资助。
                    聚集爱心人士、志愿者，广发邀请，共同献爱心。
                    快速响应健康公益活动，并积极配合开展。
                    定期开办线下活动，摸清弱势群体的衣、食、住、行、医、学、安全和社会教育情况，并提供及时帮助。
                </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    intro:{
        margin:10,
        lineHeight:26
    }
});