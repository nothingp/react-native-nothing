/**
 * 添加联系人
 */

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

import { Flex, WingBlank, WhiteSpace, Toast,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';
import districtList from '../../const/district';

@inject('User', 'Common')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
        //保存信息
        this.onSave = async () => {
            //
            const { form} = this.props;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        relate_type,
                        chinese_name,
                        contact_no,
                        prc_age,
                        prc_work_unit,
                        remark,
                        approver_id,
                    } = values;
                    const obj = {
                        relate_type,
                        chinese_name,
                        contact_no,
                        prc_age,
                        prc_work_unit,
                        remark,
                        approver_id,
                        is_save: 1,
                    }
                    await this.props.User.addRelationFn(obj);
                }
                else {
                    if (err.relate_type) {
                        Toast.info('请选择关系类型');
                    }
                    else if (err.chinese_name) {
                        Toast.info('请填写联系人名字');
                    }
                    else if (err.approver_id) {
                        Toast.info('请填写审批人信息');
                    }
                }

            });
        }
        //提交联系人信息
        this.onSubmit = async () => {
            //
            const { form} = this.props;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        relate_type,
                        chinese_name,
                        contact_no,
                        prc_age,
                        prc_work_unit,
                        remark,
                        approver_id,
                    } = values;
                    const obj = {
                        relate_type,
                        chinese_name,
                        contact_no,
                        prc_age,
                        prc_work_unit,
                        remark,
                        approver_id,
                        is_save: 0,
                    }
                    await this.props.User.addRelationFn(obj);
                }
                else {
                    if (err.relate_type) {
                        Toast.info('请选择关系类型');
                    }
                    else if (err.chinese_name) {
                        Toast.info('请填写联系人名字');
                    }
                    else if (err.approver_id) {
                        Toast.info('请填写审批人信息');
                    }
                }

            });
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();
        //请求联系人关系列表
        this.props.Common.getRelationShip();
        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {relationShipList} = this.props.Common;
        const {approverList} = this.props.User;

        return (
            <ScrollView>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'bgn_date',
                                    {
                                        initialValue: '',
                                        rules: [{required: true}],

                                    }
                                )
                            }
                >
                    <List.Item arrow="horizontal">开始日期：</List.Item>
                </DatePicker>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'end_date',
                                    {
                                        initialValue: '',
                                        rules: [{required: true}],

                                    }
                                )
                            }
                >
                    <List.Item arrow="horizontal">结束日期：</List.Item>
                </DatePicker>
                <InputItem
                    {
                        ...getFieldProps(
                            'chinese_name',
                            {
                                initialValue: '',
                                rules: [{required: true}],
                            }
                        )
                    }
                >公司名称：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'contact_no',
                            {
                                initialValue: '',
                                rules: [{required: true}],
                            }
                        )
                    }
                >所在地区：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_age',
                            {
                                initialValue: '',
                            }
                        )
                    }
                >在职单位：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_work_unit',
                            {
                                initialValue: '',
                            }
                        )
                    }
                >所在部门：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_work_unit',
                            {
                                initialValue: '',
                            }
                        )
                    }
                >联系人：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_work_unit',
                            {
                                initialValue: '',
                            }
                        )
                    }
                >联系人电话：</InputItem>
                <List renderHeader={() => '工作经历描述'}>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: '',
                            })
                        }
                        rows={5}
                        count={100}
                    />
                </List>
                <Picker data={approverList} cols={1}
                        {
                            ...getFieldProps(
                                'approver_id',
                                {
                                    initialValue: [approverList.length?approverList[0].value: ''],
                                    rules: [{required: true}],
                                }
                            )
                        }>
                    <List.Item arrow="horizontal">审批人：</List.Item>
                </Picker>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: '',
                            })
                        }
                        rows={5}
                        count={100}
                    />
                </List>
                <WhiteSpace size="xl"/>
                <Flex>
                    <Flex.Item>
                        <WingBlank>
                            <Button type="primary" onClick={this.onSave}>保存</Button>
                        </WingBlank>
                    </Flex.Item>
                    <Flex.Item>
                        <WingBlank>
                            <Button type="primary" onClick={this.onSubmit}>提交</Button>
                        </WingBlank>
                    </Flex.Item>
                </Flex>
            </ScrollView>

        )
    }
}

export default createForm()(Index);