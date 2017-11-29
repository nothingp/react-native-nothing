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
        title: '任务',
        tabBarIcon: ({ tintColor }) => (
            <TabButton tintColor={tintColor}/>
        ),
        headerRight: (
            <TaskTypeModal/>
        ),
    }

    page = 10

    componentWillMount() {
        const { True } = this.props;
        True.taskListPEData = {};
        True.taskListPDData = {};
        True.taskSelectType = {
            label: '所有',
            value: 'ALL'
        };
        True.activeKey = 'PE';
        True.taskListAction(this.page, 1, 'initial');
    }

    onProcessedTap = (tab, number) => {
        const { True } = this.props;
        True.activeKey = tab.sub;
        True.taskListPEData = {};
        True.taskListPDData = {};
        this.page = 10;
        if (tab.sub == 'PE') {
            True.taskListAction(this.page, 1, 'initial');
        } else {
            True.taskListPDApiAction(this.page, 1, 'initial');
        }
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
        True.taskListPEData = {};
        True.taskListPDData = {};
        this.page = 10;
        if (True.activeKey == 'PE') {
            True.taskListAction(this.page, 1, 'initial');
        } else {
            True.taskListPDApiAction(this.page, 1, 'initial');
        }
    }

    renderRow = (v) => {
        return (
            <List>
                <Item
                    arrow="horizontal"
                    extra={
                        <Text style={{ fontSize: 13 }}>
                            {v.apply_time && format(v.apply_time, 'MM-dd hh:mm')}
                        </Text>
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
        this.page += 10;
        const { True } = this.props;
        if (True.activeKey == 'PE') {
            this.props.True.taskListAction(this.page);
        } else {
            this.props.True.taskListPDApiAction(this.page);
        }
    }

    renderPEList = (data) => {
        const { True } = this.props;
        const { taskListPELoading, taskListPEMore } = True;
        console.log('taskListPEMore', taskListPEMore);
        return (
            <ListView
                style={styles.scrollView}
                dataSource={ds.cloneWithRows([...data])}
                renderRow={this.renderRow}
                renderFooter={() => <RenderFooterLoading isLoadingMore={taskListPEMore}/>}
                onEndReached={() => {
                    this.onEndReached(taskListPEMore)
                }}
                onEndReachedThreshold={20}
                enableEmptySections={true}
                automaticallyAdjustContentInserts={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={taskListPELoading}
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

    renderPDList = (data) => {
        const { True } = this.props;
        const { taskListPDLoading, taskListPDMore } = True;
        console.log('taskListPDMore', taskListPDMore);

        return (
            <ListView
                style={styles.scrollView}
                dataSource={ds.cloneWithRows([...data])}
                renderRow={this.renderRow}
                renderFooter={() => <RenderFooterLoading isLoadingMore={taskListPDMore}/>}
                onEndReached={() => {
                    this.onEndReached(taskListPDMore)
                }}
                onEndReachedThreshold={20}
                enableEmptySections={true}
                automaticallyAdjustContentInserts={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={taskListPDLoading}
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
                    taskListPEData.data ?
                        this.renderPEList(taskListPEData.data || []) :
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
                }
                {
                    taskListPDData.data ?
                        this.renderPDList(taskListPDData.data || []) :
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
                }
            </Tabs>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    scrollView: {
        backgroundColor: '#fff'
    },
    brief: {
        fontSize: 13,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },
});

