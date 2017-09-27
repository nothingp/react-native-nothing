import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

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

import { startLoginScreen } from '../../screens/index';

import { gColors } from '../../common/GlobalContants';
import BaseComponent from '../BaseComponent';
import navigator from '../../decorators/navigator';
import { format } from '../../util/tool';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('True', 'Base')
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'PE',
        };
    }

    componentWillMount() {
        let { Base, True } = this.props;
        autorun(() => {
            if (Base.userInfo) {
                True.taskListAction('ALL');
                Toast.loading('loading');
            }
        })
    }

    onProcessedTap = (activeKey) => {
        this.setState({ activeKey });
        let { True } = this.props;
        True.taskListAction('ALL', activeKey);
        Toast.loading('loading');
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

    onClick = (id, img, type) => {
        let { True } = this.props;

        switch (type) {
            case "PD":
                True.personaldataDetailApiAction(id, img, this.state.activeKey, () => {
                    this.props.navigator.push({
                        screen: 'Approving',
                        title: '基本信息审批'
                    })
                });
                break;
            case 'AD':
                break;
            case 'EC':
                True.emergencycontactDetailApiAction(id, img, this.state.activeKey, () => {
                    this.props.navigator.push({
                        screen: 'ContactInfo',
                        title: '联系人审批'
                    })
                });
                break;
            case 'BA':
                break;
            case 'ID':
                break;
            case 'EX':
                break;
            case 'ED':
                break;
            case 'CE':
                break;
            default:
        }


        Toast.loading('loading');
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
                                    extra={v.apply_time && format(v.apply_time, 'MM-dd')}
                                    thumb={
                                        v.user_photo || <Icon type={'\ue6a8'}/>
                                    }
                                    multipleLine
                                    onClick={
                                        () => {
                                            this.onClick(v.key, v.user_photo, v.function_dtl)
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
        let { True } = this.props;
        let { data = [], unprocessed_total = 0 } = True.taskListData;
        // <Badge text={unprocessed_total}>未处理</Badge>
        return (
            <Tabs onChange={this.onProcessedTap}
                  activeKey={this.state.activeKey}
                  activeTextColor={gColors.brandPrimary}
                  activeUnderlineColor={gColors.brandPrimary}>
                <TabPane tab='未处理' key="PE">
                    {this.renderList(data)}
                </TabPane>
                <TabPane tab="已处理" key="PD">
                    {this.renderList(data)}
                </TabPane>
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

