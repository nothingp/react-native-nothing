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
        title: '假期余额'
    });

    componentWillMount() {
        let { True } = this.props;
        True.leaveLeavebalanceApiAction();
        Toast.loading('loading');
    }

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
                    <Item extra={'还剩2天'}>年假</Item>
                    <Item>上年度剩余假期:无</Item>
                    <Item>本年度有效假期:2天</Item>
                    <Item>已休假期:2天</Item>

                </List>
                <WhiteSpace/>

                <List>
                    <Item extra={'还剩2天'}>调休假</Item>
                    <Item>上年度剩余假期:无</Item>
                    <Item>本年度有效假期:2天</Item>
                    <Item>已休假期:2天</Item>

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