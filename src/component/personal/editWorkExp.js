/**
 * 添加工作经历
 */

import React, { Component } from 'react';
import moment from 'moment';
import {merged} from '../../common/Tool';

import {
    ScrollView,
    Text,
    StyleSheet,
    View,
} from 'react-native';

import { Flex, WingBlank, WhiteSpace, Toast,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import {NoticeBarMessage} from './common';
import TitleButton from './common/workTitleButton';
import {RequireData} from './common/index';
import ApprovingButton from './approvingButton';

@inject('User', 'Common','True')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const {type} = navigation.state.params;
        if(type && type == 'edit'){
            return {
                title:'编辑工作经历',
                headerRight: (
                    <TitleButton navigation={navigation}/>
                ),
            }
        }else{
            return {
                title:'添加工作经历',
            }
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
        //提交工作经历信息
        this.onSubmit = async (ifSave) => {
            //
            const { form,True} = this.props;
            const {selectExp} = this.props.User;
            const {selectTask, selectApprover} = True;
            form.validateFields(async (err, values) => {
                const approver_id=selectApprover.value;
                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        bgn_date,
                        end_date,
                        pri_country_code,
                        pri_comp,
                        pri_position,
                        department,
                        pri_contact_person,
                        pri_contact_no,
                        exp_remark,
                        remark,
                    } = values;
                    if(!approver_id){
                        Toast.info('请选择审批人');
                        return
                    }
                    const obj = {
                        bgn_date:bgn_date?moment(bgn_date).format('YYYY-MM-DD'):'',
                        end_date: end_date?moment(end_date).format('YYYY-MM-DD'):'',
                        pri_country_code:pri_country_code?pri_country_code[0]:'',
                        pri_comp,
                        pri_position,
                        department,
                        pri_contact_person,
                        pri_contact_no,
                        exp_remark,
                        approver_id: approver_id?approver_id[0]:'',
                        remark,
                        is_save: ifSave,
                    }
                    const {type} = this.props.navigation.state.params;
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }
                    //判断是保存还是修改
                    if(type == 'edit'){
                        //修改
                        const {experience_tbl_approve_id, experience_tbl_id} = selectExp;
                        await this.props.User.editWorkExp(merged(obj, {experience_tbl_approve_id, experience_tbl_id}), successFn);

                    }else{
                        //保存或者提交
                        await this.props.User.addWorkExp(obj, successFn);
                    }
                }
                else {
                    if (err.bgn_date) {
                        Toast.info('请选择开始时间');
                    }
                    else if (err.pri_comp) {
                        Toast.info('请填写公司名称');
                    }
                    else if (err.pri_position) {
                        Toast.info('请填写单位');
                    }
                }

            });
        }

    }
    componentWillMount() {
        let { True, navigation } = this.props;
        True.selectTask = {function:'PP',function_dtl:'EX'};
        //请求工作经历关系列表
        this.props.Common.getRelationShip();
        //获取单条工作经历详情
        const {type} = this.props.navigation.state.params;

        if(type == 'edit'){
            const {selectExp} = this.props.User;
            const {experience_tbl_id, experience_tbl_approve_id} = selectExp;
            this.props.User.getSimpleWorkInfo({experience_tbl_id, experience_tbl_approve_id});
        }
    }
    render() {
        const {type} = this.props.navigation.state.params;

        const { getFieldProps } = this.props.form;
        const {countryList} = this.props.Common;
        const {approverList, selectExp} = this.props.User;
        let bgn_date,
            end_date,
            pri_country_code,
            pri_comp,
            pri_position,
            department,
            pri_contact_person,
            pri_contact_no,
            remark,
            exp_remark,
            status = '';

        if(selectExp && type == 'edit'){
            bgn_date = selectExp.bgn_date;
            end_date = selectExp.end_date;
            pri_country_code = selectExp.pri_country_code;
            pri_comp = selectExp.pri_comp;
            pri_position = selectExp.pri_position;
            department = selectExp.department;
            pri_contact_person = selectExp.pri_contact_person;
            pri_contact_no = selectExp.pri_contact_no;
            exp_remark = selectExp.exp_remark;
            remark = selectExp.remark;
            status = selectExp.status;
        }
        return (
            <View style={{overflow: 'scroll', height:'100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <NoticeBarMessage status={status}/>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'bgn_date',
                                        {
                                            initialValue: bgn_date?moment(parseInt(bgn_date)):'',
                                            rules: [{required: true}],

                                        }
                                    )
                                }
                                minDate={moment('1900-01-01')}

                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="开始日期:"/></List.Item>
                    </DatePicker>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'end_date',
                                        {
                                            initialValue: end_date?moment(parseInt(end_date)):'',
                                        }
                                    )
                                }
                                minDate={moment('1900-01-01')}

                    >
                        <List.Item arrow="horizontal"><RequireData require={false} text="结束日期:"/></List.Item>
                    </DatePicker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'pri_comp',
                                {
                                    initialValue: pri_comp?pri_comp:'',
                                    rules: [{required: true}],
                                }
                            )
                        }
                    ><RequireData require={true} text="公司名称:"/></InputItem>
                    <Picker data={countryList} cols={1}
                            {
                                ...getFieldProps(
                                    'pri_country_code',
                                    {
                                        initialValue: pri_country_code?[pri_country_code]:['CHN'],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><RequireData require={false} text="所在地区:"/></List.Item>
                    </Picker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'pri_position',
                                {
                                    initialValue: pri_position?pri_position:'',
                                    rules: [{required: true}],
                                }
                            )
                        }
                    ><RequireData require={true} text="单位:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'department',
                                {
                                    initialValue: department?department:'',
                                }
                            )
                        }
                    ><RequireData require={false} text="部门:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'pri_contact_person',
                                {
                                    initialValue: pri_contact_person?pri_contact_person:'',
                                }
                            )
                        }
                    ><RequireData require={false} text="联系人:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'pri_contact_no',
                                {
                                    initialValue: pri_contact_no?pri_contact_no:'',
                                }
                            )
                        }
                    ><RequireData require={false} text="联系人电话:"/></InputItem>
                    <List renderHeader={() => '工作经历描述'}>
                        <TextareaItem
                            {
                                ...getFieldProps('exp_remark', {
                                    initialValue: exp_remark?exp_remark:'',
                                })
                            }
                            rows={5}
                            count={100}
                        />
                    </List>
                    <ApprovingButton/>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: remark?remark:'',
                            })
                        }
                        placeholder="备注"
                        rows={5}
                        count={100}
                    />
                </ScrollView>
                {
                    status != 'P' && status != 'N'?
                        <View style={{backgroundColor: '#fff'}}>
                            <WhiteSpace size="sm"/>
                            <Flex>
                                <Flex.Item>
                                    <WingBlank>
                                        <Button type="primary" onClick={this.onSubmit.bind(this, 1)}>保存</Button>
                                    </WingBlank>
                                </Flex.Item>
                                <Flex.Item>
                                    <WingBlank>
                                        <Button type="primary" onClick={this.onSubmit.bind(this, 0)}>提交</Button>
                                    </WingBlank>
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace size="sm"/>
                        </View>:
                        null
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    brief: {
        fontSize: 14
    }
})

export default createForm()(Index);