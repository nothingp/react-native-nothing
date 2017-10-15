import React, { Component } from 'react';
import moment from 'moment';
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

    static navigationOptions = ({ navigation }) => ({
        title: '我的假期'
    });

    render() {
        let { True, navigator } = this.props;
        const { bankaccountDetail } = True;

        const {
            name,
            user_defined_field_1_value,
            user_defined_field_1_label,
            begin_time_half,
            end_time_half,
            begin_time,
            end_time,
            dur_days,
            remark,
            doctor_certificate,
            comments,
            lv_type_desc,
            is_last_approve,
            activeKey,
            img
        } = bankaccountDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderNameItem(lv_type_desc, '', '假期类型')
                    }
                </List>

                <List renderHeader={'假期类型相关的一些描述信息'}>
                    {
                        renderNameItem(begin_time ? format(begin_time, 'yyyy-MM-dd') : '', '', '开始时间')
                    }

                    {
                        renderNameItem(end_time ? format(end_time, 'yyyy-MM-dd') : '', '', '结束时间')
                    }

                    {
                        renderNameItem(dur_days, '', '假期天数')
                    }

                    {
                        renderNameItem(user_defined_field_1_value, '', user_defined_field_1_label)
                    }

                    {
                        renderAttachment(doctor_certificate, '')
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigator={navigator} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length > 0 && <ApprovingHistory comments={comments}></ApprovingHistory>
                    }
                </List>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 40,
        borderRadius: 2
    },
    list: {
        height: 15
    },
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

export default createForm()(Index);