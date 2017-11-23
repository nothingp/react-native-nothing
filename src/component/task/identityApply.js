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
import { renderNameItem, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '证件审批'
    });

    componentWillMount() {
        const { True } = this.props;
        True.identityDetailApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.identityDetail = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    render() {
        let { True, navigation } = this.props;
        const { identityDetail, activeKey } = True;

        const {
            coss_no,
            old_coss_no,
            old_housing_fund_no,
            housing_fund_no,
            id_no,
            old_id_no,
            remark,
            message,
            comments,
            is_last_approve,

            name,
            user_photo,
            position,
        } = identityDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }

                    {
                        renderNameItem(id_no, old_id_no, '身份证')
                    }

                    {
                        renderNameItem(coss_no, old_coss_no, '社保电脑号')
                    }

                    {
                        renderNameItem(housing_fund_no, old_housing_fund_no, '住房公积金号')
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