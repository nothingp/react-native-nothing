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
        let { True, navigation } = this.props;
        const { leaveawardDetail } = True;

        const {
            name,
            as_of_date,
            remark,
            lv_claims_code,
            lv_claims_desc,
            status_desc,
            status,
            lv_adj_value,
            comments,
            is_last_approve,
            activeKey,
            img
        } = leaveawardDetail || {};

        return (
            <ScrollView>
                <List>

                    {
                        renderHeadIconItem(img, name, '')
                    }

                    {
                        renderNameItem(lv_claims_desc, '', '可调休假申报项')
                    }

                    {
                        renderNameItem(as_of_date ? format(as_of_date, 'yyyy-MM-dd') : '', '', '日期')
                    }

                    {
                        renderNameItem(lv_adj_value, '', '调休天数')
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