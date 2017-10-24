/**
 * 编辑证件信息
 **/

import React, {PureComponent} from 'react';
import {Flex, InputItem, Picker, TextareaItem, WingBlank, List, WhiteSpace, Button, Toast} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import {RequireData} from './common/index';

import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';


@inject('User')
@observer
class Index extends PureComponent{
    static navigationOptions = ({ navigation }) => ({
        title:'编辑证件信息',
    });
    constructor(props) {
        super(props);
        this.onSave = async () => {
            //

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
                    if(approver_id.length == 0){
                        Toast.info('请选择审批人');
                        return
                    }
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }
                    //判断是保存还是提交
                    const obj = {
                        id_no,
                        coss_no,
                        housing_fund_no,
                        remark,
                        approver_id: approver_id[0],
                    }
                    this.props.User.saveIdentity(obj, successFn);
                }
                else {
                    if (err.approver_id) {
                        Toast.info('请选择审批人信息');
                    }
                }

            });
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();
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
            <View style={{overflow: 'scroll', height: '100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <InputItem
                        {
                            ...getFieldProps(
                                'id_no',
                                {
                                    initialValue: idNo,
                                }
                            )
                        }
                    ><RequireData require={false} text="身份证:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'coss_no',
                                {
                                    initialValue: cossNo,
                                }
                            )
                        }
                    ><RequireData require={false} text="社保电脑号:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'housing_fund_no',
                                {
                                    initialValue: housingFundNo,
                                }
                            )
                        }
                    ><RequireData require={false} text="住房公积金号:"/></InputItem>
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
                        <List.Item arrow="horizontal"><RequireData require={true} text="审批人:"/></List.Item>
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
                </ScrollView>
                <View style={{backgroundColor: '#fff'}}>
                    <WhiteSpace size="sm"/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSave}>保存</Button>
                    </WingBlank>
                    <WhiteSpace size="sm"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    brief: {
        fontSize: 14
    }
});
export default createForm()(Index);