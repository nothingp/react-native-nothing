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
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal, Badge } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent';
import { format } from '../../util/tool';
import TabButton from './tabButton';
import { gColors } from '../../common/GlobalContants';
import RenderFooterLoading from '../RenderFooterLoading';

const Item = List.Item;
const Brief = Item.Brief;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

@inject('User', 'Common', 'Base', 'True')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '消息中心',
        tabBarIcon: ({ tintColor }) => (
            <TabButton tintColor={tintColor}/>
        )
    }

    page = 1

    componentWillMount() {
        autorun(() => {
            if (!this.props.Base.userInfo) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' })
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        })

        if (this.props.Base.userInfo) {
            this.props.User.alertsListData = [];
            this.props.User.alertsList();
        }
    }

    iconType = (type) => {
        let txt = '\ue6ab';
        switch (type) {
            case "PD":
                txt = '\ue66A';
                break;
            case 'AD':
                txt = '\ue686';
                break;
            case 'EC':
                txt = '\ue675';
                break;
            case 'BA':
                txt = '\ue6A6';
                break;
            case 'ID':
                txt = '\ue66F';
                break;
            case 'EX':
                txt = '\ue665';
                break;
            case 'ED':
                txt = '\ue66F';
                break;
            case 'CE':
                txt = '\ue637';
                break;
            default:
        }
        return (
            <Icon type={txt}/>
        )
    }

    onClickPP = async (id, type, selectTask) => {
        const { True, navigation } = this.props;
        True.selectTask = { ...selectTask, taskId: id, isMsg: true };
        True.activeKey = 'PD';//肯定是已经审批的信息

        if (selectTask.status == '0') {
            True.alertsSubmitApiAction(selectTask.alert_tbl_id);
        }

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
            navigation.navigate('LeaveLeaveInfo', { type: 'applyRecord' });
        }
        else if (selectTask.function == 'CL') {
            navigation.navigate('LeaveLeaveInfo', { type: 'cancelRecord' });
        }
        else if (selectTask.function == 'LC') {
            navigation.navigate('LeaveAwardApply');
        } else if (selectTask.function == 'CA') {
            navigation.navigate('ClaimsApply', { type: 'record' });
        }
    }

    onClickCm = (v) => {
        let { User, True, navigation } = this.props;
        Toast.loading('loading');
        User.alertsDetail(v);
        if (v.status == '0') {
            True.alertsSubmitApiAction(v.alert_tbl_id);
        }
        navigation.navigate('MsgDetail');
    }

    onRefresh = () => {
        this.page = 1;
        this.props.User.alertsListData = [];
        this.props.User.alertsList(this.page, 1, 'initial');
    }

    renderRow = (v) => {
        return (
            <List>
                <Item
                    arrow="horizontal"
                    extra={
                        <Text style={styles.txt}>
                            {v.create_time && format(v.create_time, 'MM-dd hh:mm')}
                        </Text>
                    }
                    thumb={
                        <Badge
                            dot={v.status == '0' ? true : false}>
                            {
                                this.iconType(v.function_dtl)
                            }
                        </Badge>
                    }
                    multipleLine
                    onClick={
                        () => {
                            v.function !== 'CM' ?
                                this.onClickPP(v.key, v.function_dtl, v) : this.onClickCm(v)
                        }
                    }
                >
                    <Text style={styles[v.function !== 'CM' ? 'title' : 'titleOnly']}>
                        {v.title}
                    </Text>
                    {
                        v.function !== 'CM' ?
                            <Brief style={styles.brief}>
                                {v.description}
                            </Brief>
                            : null
                    }
                </Item>
            </List>
        )
    }

    onEndReached = () => {
        const { User } = this.props;
        console.log('User.alertsListMore', User.alertsListMore);
        if (!User.alertsListMore || User.alertsListMoreLoading) {
            return;
        }
        this.page += 1;
        this.props.User.alertsList(this.page);
    }

    render() {
        const { User } = this.props;
        const data = User.alertsListData;
        console.log('data', [...data]);
        return (
            <ListView
                style={styles.scrollView}
                dataSource={ds.cloneWithRows([...data])}
                renderRow={this.renderRow}
                renderFooter={
                    () => <RenderFooterLoading
                        hasFooter={User.alertsListMoreLoading}
                        isLoadingMore={User.alertsListMore}
                        len={[...data].length}
                    />
                }
                onEndReached={this.onEndReached}
                onEndReachedThreshold={20}
                enableEmptySections={true}
                automaticallyAdjustContentInserts={false}
                showsVerticalScrollIndicator={true}
                refreshControl={
                    <RefreshControl
                        refreshing={User.alertsListLoading}
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
    scrollView: {
        backgroundColor: '#fff'
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 13,
    },
    titleOnly: {
        fontSize: 16,
        marginLeft: 10,
        height: Platform.OS == 'android' ? 40 : 28,
        marginTop: Platform.OS == 'android' ? 20 : 18,
    },
    title: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
    },
    brief: {
        fontSize: 13,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },
});

