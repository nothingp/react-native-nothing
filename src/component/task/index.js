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
                                                    console.log('true')
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
                            })
                        }
                    </ScrollView>
                </TabPane>
                <TabPane tab="已处理" key="PD">
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
                                                    // True.alertsDetail(v);
                                                    // this.props.navigator.push({
                                                    //     screen: 'MsgDetail',
                                                    //     title: v.title
                                                    // })
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
                            })
                        }
                    </ScrollView>
                </TabPane>
            </Tabs>

        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: 55,
        lineHeight: 55,
        width: 150,
        fontSize: 14,
        marginLeft: 10
    },
    brief: {
        height: 18,
        width: 150,
        fontSize: 12,
        marginLeft: 10
    },
    item: {
        height: 66,
    },
    button: {
        backgroundColor: '#f00'
    },
    icon: {
        marginRight: 30
    },
    Picker: {
        height: 30,
        fontSize: 10,
        width: 50
    },
});

