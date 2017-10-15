import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Image,
    TouchableHighlight

} from 'react-native';
import { startLoginScreen } from '../screens';
import { Flex, WhiteSpace,Icon,Grid,Button,List, WingBlank, Modal} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
//import { Navigation } from 'react-native-navigation';
import I18n from '../i18n/i18n';
import { getLanguages } from 'react-native-i18n';

const Item = List.Item;
const Brief = Item.Brief;
const operation = Modal.operation;

const Separator = () => (
    <Flex
        style={styles.separator}
    />
);

export default class App extends Component {
    render() {
        return (
            <View>
                <Separator/>
                <View style={styles.personInfo}>
                    <View style={styles.imageWrap}>
                        <TouchableOpacity onPress={() => {
                            operation([
                                { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
                                { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
                            ])
                        }}>
                            <Image style={styles.image} source={{url: 'https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContent}>
                        <List>
                            <Item
                                multipleLine
                                extra={<Brief>个人资料</Brief>}
                                arrow="horizontal"
                                onClick={() => this.props.navigator.push({
                                    screen: 'SelfInfo',
                                    title: '个人信息'
                                })}
                            >
                                <Text style={styles.personName}>程玲</Text>
                                <Brief style={styles.smallFont}>Manager</Brief>
                                <Brief style={styles.personNum}>工号: ES0001</Brief>
                            </Item>
                        </List>
                    </View>
                </View>
                <Separator/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    personInfo: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageWrap: {
        width: 70,
        paddingLeft: 10,
        paddingTop: 10,
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: .5,
        borderStyle: 'solid',
        borderColor: '#dddddd',
    },
    infoContent: {
        flex: 1,
    },
    personName: {
        paddingTop: 5,
        fontSize: 18,
    },
    separator: {
        height: 10,
        backgroundColor: '#f2f2f2'
    },
    smallFont: {
        fontSize: 12,
    },
    personNum: {
        paddingBottom: 5,
        fontSize: 12,
    },
    image: {
        width: 55,
        height: 55,
        paddingRight: 15,
    },
    iconColor: {
        color: 'red',
        fontSize: 50
    },
    textLeft: {
        fontSize: 18,
        paddingLeft: 10,
        color: '#333333',
    }
});