import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    Image
} from 'react-native';
import { Grid, WhiteSpace, Icon, Toast, List } from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import BaseComponent from '../BaseComponent'
import navigator from '../../decorators/navigator'

const Item = List.Item;
const Brief = Item.Brief;

@inject('True', 'Base')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '日常管理',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../resource/tabs/daily_01.png')}
                style={[{ tintColor: tintColor }]}
            />
        )
    }

    componentWillMount() {
        let { Base, True } = this.props;
        if (Base.userInfo) {
            True.sysfunctionmenuListAction();
            Toast.loading('loading');
        }
    }

    initialData = (data) => {
        let newData = []
        data && data.map((v, i) => {
            let url = <Image style={{ width: 40, height: 40 }}
                             source={require('../../resource/daily/daily_notice.png')}/>
            switch (v.code) {
                case 'notice_list':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_notice.png')}/>
                    break;
                case 'hr_timesheet':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_time_sheet.png')}/>
                    break;
                case 'leave_list':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_leave.png')}/>
                    break;
                case 'leave_balance':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_lv_bal.png')}/>
                    break;
                case 'claim_list':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_claims.png')}/>
                    break;
                case 'payslip':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_lv_award.png')}/>
                    break;
                case 'roster':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_attendance.png')}/>
                    break;
                case 'employee_leave_award_list':
                    url = <Image style={{ width: 40, height: 40 }}
                                 source={require('../../resource/daily/daily_roster.png')}/>
                    break;

            }
            newData.push({
                ...v,
                text: v.name_trad,
                icon: url,
            })
        })
        return (
            newData
        )
    }

    render() {
        let { True, navigation } = this.props;
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Grid data={this.initialData(True.sysfunctionmenuListData)} columnNum={3} onClick={(obj, i) => {
                    console.log('obj-i', obj, i);
                    switch (obj.menu_code) {
                        case '10211':
                            navigation.navigate('Notice');//"公告"
                            break;
                        case '10212':
                            navigation.navigate('LeaveLeaveBalance');//"假期余额"
                            break;
                        case '10203':
                            // navigation.navigate('LeaveLeaveBalance');//"我的假期"
                            break;
                        case '10204':
                            // navigation.navigate('LeaveLeaveBalance');//"报销"
                            break;
                        case '10205':
                            // navigation.navigate('LeaveLeaveBalance');//"我的薪酬"
                            break;
                        case '10210':
                            // navigation.navigate('LeaveLeaveBalance');//"可调休假申报"
                            break;
                        case '10207':
                            // navigation.navigate('LeaveLeaveBalance');//"出勤"
                            break;
                        case '10202':
                            // navigation.navigate('LeaveLeaveBalance');//"工作时间"
                            break;
                    }
                }}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        backgroundColor: 'green'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height: 15
    }
});