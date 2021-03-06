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
        this.props.True.noticeListData = [];
        this.props.True.noticeListApiAction();
    }

    componentWillUnmount() {//此页面直接点击左上角和硬件返回日常首页会进来此方法，直接点击列表进去详情页面不会进来此方法
        this.props.True.noticeListData = [];
    }

    page = 1

    onClickCm = (v) => {
        let { True, navigation } = this.props;
        True.noticeItem = v;
        navigation.navigate('NoticeDetail');
    }

    onRefresh = () => {
        this.page = 1;
        this.props.True.noticeListData = [];
        this.props.True.noticeListApiAction();
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
                            <Image style={{ width: 28, height: 28 }}
                                   source={require('../../../resource/icon/alerts_message.png')}
                            />
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
        this.page += 1;
        this.props.True.noticeListApiAction(this.page, 'append');
    }

    renderNoData = (str) => {
        //暂无数据
        return (
            <View style={styles.noDataWrap}>
                <Text style={styles.noDataIcon}>
                    <Icon type={'\uE6A8'} color={'#33CC99'} size={'lg'}/>
                </Text>
                <Text style={styles.textInfo}>
                    {str}
                </Text>
            </View>
        )
    }

    render() {
        const { True } = this.props;
        const { noNoticeList, noticeListData, noticeListLoading, noticeListMore } = True;
        const data = [...noticeListData];
        return (
            <ListView
                style={styles.scrollView}
                dataSource={ds.cloneWithRows(data)}
                renderRow={this.renderRow}
                renderHeader={() =>
                    (
                        noNoticeList ?
                            this.renderNoData('暂无任何公告') : null
                    )
                }
                renderFooter={() => (<RenderFooterLoading isLoadingMore={noticeListMore} len={data.length}/>)}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={20}
                enableEmptySections={true}
                automaticallyAdjustContentInserts={false}
                showsVerticalScrollIndicator={true}
                refreshControl={
                    <RefreshControl
                        refreshing={noticeListLoading}
                        onRefresh={this.onRefresh}
                        tintColor={gColors.brandPrimary}
                        title="加载中..."
                        colors={[gColors.brandPrimary]}
                        titleColor={gColors.brandPrimary}
                    />
                }
            />
        )
    }

}

const styles = StyleSheet.create({
    title: {
        //fontSize: 16,
        marginLeft: 10,
        //height: 25,
        marginTop: 2,
    },
    scrollView: {
        backgroundColor: '#fff'
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    noDataWrap: {

        backgroundColor: '#fff'
    },
    noDataIcon: {
        // height: 150,
        // paddingTop: 60,
        textAlign: 'center'
    },
    textInfo: {
        textAlign: 'center'
    },
});

