/**
 * 查看地址页面
 */

import React, { Component } from 'react';
import moment from 'moment';
import {
    Text,
    StyleSheet,
    PixelRatio,
    ScrollView,
} from 'react-native';

import { WhiteSpace, Toast, WingBlank, Button,List,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
//import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'
import {RequireData} from './common/index';

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
                    //将对应的时间进行格式化
                    //对数组进行判断是否为空
                    if(sex.length == 0){
                        Toast.info('请选择性别');
                        return
                    }
                    if(district.length == 0){
                        Toast.info('请选择籍贯');
                        return
                    }
                    if(prc_nationality_code.length == 0){
                        Toast.info('请选择民族');
                        return
                    }
                    if(prc_political_status.length == 0){
                        Toast.info('请选择政治面貌');
                        return
                    }
                    if(prc_education.length == 0){
                        Toast.info('请选择学历');
                        return
                    }
                    if(marital_status.length == 0){
                        Toast.info('请选择婚姻情况');
                        return
                    }
                    if(approver_id.length == 0){
                        Toast.info('请选择审批人');
                        return
                    }
                    //对手机号码进行正则匹配
                    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile_no))){
                        Toast.info('请填写正确的手机号码');
                        return
                    }
                    //对QQ号进行正则匹配
                    if(prc_qq != '' && !(/^[1-9]d{5,8}$/.test(prc_qq))){
                        Toast.info('请填写正确的QQ号码');
                        return
                    }
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
                    else if(err.dob) {
                        Toast.info('请选择生日');
                    }
                    else if (err.prc_np_province_code || err.prc_np_city_code) {
                        Toast.info('请选择籍贯');
                    }
                    else if (err.prc_nationality_code) {
                        Toast.info('请选择民族');
                    }
                    else if (err.prc_political_status) {
                        Toast.info('请选择政治面貌');
                    }
                    else if (err.marital_status) {
                        Toast.info('请选择婚姻情况');
                    }
                    else if (err.prc_major) {
                        Toast.info('请填写专业名称');
                    }
                    else if (err.prc_education) {
                        Toast.info('请选择学历');
                    }
                    else if (err.prc_grade_gettime) {
                        Toast.info('请选择毕业时间');
                    }
                    else if (err.comp_email) {
                        Toast.info('请填写正确的公司Email');
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
                    ><Text style={styles.brief}><RequireData/>昵称:</Text></InputItem>
                    <Picker data={sexArr} cols={1}
                            {
                                ...getFieldProps(
                                    'sex',
                                    {
                                        initialValue: sex?[sex]:[],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal" ><Text style={styles.brief}><RequireData/>性别:</Text></List.Item>
                    </Picker>
                    <Picker data={nationalityList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_nationality_code',
                                    {
                                        initialValue: prc_nationality_code?[prc_nationality_code]:[]
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>民族:</Text></List.Item>
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
                                minDate={moment('1900-01-01')}
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>生日:</Text></List.Item>
                    </DatePicker>
                    <Picker
                        extra="选择地区"
                        {
                            ...getFieldProps(
                                'district',
                                {
                                    initialValue: prc_np_province_code?[prc_np_province_code, prc_np_city_code]:[],
                                    rules: [{required: true}],
                                }
                            )
                        }
                        data={districtList}
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>籍贯:</Text></List.Item>

                    </Picker>
                    <Picker data={politicalList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_political_status',
                                    {
                                        initialValue: prc_political_status?[prc_political_status]:[],
                                        rules: [{required: true}],
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>政治面貌:</Text></List.Item>
                    </Picker>
                    <Picker data={maritalList} cols={1}
                            {
                                ...getFieldProps(
                                    'marital_status',
                                    {
                                        initialValue: marital_status?[marital_status]:[],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>婚姻状况:</Text></List.Item>
                    </Picker>
                    <Picker data={educationList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_education',
                                    {
                                        initialValue: prc_education?[prc_education]:[],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>最高学历:</Text></List.Item>
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
                    ><Text style={styles.brief}><RequireData/>专业名称:</Text></InputItem>
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
                                minDate={moment('1900-01-01')}

                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>毕业时间:</Text></List.Item>
                    </DatePicker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'comp_email',
                                {
                                    initialValue: comp_email,
                                    rules: [{
                                        required: true,
                                        type: "email"
                                    }],

                                }
                            )
                        }
                    ><Text style={styles.brief}><RequireData/>公司邮箱:</Text></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'mobile_no',
                                {
                                    initialValue: mobile_no,
                                    rules: [{
                                        required: true,
                                    }],

                                }
                            )
                        }
                    ><Text style={styles.brief}><RequireData/>手机号码:</Text></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'home_no',
                                {
                                    initialValue: home_no,

                                }
                            )
                        }
                    ><Text style={styles.brief}>家庭电话:</Text></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_qq',
                                {
                                    initialValue: prc_qq
                                }
                            )
                        }
                    ><Text style={styles.brief}>QQ:</Text></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'pers_email',
                                {
                                    initialValue: pers_email,
                                    rules:[{
                                        type: "email"
                                    }]
                                }
                            )
                        }
                    ><Text style={styles.brief}>个人邮箱:</Text></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'office_no',
                                {
                                    initialValue: office_no
                                }
                            )
                        }
                    ><Text style={styles.brief}>办公号码:</Text></InputItem>
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
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>审批人:</Text></List.Item>
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
    brief: {
        fontSize: 14
    }
});

export default createForm()(Index);