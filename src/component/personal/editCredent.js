/**
 * 查看证件
 **/

import React, {PureComponent} from 'react';
import {Flex, InputItem, Picker, TextareaItem, WingBlank, List, WhiteSpace, Button} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';

import {
    View,
    StyleSheet,
    Text,
    PixelRatio
} from 'react-native';

import {Item} from './common/index';
import navigator from '../../decorators/navigator'

@navigator
@inject('User')
@observer
class Index extends PureComponent{
    constructor(props) {
        super(props);
        this.onSave = async () => {
            //
            const {relationship_tbl_id, relationship_tbl_approve_id} = this.props.User.selectPerson;

            const { form} = this.props;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        id_no,
                        coss_no,
                        housing_fund_no,
                        remark,
                        approver_id,
                    } = values;
                    //判断是保存还是提交
                    const obj = {
                        id_no,
                        coss_no,
                        housing_fund_no,
                        remark,
                        approver_id: approver_id[0],
                    }
                    await this.props.User.saveIdentity(obj);
                }
                else {
                    if (err.id_no) {
                        Toast.info('请填写身份证');
                    }
                    else if (err.coss_no) {
                        Toast.info('请填写社保电脑号');
                    }
                    else if (err.housing_fund_no) {
                        Toast.info('请填写住房公积金号');
                    }
                    else if (err.approver_id) {
                        Toast.info('请选择审批人信息');
                    }
                }

            });
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();
        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const { getFieldProps } = this.props.form;

        const {approverList, selfIdentity} = this.props.User;
        let idNo = ''; //
        let cossNo = ''; //
        let housingFundNo = ''; //
        let remark = ''; //备注
        if(selfIdentity){
            const {id_no, coss_no, housing_fund_no} = selfIdentity;
            idNo = id_no;
            cossNo = coss_no;
            housingFundNo = housing_fund_no;
            remark = selfIdentity.remark;
        }

        return(
            <View>
                <InputItem
                    {
                        ...getFieldProps(
                            'id_no',
                            {
                                initialValue: idNo,
                            }
                        )
                    }
                >身份证：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'coss_no',
                            {
                                initialValue: cossNo,
                            }
                        )
                    }
                >社保电脑号：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'housing_fund_no',
                            {
                                initialValue: housingFundNo,
                            }
                        )
                    }
                >住房公积金号：</InputItem>
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
                                initialValue: remark?remark:'',
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
                </Flex>
            </View>
        )
    }
}

export default createForm()(Index);