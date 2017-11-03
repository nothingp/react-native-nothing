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
    Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

//import JPushModule from 'jpush-react-native';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal, Badge } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent'
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;
import { personalInfoApi } from '../../services/baseService'

@inject('User', 'Common', 'Base', 'True')
@observer
export default class Index extends BaseComponent {

    static navigationOptions = {
        title: '消息中心',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../resource/tabs/message_01.png')}
                style={[{ tintColor: tintColor }]}
            />
        )
    }

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
            this.props.User.alertsList();
        }
    }

    componentWillUnmount() {
        // JPushModule.removeReceiveCustomMsgListener();
        // JPushModule.removeReceiveNotificationListener();
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
        const { True, navigation, Base, User } = this.props;
        True.selectTask = selectTask;
        True.activeKey = 'PD';//肯定是已经审批的信息

        Toast.loading('loading');

        const img = '';
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const data = await personalInfoApi({
            user_id: staff_no,
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        });

        const name = data.resultdata && data.resultdata.name;

        if (selectTask.status == '0') {
            True.alertsSubmitApiAction(selectTask.alert_tbl_id, User.alertsList);
        }

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
        }
        else if (selectTask.function == 'LA') {
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

    onClickCm = (v) => {
        let { User, True, navigation } = this.props;
        Toast.loading('loading');
        User.alertsDetail(v);
        if (v.status == '0') {
            True.alertsSubmitApiAction(v.alert_tbl_id, User.alertsList);
        }
        navigation.navigate('MsgDetail');
    }

    render() {
        let { User, True, navigation } = this.props;
        let { data = [], unread_total = 0 } = User.alertsListData;
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                {
                    data.map((v, i) => {
                        return (
                            <List key={i}>
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
                    })
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    titleOnly: {
        width: 150,
        fontSize: 16,
        marginLeft: 10,
        marginTop: 17,
        marginBottom: 7,
    },
    title: {
        width: 150,
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
    },
    brief: {
        width: 150,
        fontSize: 13,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },
});

