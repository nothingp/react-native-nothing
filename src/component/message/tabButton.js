import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    ScrollView,
    ListView,
    Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal, Badge } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent';
import { format } from '../../util/tool';

import BadgeStyle from 'antd-mobile/lib/badge/style/index.native.js';

const BadgeItemStyle = {
    ...BadgeStyle,
    textDom: {
        backgroundColor: '#f00',
        borderRadius: 16,
        paddingRight: 4,
        paddingLeft: 4,
        position: 'absolute',
        top: -22,
        right: -22,
        zIndex: 999
    },
    text: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}

const Item = List.Item;
const Brief = Item.Brief;

@inject('Base')
@observer
export default class Index extends BaseComponent {

    render() {
        const { Base, tintColor } = this.props;
        const { alert_unread_total = 0 } = Base.userInfo || {};
        return (
            <View>
                <Image
                    source={require('../../resource/tabs/message_01.png')}
                    style={[{ tintColor: tintColor }]}
                />
                <Badge
                    overflowCount={100}
                    text={alert_unread_total}
                    styles={BadgeItemStyle}
                />
            </View>
        )
    }
}