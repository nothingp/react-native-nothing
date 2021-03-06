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
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import ApprovingButton from '../task/approvingButton';
import ApprovingHistory from '../task/approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderHeadIconItem } from '../task/common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '证件审批'
    });

    render() {
        let { True, navigator } = this.props;
        const { identityDetail } = True;

        const {
            name,
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
            activeKey,
            img
        } = identityDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(img, name, message, this)
                    }

                    {
                        renderNameItem(id_no, old_id_no, '身份证')
                    }

                    {
                        coss_no && renderNameItem(coss_no, old_coss_no, '社保电脑号')
                    }

                    {
                        housing_fund_no && renderNameItem(housing_fund_no, old_housing_fund_no, '住房公积金号')
                    }

                    {
                        remark && renderRemark(remark)
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