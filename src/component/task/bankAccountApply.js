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

    render() {
        let { True, navigation } = this.props;
        const { bankaccountDetail } = True;

        const {
            name,
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
            activeKey,
            img
        } = bankaccountDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(img, name, message)
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