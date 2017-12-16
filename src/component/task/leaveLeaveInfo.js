import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    Image,
    StatusBar
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Grid,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderAttachment, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        const { type } = navigation.state.params;
        return {
            title: type == 'applyRecord' ? '请假审批记录'
                : type == 'cancel' ? '取消请假审批'
                    : type == 'cancelRecord' ? '取消请假审批记录'
                        : '请假审批',
        }
    };

    componentWillMount() {
        const { True } = this.props;
        True.leaveLeaveinfoApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.leaveLeaveinfoDetail = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    render() {
        const { True, navigation } = this.props;
        const { leaveLeaveinfoDetail, activeKey } = True;

        const {
            begin_time,
            begin_time_half,
            comments,
            doctor_certificate,
            dur_days,
            end_time,
            end_time_half,
            is_last_approve,
            lv_apply_tbl_id,
            lv_type,
            lv_type_desc,
            remark,
            status,
            status_desc,
            user_defined_field_1_label,
            user_defined_field_1_value,

            name,
            user_photo,
            position,

        } = leaveLeaveinfoDetail;

        return (
            <ScrollView style={{ height: '100%' }}>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }
                </List>

                {
                    // activeKey == 'PE' &&
                    <List>
                        <List.Item
                            arrow="horizontal"
                            onClick={
                                () => {
                                    navigation.navigate('RecentLeaveList');
                                }
                            }
                        >
                            <Text>
                                查看近期假期
                            </Text>
                        </List.Item>
                    </List>
                }

                <WhiteSpace size="lg"/>

                <List>
                    <List.Item
                        arrow="empty"
                    >
                        <Text>
                            {'假期类型'}：{lv_type_desc}
                        </Text>
                    </List.Item>
                </List>

                <List>
                    <List.Item
                        arrow="empty"
                    >
                        <Text>
                            {'开始时间'}：{begin_time ? format(begin_time, 'yyyy-MM-dd') : ''}
                        </Text>
                    </List.Item>
                </List>

                <List>
                    <List.Item
                        arrow="empty"
                    >
                        <Text>
                            {'结束时间'}：{end_time ? format(end_time, 'yyyy-MM-dd') : ''}
                        </Text>
                    </List.Item>
                </List>

                <List>
                    <List.Item
                        arrow="empty"
                    >
                        <Text>
                            {'假期天数'}：{dur_days}
                        </Text>
                    </List.Item>
                </List>

                <List>
                    <List.Item
                        arrow="empty"
                    >
                        <Text>
                            {'请假事由'}：{remark}
                        </Text>
                    </List.Item>
                </List>

                {
                    user_defined_field_1_label ?
                        <List>
                            <List.Item
                                arrow="empty"
                            >
                                <Text>
                                    {user_defined_field_1_label}：{user_defined_field_1_value}
                                </Text>
                            </List.Item>
                        </List>
                        : null
                }

                {
                    doctor_certificate ? renderAttachment(doctor_certificate, doctor_certificate, this) : null
                }

                {
                    activeKey == 'PE' &&
                    <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                }

                {
                    comments && comments.length > 0 && <ApprovingHistory comments={comments}></ApprovingHistory>
                }
            </ScrollView>

        )
    }
}

export default createForm()(Index);
