/**
 * 查看证件
 **/

import React, {PureComponent} from 'react';
import {Flex, List} from 'antd-mobile';
import {
    View,
    StyleSheet,
    Text,
    PixelRatio
} from 'react-native';

import {Item} from './common/index';

export default class Index extends PureComponent{
    render() {
        return(
            <View>
                <Item listName="身份证：" text="440999898998777"/>
                <Item listName="社保电脑号：" text="440999898998777"/>
                <Item listName="住房公积金号：" text="440999898998777"/>
            </View>
        )
    }
}