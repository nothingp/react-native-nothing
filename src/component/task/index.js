import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    ScrollView,
    FlatList,
    Picker,
    ActivityIndicator,
    Image,
    ListView,
    RefreshControl
} from 'react-native';
import { Tabs, Badge, Icon, Grid, Button, List, PickerView, Toast } from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import { gColors } from '../../common/GlobalContants';
import BaseComponent from '../BaseComponent';
import TaskTypeModal from './taskTypeModal';
import { format } from '../../util/tool';
import TabButton from './common/tabButton';
import RenderFooterLoading from '../RenderFooterLoading';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

@inject('True', 'Base')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '任 务',
        tabBarIcon: ({ tintColor,focused }) => (
            <TabButton focused={focused} tintColor={tintColor}/>
        ),
        headerRight: (
            <TaskTypeModal/>
        ),
    }

    page = 1

    componentWillMount() {
        const { True } = this.props;
        True.taskSelectType = {
            label: '所有',
            value: 'ALL'
        };
        True.activeKey = 'PE';
        True.taskListAction(1, 'initial');
    }

    onProcessedTap = (tab, number) => {
        const { True } = this.props;
        True.activeKey = tab.sub;
        this.page = 1;
        True.taskListAction(this.page, 'initial');
    }

    onClick = async (id, type, selectTask) => {
        let { True, navigation } = this.props;
        True.selectTask = { ...selectTask, taskId: id };
        if (selectTask.function == 'PP') {
            switch (type) {
                case "PD":
                    navigation.navigate('UserInfoApply');
                    break;
                case 'AD':
                    navigation.navigate('AddressApply');
                    break;
                case 'EC':
                    navigation.navigate('ContactInfo');
                    break;
                case 'BA':
                    navigation.navigate('BankAccountApply');
                    break;
                case 'ID':
                    navigation.navigate('IdentityApply');
                    break;
                case 'EX':
                    navigation.navigate('ExperienceApply');
                    break;
                case 'ED':
                    navigation.navigate('EducationApply');
                    break;
                case 'CE':
                    navigation.navigate('CertificateApply');
                    break;
                default:
            }
        }
        else if (selectTask.function == 'LA') {
            navigation.navigate('LeaveLeaveInfo', { type: True.activeKey == 'PE' ? 'apply' : 'applyRecord' });
        }
        else if (selectTask.function == 'CL') {
            navigation.navigate('LeaveLeaveInfo', { type: True.activeKey == 'PE' ? 'cancel' : 'cancelRecord' });
        }
        else if (selectTask.function == 'LC') {
            navigation.navigate('LeaveAwardApply');
        } else if (selectTask.function == 'CA') {
            navigation.navigate('ClaimsApply', { type: True.activeKey == 'PE' ? 'apply' : 'record' });
        }
    }

    onRefresh = () => {
        const { True } = this.props;
        this.page = 1;
        True.taskListAction(this.page, 'initial');
    }

    renderRow = (v) => {
        return (
            <List>
                <Item
                    arrow="horizontal"
                    extra={
                        <Text >
                            {v.apply_time && format(v.apply_time, 'MM-dd hh:mm')}
                        </Text>
                    }
                    thumb={
                        <Badge
                            dot={v.status == '0' ? true : false}>
                            <Image style={{ width: 28, height: 28 }}
                                   source={require('../../resource/icon/alerts_message.png')}
                            />
                        </Badge>
                    }
                    multipleLine
                    onClick={
                        () => {
                            this.onClick(v.key, v.function_dtl, v)
                        }
                    }
                >
                    <Text style={styles.title}>
                        {v.name}
                    </Text>
                    <Brief style={styles.brief}>{v.description}</Brief>
                </Item>
            </List>
        )
    }

    onEndReached = (taskListMore) => {
        if (!taskListMore) {
            return;
        }
        this.page += 1;
        const { True } = this.props;
        True.taskListAction(this.page);
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

    renderPEList = (data) => {
        const { True } = this.props;
        const { taskListPELoading, taskListPEMore, noTaskTypeList } = True;
        console.log('taskListPEMore', taskListPEMore, [...data ? data : []]);
        return (
            noTaskTypeList ?
                this.renderNoData('暂无该类型任务') :
                <ListView
                    style={styles.scrollView}
                    dataSource={ds.cloneWithRows([...data ? data : []])}
                    renderRow={this.renderRow}
                    renderHeader={
                        () => (
                            !data ?
                                <ActivityIndicator
                                    style={
                                        [
                                            styles.centering,
                                            { height: 80 }
                                        ]
                                    }
                                    size="large"
                                    color={gColors.brandPrimaryTap}
                                />
                                : null
                        )
                    }
                    renderFooter={() => <RenderFooterLoading isLoadingMore={taskListPEMore}
                                                             len={[...data ? data : []].length}/>}
                    onEndReached={() => {
                        data ? this.onEndReached(taskListPEMore) : ''
                    }}
                    onEndReachedThreshold={20}
                    enableEmptySections={true}
                    automaticallyAdjustContentInserts={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={taskListPELoading}
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

    renderPDList = (data) => {
        const { True } = this.props;
        const { taskListPDLoading, taskListPDMore, noTaskTypeList } = True;
        console.log('taskListPDMore', taskListPDMore, [...data ? data : []]);
        return (
            noTaskTypeList ?
                this.renderNoData('暂无该类型任务') :
                <ListView
                    style={styles.scrollView}
                    dataSource={ds.cloneWithRows([...data ? data : []])}
                    renderRow={this.renderRow}
                    renderHeader={() => (
                        !data ?
                            <ActivityIndicator
                                style={
                                    [
                                        styles.centering,
                                        { height: 80 }
                                    ]
                                }
                                size="large"
                                color={gColors.brandPrimaryTap}
                            />
                            : null
                    )
                    }
                    renderFooter={() => <RenderFooterLoading isLoadingMore={taskListPDMore}
                                                             len={[...data ? data : []].length}/>}
                    onEndReached={() => {
                        data ? this.onEndReached(taskListPDMore) : ''
                    }}
                    onEndReachedThreshold={20}
                    enableEmptySections={true}
                    automaticallyAdjustContentInserts={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={taskListPDLoading}
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

    render() {
        const { True } = this.props;
        const { taskListPDData, taskListPEData } = True;

        const tabs = [
            { title: '未处理', sub: 'PE' },
            { title: '已处理', sub: 'PD' },
        ];

        return (
            <Tabs
                tabs={tabs}
                onTabClick={this.onProcessedTap}
                swipeable={false}
                //animated={false} //TODO 取消动画居然会影响activetab切换
                tabBarActiveTextColor={gColors.brandPrimary}
                tabBarUnderlineStyle={{ backgroundColor: gColors.brandPrimary }}
            >
                {
                    this.renderPEList(taskListPEData.data)
                }
                {
                    this.renderPDList(taskListPDData.data)
                }
            </Tabs>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        // fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    scrollView: {
        backgroundColor: '#fff'
    },
    brief: {
        // fontSize: 13,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    noDataWrap: {
        height: '100%',
        backgroundColor: '#fff'
    },
    noDataIcon: {
        height: 150,
        paddingTop: 60,
        textAlign: 'center'
    },
    textInfo: {
        textAlign: 'center'
    },
});

