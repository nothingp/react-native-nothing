import React, { Component } from 'react';
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

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.experienceDetailApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.experienceDetail = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    render() {
        const { True, navigation } = this.props;
        const { experienceDetail, activeKey } = True;

        const {
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

            name,
            user_photo,
            position,
        } = experienceDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }

                    {
                        renderNameItem(
                            bgn_date ? format(bgn_date, 'yyyy-MM-dd') : '',
                            old_bgn_date ? format(old_bgn_date, 'yyyy-MM-dd') : '',
                            '开始日期'
                        )
                    }

                    {
                        renderNameItem(
                            end_date ? format(end_date, 'yyyy-MM-dd') : '',
                            old_end_date ? format(old_end_date, 'yyyy-MM-dd') : '',
                            '结束日期'
                        )
                    }

                    {
                        renderNameItem(pri_comp, old_pri_comp, '公司名称')
                    }

                    {
                        renderNameItem(pri_country_desc, old_pri_country_desc, '所在地区')
                    }

                    {
                        renderNameItem(pri_position, old_pri_position, '职位')
                    }

                    {
                        renderNameItem(department, old_department, '部门')
                    }

                    {
                        renderNameItem(pri_contact_person, old_pri_contact_person, '联系人姓名')
                    }

                    {
                        renderNameItem(pri_contact_no, old_pri_contact_no, '联系电话')
                    }

                    {
                        renderNameItem(exp_remark, old_exp_remark, '工作经历备注')
                    }

                    {
                        renderRemark(remark)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length > 0 && <ApprovingHistory comments={comments}></ApprovingHistory>
                    }
                </List>
            </ScrollView>

        )
    }
}

export default createForm()(Index);