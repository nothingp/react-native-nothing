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
import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator';
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {//请求审核人列表
        let { User, True } = this.props;
        let { bankaccountDetail } = True;
        let { activeKey } = bankaccountDetail || {};
        if (activeKey == 'PE') {
            User.getApprover();
        }
    }

    renderIcon = (txt, old_txt) => {
        let same = false;
        let diff = false;
        let add = false;

        if (!old_txt && txt) {
            add = true;
            return (
                <Icon type={'\ue630'} color={'#5ade00'}/>
            )
        }
        else if (old_txt && txt && old_txt != txt) {
            diff = true;
            return (
                <Text onPress={() => {
                    Toast.success('修改前：' + old_txt);
                }}>
                    <Icon type={'\ue631'} color={'#f59700'}/>
                </Text>

            )

        }
        else if (old_txt == txt) {
            same = true;
            return ''
        }
        return ''
    }

    renderNameItem = (txt, old_txt, name) => {
        return (
            <List.Item
                arrow="empty"
                extra={
                    this.renderIcon(txt, old_txt)
                }
            >
                <Text style={styles.title}>
                    {`${name} : ${txt}`}
                </Text>
            </List.Item>
        )
    }

    render() {
        let { True, form, User, navigator } = this.props;
        const { getFieldProps } = form;
        const { approverList } = User;
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
                    <List.Item
                        arrow="empty"
                        thumb={
                            img || <Icon type={'\ue6a8'}/>
                        }
                        multipleLine
                    >
                        <Text style={styles.title}>
                            {name}
                        </Text>
                        <Brief style={styles.brief}>{message}</Brief>
                    </List.Item>

                    {
                        this.renderNameItem(bank_desc, old_bank_desc, '银行')
                    }

                    {
                        this.renderNameItem(prc_branch, old_prc_branch, '分行名称')
                    }

                    {
                        this.renderNameItem(bank_account_id, old_bank_account_id, '卡号')
                    }

                    {
                        this.renderNameItem(payee_name, old_payee_name, '持卡人')
                    }

                    {
                        <List.Item
                            arrow="empty"
                            extra={
                                this.renderIcon(attachment, old_attachment)
                            }
                        >
                            <Text style={styles.title}>
                                附件
                            </Text>
                            <Image style={styles.image} source={{ uri: attachment }}/>
                        </List.Item>
                    }

                    <List.Item arrow="empty">
                        <Text style={styles.title}>
                            {`${'备注'} : ${remark}`}
                        </Text>
                    </List.Item>

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigator={navigator} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        activeKey == 'PD' && <ApprovingHistory comments={comments}></ApprovingHistory>
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