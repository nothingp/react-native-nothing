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
import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'

//引入第三方库
import { format } from '../../common/Tool';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        const { personaldataDetailData } = props.True;
        console.log('personaldataDetailData', personaldataDetailData);
        let {
            prc_former_name,
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
            remark,
            message,
            is_last_approve,
            img
        } = personaldataDetailData || {};

        this.state = {
            pickerValue: [],
            prc_former_name,
            sex,
            dob: dob ? moment(dob) : '',
            prc_np_province_code,
            prc_np_city_code,
            prc_nationality_code,
            prc_political_status,
            prc_education,
            prc_grade_gettime: prc_grade_gettime ? moment(parseInt(prc_grade_gettime)) : '',
            mobile_no,
            office_no,
            prc_qq,
            home_no,
            comp_email,
            pers_email,
            prc_major,
            marital_status,
            remark,
            message,
            is_last_approve,
            img
        }
        this.onSubmit = () => {
            const { form, User } = this.props;

            form.validateFields(async (err, values) => {
                console.log('err', err, values);

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
                        prc_grade_gettime: moment(prc_grade_gettime).valueOf(),
                        comp_email,
                        pers_email,
                        marital_status: marital_status[0],
                        remark,
                        approver_id: approver_id[0]
                    }
                    await User.saveSelfInfo(obj);
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
                    else if (err.approver_id) {
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
        let { True, form } = this.props;
        const { getFieldProps } = form;
        const { personaldataDetailData } = True;
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
            message,
            is_last_approve,
            img
        } = this.state;
        const { approverList } = this.props.User;
        const { nationalityList, districtList, politicalList, maritalList, educationList, sexArr } = this.props.Common;
        return (
            <ScrollView>
                <List>
                    <List.Item
                        arrow="empty"
                        thumb={
                            img || <Icon type={'\ue6a8'}/>
                        }
                        multipleLine
                    >
                        <Text style={styles.title}>
                            {prc_former_name}
                        </Text>
                        <Brief style={styles.brief}>{message}</Brief>
                    </List.Item>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_former_name',
                                {
                                    initialValue: prc_former_name,
                                    rules: [{ required: true }],
                                }
                            )
                        }
                    >
                        别名：
                    </InputItem>
                    <Picker data={sexArr} cols={1}
                            {
                                ...getFieldProps(
                                    'sex',
                                    {
                                        initialValue: [sex],
                                        rules: [{ required: true }],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">性别：</List.Item>
                    </Picker>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'dob',
                                        {
                                            initialValue: dob,
                                            rules: [{ required: true }],

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
                                    rules: [{ required: true }],
                                }
                            )
                        }
                        data={districtList}
                    >
                        <List.Item arrow="horizontal">籍贯：</List.Item>
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
                    <Picker data={politicalList} cols={1}
                            {
                                ...getFieldProps(
                                    'prc_political_status',
                                    {
                                        initialValue: [prc_political_status],
                                        rules: [{ required: true }],
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">政治面貌：</List.Item>
                    </Picker>
                    {
                        is_last_approve != 1 &&
                        <Picker data={approverList} cols={1}
                                {
                                    ...getFieldProps(
                                        'approver_id',
                                        {
                                            initialValue: [approverList.length ? approverList[0].value : ''],
                                            rules: [{ required: true }],
                                        }
                                    )
                                }>
                            <List.Item arrow="horizontal">审批人：</List.Item>
                        </Picker>
                    }
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
                        <Flex justify="between">
                            {/*<Flex.Item>*/}
                            <Button style={styles.button} type="primary" onClick={this.agreeFn}>
                                同意
                            </Button>
                            {/*</Flex.Item>*/}
                            {/*<Flex.Item>*/}
                            <Button style={styles.button} onClick={this.cancelFn}>
                                不同意
                            </Button>
                            {/*</Flex.Item>*/}
                        </Flex>
                    </WingBlank>
                </List>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    infoList: {},
    listName: {
        width: 70,
    },
    listTitle: {
        fontSize: 18
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 2
    },
    list: {
        height: 15
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