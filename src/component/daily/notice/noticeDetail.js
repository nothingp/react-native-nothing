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
    WebView,
    Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Flex, WhiteSpace, WingBlank, Icon, Grid, Button, List, Toast, Modal } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../../BaseComponent'
import { format } from '../../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'Base', 'True')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        title: '公告详情'
    });

    componentWillMount() {
        const { True, noticeItem, User } = this.props;
        True.noticeListApiAction(noticeItem.alert_tbl_id);
        if (noticeItem.status == '0') {
            True.alertsSubmitApiAction(noticeItem.alert_tbl_id);
            User.alertsList();
        }
    }

    componentWillUnmount() {
        const { True } = this.props;
        True.noticeDetailData = {};
    }

    render() {
        let { create_time, title, url, description } = this.props.True.noticeDetailData;
        return (
            <ScrollView style={{ backgroundColor: '#FFF' }}>
                <WhiteSpace size="lg"/>

                <WingBlank size='lg'>
                    <Flex>
                        <Flex.Item>
                            <Text style={{ fontSize: 18 }}>
                                {title}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <WhiteSpace size="lg"/>

                <WingBlank size='lg'>
                    <Flex>
                        <Flex.Item>
                            <Text style={{ fontSize: 18, color: '#666' }}>
                                {create_time && format(create_time, 'yyyy-MM-dd')}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <WhiteSpace size="lg"/>
                <WingBlank size='lg'>
                    <HTMLView value={description}/>
                </WingBlank>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    brief: {
        height: 66,
        fontSize: 14,
    },
});

