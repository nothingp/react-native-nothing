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
        title: '可调休假申报审批'
    });

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.leaveawardDetailsApiAction();
    }

    componentWillUnmount() {
        const { True } = this.props;
        True.leaveawardDetail = {};
    }

    render() {
        const { True, navigation } = this.props;
        const { leaveawardDetail, activeKey } = True;

        const {
            as_of_date,
            remark,
            lv_claims_code,
            lv_claims_desc,
            status_desc,
            status,
            lv_adj_value,
            comments,
            is_last_approve,

            name,
            user_photo,
            position,
        } = leaveawardDetail;

        return (
            <ScrollView>
                <List>

                    {
                        renderHeadIconItem(user_photo, name, position)
                    }

                    {
                        renderNameItem(lv_claims_desc, '', '可调休假申报项')
                    }

                    {
                        renderNameItem(as_of_date ? format(as_of_date, 'yyyy-MM-dd') : '', '', '生效日期')
                    }

                    {
                        renderNameItem(lv_adj_value, '', '假期调整')
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