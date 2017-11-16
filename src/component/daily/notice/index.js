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
import HTMLView from 'react-native-htmlview';

import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal, Badge } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../../BaseComponent'
import { format } from '../../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;
import { personalInfoApi } from '../../../services/baseService'

@inject('User', 'Common', 'Base', 'True')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '公告',
    }

    componentWillMount() {
        this.props.True.noticeListApiAction();
    }

    onClickCm = (v) => {
        let { True, navigation } = this.props;
        True.noticeItem = v;
        navigation.navigate('NoticeDetail');
    }

    render() {
        let { User, True, navigation } = this.props;
        let { data = [], unread_total = 0 } = True.noticeListData;
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                {
                    data.map((v, i) => {
                        return (
                            <List key={i}>
                                <Item
                                    arrow="horizontal"
                                    extra={
                                        <Text style={{ fontSize: 13 }}>
                                            {v.create_time && format(v.create_time, 'MM-dd hh:mm')}
                                        </Text>
                                    }
                                    thumb={
                                        <Badge
                                            dot={v.status == '0' ? true : false}>
                                            <Icon type={'\ue6ab'}/>
                                        </Badge>
                                    }
                                    multipleLine
                                    onClick={
                                        () => {
                                            this.onClickCm(v)
                                        }
                                    }
                                >
                                    <Text style={styles.title}>
                                        {v.title}
                                    </Text>
                                </Item>
                            </List>
                        )
                    })
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginLeft: 10,
        height: 40,
        marginTop: 20,
    },
});

