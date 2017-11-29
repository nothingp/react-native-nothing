import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    RefreshControl,
    ScrollView,
    ListView,
    Image,
    ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal, Badge } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

import RenderFooterLoading from '../../RenderFooterLoading';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
import { gColors } from '../../../common/GlobalContants';
import BaseComponent from '../../BaseComponent'
import { format } from '../../../util/tool';

@inject('Base', 'True')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '公告',
    }

    componentWillMount() {
        this.props.True.noticeListData = {};
        this.props.True.noticeListApiAction();
    }

    page = 10

    onClickCm = (v) => {
        let { True, navigation } = this.props;
        True.noticeItem = v;
        navigation.navigate('NoticeDetail');
    }

    onRefresh = () => {
        this.page = 10;
        this.props.True.noticeListData = {};
        this.props.True.noticeListApiAction(this.page, 1, 'initial');
    }

    renderRow = (v) => {
        return (
            <List>
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
    }

    onEndReached = () => {
        const { True } = this.props;
        if (!True.noticeListMore) {
            return;
        }
        this.page += 10;
        this.props.True.noticeListApiAction(this.page);
    }

    render() {
        const { True } = this.props;
        const { data = [], unread_total = 0 } = True.noticeListData;
        console.log('unread_total', unread_total);
        if (unread_total == undefined) {
            return <ActivityIndicator
                style={
                    [
                        styles.centering,
                        { height: 80 }
                    ]
                }
                size="large"
                color={gColors.brandPrimaryTap}
            />
        }
        return (
            <ListView
                style={styles.scrollView}
                dataSource={ds.cloneWithRows([...data])}
                renderRow={this.renderRow}
                renderFooter={() => (<RenderFooterLoading isLoadingMore={True.noticeListMore} len={[...data].length}/>)}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={20}
                enableEmptySections={true}
                automaticallyAdjustContentInserts={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={True.noticeListLoading}
                        onRefresh={this.onRefresh}
                        tintColor={gColors.brandPrimaryTap}
                        title="加载中..."
                        colors={[gColors.brandPrimaryTap]}
                        titleColor={gColors.brandPrimaryTap}
                    />
                }
            />
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
    scrollView: {
        backgroundColor: '#fff'
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

