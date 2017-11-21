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
import BaseComponent from '../../BaseComponent';
import { format } from '../../../util/tool';

import BadgeStyle from 'antd-mobile/lib/badge/style/index.native.js';

const BadgeItemStyle = {
    ...BadgeStyle,
    textDom: {
        backgroundColor: '#f00',
        borderRadius: 6,
        paddingRight: 3,
        paddingLeft: 3,
        position: 'absolute',
        top: -1,
        right: -22,
        zIndex: 999
    },
    text: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}

const Item = List.Item;
const Brief = Item.Brief;

@inject('True')
@observer
export default class Index extends BaseComponent {

    render() {
        const { True, tintColor } = this.props;
        const { taskListPEData, taskListPDData, activeKey } = True;
        const unprocessed_total = activeKey == 'PE' ? taskListPEData.unprocessed_total : taskListPDData.unprocessed_total;
        return (
            <View>
                {
                    unprocessed_total > 0 ?
                        <Badge
                            text={unprocessed_total}
                            styles={BadgeItemStyle}
                        />
                        : null
                }
                <Image
                    source={require('../../../resource/tabs/task_01.png')}
                    style={[{ tintColor: tintColor }]}
                />
            </View>
        )
    }
}