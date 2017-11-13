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
import { NavigationActions } from 'react-navigation';

import BaseComponent from '../BaseComponent';
import GridLike from '../GridLike';

const Item = List.Item;
const Brief = Item.Brief;

import GridStyle from 'antd-mobile/lib/grid/style/index.native.js';

const GridItemStyle = {
    ...GridStyle,
    text: {
        fontSize: 16,
        color: '#333',
        marginTop: 20
    }
    // grayBorderBox: {
    //     borderColor: _default2['default'].border_color_base
    // },
    // icon: {
    //     width: _default2['default'].icon_size_md,
    //     height: _default2['default'].icon_size_md
    // },
    // text: {
    //     fontSize: _default2['default'].font_size_caption_sm,
    //     color: _default2['default'].color_text_base,
    //     marginTop: _default2['default'].v_spacing_md
    // }
}


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
        const { Base, True, navigation } = this.props;
        if (Base.userInfo) {
            True.sysfunctionmenuListAction();
        } else {
            Toast.fail(
                '异常登录，请重新登录',
                1,
                () => {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login' })
                        ]
                    })
                    navigation.dispatch(resetAction);
                }
            );
        }
    }

    initialData = (data) => {
        let newData = [];
        data && data.map((v, i) => {
            let url = <Image style={{ width: 50, height: 50 }}
                             source={require('../../resource/daily/daily_notice.png')}/>
            switch (v.code) {
                case 'notice_list':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_notice.png')}/>
                    break;
                case 'hr_timesheet':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_time_sheet.png')}/>
                    break;
                case 'leave_list':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_leave.png')}/>
                    break;
                case 'leave_balance':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_lv_bal.png')}/>
                    break;
                case 'claim_list':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_claims.png')}/>
                    break;
                case 'payslip':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_lv_award.png')}/>
                    break;
                case 'roster':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_attendance.png')}/>
                    break;
                case 'employee_leave_award_list':
                    url = <Image style={{ width: 50, height: 50 }}
                                 source={require('../../resource/daily/daily_roster.png')}/>
                    break;

            }
            newData.push({
                ...v,
                text: v.name_eng,
                icon: url,
            })
        })
        return (
            newData
        )
    }

    iconClickFn = (obj, i) => {
        console.log('obj-i', obj, i);
        const { True, navigation } = this.props;

        switch (obj.menu_code) {
            case '10211':
                navigation.navigate('Notice');//"公告"
                break;
            case '10212':
                navigation.navigate('LeaveLeaveBalance');//"假期余额"
                break;
            case '10203':
                navigation.navigate('MyHoliday');//"我的假期"
                break;
            case '10204':
                navigation.navigate('Reimbursement');//"报销"
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
    }

    render() {
        const { True } = this.props;
        return (
            <View style={styles.panel}>
                <GridLike
                    //styles={GridItemStyle}
                    data={
                        this.initialData(True.sysfunctionmenuListData)
                    }
                    columnNum={2}
                    onClick={
                        (obj, i) => {
                            this.iconClickFn(obj, i)
                        }
                    }
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#fff'
    },
});