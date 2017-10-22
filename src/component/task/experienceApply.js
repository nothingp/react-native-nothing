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
import { renderNameItem, renderAttachment, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '工作经验审批'
    });

    render() {
        const { True, navigator } = this.props;
        const { experienceDetail } = True;

        const {
            name,
            old_pri_position,
            pri_position,
            old_bgn_date,
            bgn_date,
            pri_comp,
            old_pri_comp,
            department,
            old_department,
            pri_country_desc,
            old_pri_country_desc,
            end_date,
            old_end_date,
            pri_contact_person,
            old_pri_contact_person,
            pri_contact_no,
            old_pri_contact_no,
            old_exp_remark,
            remark,
            exp_remark,
            message,
            comments,
            is_last_approve,
            activeKey,
            img
        } = experienceDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(img, name, message)
                    }

                    {
                        bgn_date &&
                        renderNameItem(format(bgn_date), old_bgn_date && format(old_bgn_date), '开始日期')
                    }

                    {
                        end_date &&
                        renderNameItem(format(end_date), old_end_date && format(old_end_date), '结束日期')
                    }

                    {
                        pri_comp &&
                        renderNameItem(pri_comp, old_pri_comp, '公司名称')
                    }

                    {
                        pri_country_desc &&
                        renderNameItem(pri_country_desc, old_pri_country_desc, '所在地区')
                    }

                    {
                        pri_position &&
                        renderNameItem(pri_position, old_pri_position, '职位')
                    }

                    {
                        department &&
                        renderNameItem(department, old_department, '部门')
                    }

                    {
                        pri_contact_person &&
                        renderNameItem(pri_contact_person, old_pri_contact_person, '联系人姓名')
                    }

                    {
                        pri_contact_no &&
                        renderNameItem(pri_contact_no, old_pri_contact_no, '联系电话')
                    }

                    {
                        exp_remark &&
                        renderNameItem(exp_remark, old_exp_remark, '工作经历备注')
                    }

                    {
                        remark && renderRemark(remark)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length>0  && <ApprovingHistory comments={comments}></ApprovingHistory>
                    }
                </List>
            </ScrollView>

        )
    }
}

export default createForm()(Index);