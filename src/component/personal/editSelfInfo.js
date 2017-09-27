/**
 * 查看地址页面
 */

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

import { Flex, WhiteSpace, Toast, WingBlank, Icon,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'

//引入第三方库
import {format} from '../../common/Tool';

@navigator
@inject('User', 'Common')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        const {userDetail} = this.props.User;
        let {prc_former_name,
            sex,
            dob,
            prc_np_province_code,
            prc_np_city_code,
            prc_nationality_code,
            prc_political_status,
            mobile_no,
            office_no,
            prc_qq,
            home_no,
            prc_major,
            prc_education,
            prc_grade_gettime,
            comp_email,
            pers_email,
            marital_status,
            remark} = userDetail;
        this.state = {
            pickerValue: [],
            prc_former_name,
            sex,
            dob: dob?moment(dob):'',
            prc_np_province_code,
            prc_np_city_code,
            prc_nationality_code,
            prc_political_status,
            prc_education,
            prc_grade_gettime: prc_grade_gettime?moment(parseInt(prc_grade_gettime)):'',
            mobile_no,
            office_no,
            prc_qq,
            home_no,
            comp_email,
            pers_email,
            prc_major,
            marital_status,
            remark
        }
        this.onSubmit = () => {
            const { form, User } = this.props;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        prc_former_name,
                        sex,
                        dob,
                        district,
                        prc_nationality_code,
                        prc_political_status,
                        mobile_no,
                        office_no,
                        prc_qq,
                        home_no,
                        prc_major,
                        prc_education,
                        prc_grade_gettime,
                        comp_email,
                        pers_email,
                        marital_status,
                        remark,
                        approver_id
                    } = values;
                    const obj = {
                        prc_former_name,
                        sex: sex[0],
                        dob: moment(dob).format('YYYY-MM-DDThh:mm:ss'),
                        prc_np_province_code: district[0],
                        prc_np_city_code: district[1],
                        prc_nationality_code: prc_nationality_code[0],
                        prc_political_status: prc_political_status[0],
                        mobile_no,
                        office_no,
                        prc_qq,
                        home_no,
                        prc_major,
                        prc_education: prc_education[0],
                        prc_grade_gettime: moment(prc_grade_gettime).format("YYYY-MM-DD"),
                        comp_email,
                        pers_email,
                        marital_status: marital_status[0],
                        remark,
                        approver_id: approver_id[0]
                    }
                    const status = await User.saveSelfInfo(obj);
                    if(status){
                        Toast.success('保存个人信息成功，请等待审核！')
                        // this.props.navigator.push({
                        //     screen: 'SubmitSuc',
                        //     title: '基本信息'
                        // })
                    }
                    //保存成功跳转到
                }
                else {
                    if (err.prc_former_name) {
                        Toast.info('请输入昵称');
                    }
                    else if (err.sex) {
                        Toast.info('请选择性别');
                    }
                    else if (err.prc_np_province_code || err.prc_np_city_code) {
                        Toast.info('请选择籍贯');
                    }
                    else if (err.prc_nationality_code) {
                        Toast.info('请选择民族');
                    }
                    else if (err.prc_education) {
                        Toast.info('请选择学历');
                    }
                    else if (err.prc_grade_gettime) {
                        Toast.info('请选择毕业时间');
                    }
                    else if (err.comp_email) {
                        Toast.info('请填写公司Email');
                    }
                    else if (err.mobile_no) {
                        Toast.info('请填写手机号码');
                    }
                    else if(err.approver_id){
                        Toast.info('请选择审批人');
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
        const {
            prc_former_name,
            sex,
            dob,
            prc_np_province_code,
            prc_np_city_code,
            prc_nationality_code,
            prc_political_status,
            prc_education,
            prc_major,
            prc_grade_gettime,
            marital_status,
            mobile_no,
            office_no,
            prc_qq,
            comp_email,
            pers_email,
            remark,
            home_no
        } = this.state;
        const {approverList} = this.props.User;
        const {nationalityList, districtList, politicalList, maritalList, educationList, sexArr} = this.props.Common;
        return (
            <ScrollView>
                <List>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_former_name',
                                {
                                    initialValue: prc_former_name,
                                    rules: [{required: true}],
                                }
                            )
                        }
                    >昵称：</InputItem>
                    <Picker data={sexArr} cols={1}
                            {
                                ...getFieldProps(
                                    'sex',
                                    {
                                        initialValue: [sex],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">性别：</List.Item>
                    </Picker>
                    <Picker data={nationalityList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_nationality_code',
                                    {
                                        initialValue: [prc_nationality_code]
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">民族：</List.Item>
                    </Picker>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'dob',
                                        {
                                            initialValue: dob,
                                            rules: [{required: true}],

                                        }
                                    )
                                }
                    >
                        <List.Item arrow="horizontal">生日：</List.Item>
                    </DatePicker>
                    <Picker
                        extra="选择地区"
                        {
                            ...getFieldProps(
                                'district',
                                {
                                    initialValue: [prc_np_province_code, prc_np_city_code],
                                    rules: [{required: true}],
                                }
                            )
                        }
                        data={districtList}
                    >
                        <List.Item arrow="horizontal">籍贯：</List.Item>

                    </Picker>
                    <Picker data={politicalList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_political_status',
                                    {
                                        initialValue: [prc_political_status],
                                        rules: [{required: true}],
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">政治面貌：</List.Item>
                    </Picker>
                    <Picker data={maritalList} cols={1}
                            {
                                ...getFieldProps(
                                    'marital_status',
                                    {
                                        initialValue: [marital_status],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">婚姻状况：</List.Item>
                    </Picker>
                    <Picker data={educationList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_education',
                                    {
                                        initialValue: [prc_education],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">最高学历：</List.Item>
                    </Picker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_major',
                                {
                                    initialValue: prc_major,
                                    rules: [{required: true}],

                                }
                            )
                        }
                    >专业名称：</InputItem>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'prc_grade_gettime',
                                        {
                                            initialValue: prc_grade_gettime,
                                            rules: [{required: true}],

                                        }
                                    )
                                }
                    >
                        <List.Item arrow="horizontal">毕业时间：</List.Item>
                    </DatePicker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'comp_email',
                                {
                                    initialValue: comp_email,
                                    rules: [{required: true}],

                                }
                            )
                        }
                    >公司邮箱：</InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'mobile_no',
                                {
                                    initialValue: mobile_no,
                                    rules: [{required: true}],

                                }
                            )
                        }
                    >手机号码：</InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'home_no',
                                {
                                    initialValue: home_no,

                                }
                            )
                        }
                    >家庭电话：</InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_qq',
                                {
                                    initialValue: prc_qq
                                }
                            )
                        }
                    >QQ：</InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'pers_email',
                                {
                                    initialValue: pers_email
                                }
                            )
                        }
                    >个人邮箱：</InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'office_no',
                                {
                                    initialValue: office_no
                                }
                            )
                        }
                    >办公号码：</InputItem>
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
                                    initialValue: remark,
                                })
                            }
                            rows={5}
                            count={100}
                        />
                    </List>
                    <WhiteSpace size="xl"/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>保存</Button>
                    </WingBlank>
                </List>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    infoList: {
    },
    listName: {
        width: 70,
    },
    listTitle: {
        fontSize: 18
    },
    button: {
        borderColor: '#dddddd',
        borderStyle: 'solid',
        borderTopWidth: 1/PixelRatio.get(),
    },
    list: {
        height:15
    },
    radio: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        marginRight: 10,
        borderRadius: 10,
        fontSize: 10,
    },
});

export default createForm()(Index);