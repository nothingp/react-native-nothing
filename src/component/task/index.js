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
    TouchableOpacity,
    Image
} from 'react-native';
import { Tabs, Badge, Icon, Grid, Button, List, PickerView, Toast } from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import { gColors } from '../../common/GlobalContants';
import BaseComponent from '../BaseComponent';
import LightBoxScreen from './lightBoxScreen';
import { format } from '../../util/tool';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

@inject('True', 'Base')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '任务',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../resource/tabs/task_01.png')}
                style={[{ tintColor: tintColor }]}
            />
        ),
        headerRight: (
            <LightBoxScreen/>
        ),
    }

    componentWillMount() {
        const { True } = this.props;
        True.taskSelectType = {
            label: '所有',
            value: 'ALL'
        };
        True.activeKey = 'PE';
        Toast.loading('loading');
        True.taskListAction();
    }

    onProcessedTap = (tab, number) => {
        const { True } = this.props;
        True.activeKey = tab.sub;
        Toast.loading('loading');
        True.taskListAction();
    }

    getTypeFn = (props) => {
        //个人信息（PP）假期（LA）报销（CA）工作时间表（TS）可调休假（LC）取消假期（CL）
        let type = '';
        switch (props) {
            case "PP":
                type = '个人档案';
                break;
            case 'LA':
                type = '假期';
                break;
            case 'CA':
                type = '报销';
                break;
            case 'TS':
                type = '工作时间表';
                break;
            case 'LC':
                type = '可调休假';
                break;
            case 'CL':
                type = '取消假期';
                break;
            default:
        }
        return type;
    }

    getSubTypeFn = (props) => {
        let subType = '';
        switch (props) {
            case "PD":
                subType = '基本信息';
                break;
            case 'AD':
                subType = '家庭住址';
                break;
            case 'EC':
                subType = '联系人';
                break;
            case 'BA':
                subType = '工资账号';
                break;
            case 'ID':
                subType = '证件信息';
                break;
            case 'EX':
                subType = '工作经历';
                break;
            case 'ED':
                subType = '教育经历';
                break;
            case 'CE':
                subType = '相关证书';
                break;
            default:
        }
        return subType;
    }

    onClick = (id, img, type, name, selectTask) => {
        let { True, navigation } = this.props;
        True.selectTask = selectTask;
        Toast.loading('loading');

        if (selectTask.function == 'PP') {
            switch (type) {
                case "PD":
                    True.personaldataDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('Approving')
                        });
                    break;
                case 'AD':
                    True.addressDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('AddressApply')
                        });
                    break;
                case 'EC':
                    True.emergencycontactDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('ContactInfo')
                        });
                    break;
                case 'BA':
                    True.bankaccountDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('BankAccountApply')
                        });
                    break;
                case 'ID':
                    True.identityDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('IdentityApply')
                        });
                    break;
                case 'EX':
                    True.experienceDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('ExperienceApply')
                        });
                    break;
                case 'ED':
                    True.educationDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('EducationApply')
                        });
                    break;
                case 'CE':
                    True.certificateDetailApiAction(id, img, name,
                        () => {
                            navigation.navigate('CertificateApply')
                        });
                    break;
                default:
            }
        } else if (selectTask.function == 'LA') {
            True.leaveLeaveinfoApiAction(id, img, name,
                () => {
                    navigation.navigate('LeaveLeaveInfo');
                });
        }
        else if (selectTask.function == 'LC') {
            True.leaveawardDetailsApiAction(id, img, name,
                () => {
                    navigation.navigate('LeaveAwardApply');
                });
        } else if (selectTask.function == 'CA') {
            True.claimsDetailsApiAction(id, img, name,
                () => {
                    navigation.navigate('LeaveAwardApply');
                });
        }
    }

    renderList = (data) => {
        return (
            <ScrollView>
                {
                    data.map((v, i) => {
                        return (
                            <List key={i}>
                                <Item
                                    arrow="horizontal"
                                    extra={v.apply_time && format(v.apply_time, 'MM-dd hh:mm')}
                                    multipleLine
                                    onClick={
                                        () => {
                                            this.onClick(v.key, v.user_photo, v.function_dtl, v.name, v)
                                        }
                                    }
                                >
                                    <Text style={styles.title}>
                                        {v.name}
                                    </Text>
                                    <Brief style={styles.brief}>
                                        {this.getTypeFn(v.function)}-{this.getSubTypeFn(v.function_dtl)}
                                        变更申请
                                    </Brief>
                                    <Brief style={styles.brief}>{v.description}</Brief>
                                </Item>
                            </List>
                        )
                    })
                }
            </ScrollView>
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
                {this.renderList(taskListPEData.data || [])}
                {this.renderList(taskListPDData.data || [])}
            </Tabs>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: 30,
        lineHeight: 30,
        width: 150,
        fontSize: 14,
        marginLeft: 10
    },
    brief: {
        height: 18,
        width: 200,
        fontSize: 10,
        marginLeft: 10
    },
});

