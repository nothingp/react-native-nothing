/**
 * 编辑个人信息页面
 */

import React, { Component } from 'react';
import moment from 'moment';
import {
    Text,
    StyleSheet,
    PixelRatio,
    ScrollView,
    View,
} from 'react-native';

import { Flex, WhiteSpace, Toast, WingBlank, Button,List,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import {RequireData} from './common/index';
import ApprovingButton from './approvingButton';
import { showAlert } from '../../component/showAlert';

@inject('User', 'Common','True')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:'编辑基本信息',
    });

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
            dob: dob?new Date(dob):'',
            prc_np_province_code:prc_np_province_code?prc_np_province_code:'',
            prc_np_city_code,
            prc_nationality_code,
            prc_political_status,
            prc_education,
            prc_grade_gettime: prc_grade_gettime?new Date(parseInt(prc_grade_gettime)):'',
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
            const { form ,True} = this.props;
            const {selectTask, selectApprover} = True;
            form.validateFields(async (err, values) => {
                const approver_id=selectApprover.value;
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
                        remark
                    } = values;
                    //将对应的时间进行格式化
                    //对数组进行判断是否为空
                    if(sex.length == 0){
                        Toast.info('请选择性别');
                        return
                    }
                    if(district.length == 0 || district[0] == ''){
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
                        Toast.info('请选择最高学历');
                        return
                    }
                    if(marital_status.length == 0){
                        Toast.info('请选择婚姻状况');
                        return
                    }
                    if(!approver_id){
                        Toast.info('请选择审批人');
                        return
                    }
                    //对手机号码进行正则匹配
                    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile_no))){
                        Toast.info('请填写正确的手机号码');
                        return
                    }
                    //对QQ号进行正则匹配
                    if(prc_qq && prc_qq.replace(/\s+/g,"") != '' && !(/^[1-9]\d{4,12}$/.test(prc_qq))){
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
                        approver_id
                    }
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }
                    showAlert({
                        title: '提交',
                        massage: '您确定修改个人信息吗？',
                        okFn: () => {
                            this.props.User.saveSelfInfo(obj, successFn);
                        },
                    })
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
                    else if (err.district) {
                        Toast.info('请选择籍贯');
                    }
                    else if (err.prc_nationality_code) {
                        Toast.info('请选择民族');
                    }
                    else if (err.prc_political_status) {
                        Toast.info('请选择政治面貌');
                    }
                    else if (err.marital_status) {
                        Toast.info('请选择婚姻状况');
                    }
                    else if (err.prc_major) {
                        Toast.info('请填写专业名称');
                    }
                    else if (err.prc_education) {
                        Toast.info('请选择最高学历');
                    }
                    else if (err.prc_grade_gettime) {
                        Toast.info('请选择毕业时间');
                    }
                    else if (err.comp_email) {
                        Toast.info('请填写正确的公司邮箱');
                    }
                    else if (err.pers_email) {
                        Toast.info('请填写正确的个人邮箱');
                    }
                    else if (err.mobile_no) {
                        Toast.info('请填写手机号码');
                    }
                }

            });
        }
    }
    componentWillMount() {
        let { True, navigation } = this.props;
        True.selectTask = {function:'PP',function_dtl:'PD'};
        // //请求审核人列表
        // this.props.User.getApprover();
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
            <View style={{overflow: 'scroll', height:'100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
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

                        ><RequireData require={true} text="昵称:"/></InputItem>
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
                            <List.Item arrow="horizontal" ><RequireData require={true} text="性别:"/></List.Item>
                        </Picker>
                        <Picker data={nationalityList} cols={1}
                                {
                                    ...getFieldProps(
                                        'prc_nationality_code',
                                        {
                                            initialValue: prc_nationality_code?[prc_nationality_code]:[],
                                            rules: [{required: true}],

                                        }
                                    )
                                }
                        >
                            <List.Item arrow="horizontal"><RequireData require={true} text="民族:"/></List.Item>
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
                            <List.Item arrow="horizontal"><RequireData require={true} text="生日:"/></List.Item>
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
                            cols={2}
                            data={districtList}
                        >
                            <List.Item arrow="horizontal"><RequireData require={true} text="籍贯:"/></List.Item>

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
                            <List.Item arrow="horizontal"><RequireData require={true} text="政治面貌:"/></List.Item>
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
                            <List.Item arrow="horizontal"><RequireData require={true} text="婚姻状况:"/></List.Item>
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
                            <List.Item arrow="horizontal"><RequireData require={true} text="最高学历:"/></List.Item>
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
                        ><RequireData require={true} text="专业名称:"/></InputItem>
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
                            <List.Item arrow="horizontal"><RequireData require={true} text="毕业时间:"/></List.Item>
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
                        ><RequireData require={true} text="公司邮箱:"/></InputItem>
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
                        ><RequireData require={true} text="手机号码:"/></InputItem>
                        <InputItem
                            {
                                ...getFieldProps(
                                    'home_no',
                                    {
                                        initialValue: home_no,

                                    }
                                )
                            }
                        ><RequireData text="家庭电话:"/></InputItem>
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
                        ><RequireData text="个人邮箱:"/></InputItem>
                        <InputItem
                            {
                                ...getFieldProps(
                                    'office_no',
                                    {
                                        initialValue: office_no
                                    }
                                )
                            }
                        ><RequireData text="办公号码:"/></InputItem>
                        <ApprovingButton/>
                        <TextareaItem
                            {
                                ...getFieldProps('remark', {
                                    initialValue: remark,
                                })
                            }
                            placeholder="备注"
                            rows={5}
                            count={100}
                        />
                    </List>
                </ScrollView>
                <View style={{backgroundColor: '#fff'}}>
                    <WhiteSpace size="sm"/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </WingBlank>
                    <WhiteSpace size="sm"/>
                </View>

            </View>
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