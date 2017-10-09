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
import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator';
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderAttachment, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    componentWillMount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }

    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }

    render() {
        let { True, navigator } = this.props;
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
                        prc_branch &&
                        renderNameItem(bank_desc, old_bank_desc, '银行')
                    }

                    {
                        prc_branch &&
                        renderNameItem(prc_branch, old_prc_branch, '分行名称')
                    }

                    {
                        bank_account_id &&
                        renderNameItem(bank_account_id, old_bank_account_id, '卡号')
                    }

                    {
                        payee_name &&
                        renderNameItem(payee_name, old_payee_name, '持卡人')
                    }

                    {
                        attachment &&
                        renderAttachment(attachment, old_attachment)
                    }

                    {
                        remark && renderRemark(remark)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigator={navigator} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length>0 && <ApprovingHistory comments={comments}></ApprovingHistory>
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