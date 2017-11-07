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

    static navigationOptions = ({ navigation }) => ({
        title: '支付账户审批'
    });

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.bankaccountDetailApiAction();
    }

    componentWillUnmount() {
        const { True } = this.props;
        True.bankaccountDetail = {};
    }

    render() {
        let { True, navigation } = this.props;
        const {
            bankaccountDetail,
            activeKey,
        } = True;

        const {
            prc_branch,
            old_prc_branch,
            old_attachment,
            attachment,
            old_bank_account_id,
            bank_account_id,
            old_payee_name,
            payee_name,
            bank_desc,
            old_bank_desc,
            remark,
            message,
            comments,
            is_last_approve,

            user_photo,
            name,
            position
        } = bankaccountDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position)
                    }

                    {
                        renderNameItem(bank_desc, old_bank_desc, '银行')
                    }

                    {
                        renderNameItem(prc_branch, old_prc_branch, '分行名称')
                    }

                    {
                        renderNameItem(bank_account_id, old_bank_account_id, '卡号')
                    }

                    {
                        renderNameItem(payee_name, old_payee_name, '持卡人')
                    }

                    {
                        renderAttachment(attachment, old_attachment)
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