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

import { renderNameItem, renderHeadIconItem, renderRemark } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '地址审批'
    });

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.addressDetailApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.addressDetailData = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    render() {
        const { True, navigation } = this.props;
        const {
            addressDetailData,
            activeKey,
        } = True;

        const {
            con_address,
            old_con_address,
            old_reg_address,
            reg_address,
            post_code,
            old_post_code,
            remark,
            message,
            comments,
            is_last_approve,

            user_photo,
            name,
            position
        } = addressDetailData;

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position)
                    }

                    {
                        renderNameItem(reg_address, old_reg_address, '户籍地')
                    }

                    {
                        renderNameItem(con_address, old_con_address, '联系地址')
                    }

                    {
                        renderNameItem(post_code, old_post_code, '邮编')
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