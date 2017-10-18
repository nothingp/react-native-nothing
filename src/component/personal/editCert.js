/**
 * 添加修改证书信息
 */

import React, { Component } from 'react';
import moment from 'moment';
import {merged} from '../../common/Tool';

import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';

import { Flex, WingBlank, WhiteSpace, Toast,Icon,Button,List,ActionSheet,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
//import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';

@inject('User', 'Common')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
        //提交证书信息
        this.onSubmit = async (ifSave) => {
            //
            const { form} = this.props;
            const {selectExp} = this.props.User;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        from_year,
                        to_year,
                        country_code,
                        edu_type,
                        institude_name,
                        course,
                        comment,
                        approver_id,
                        remark,
                    } = values;
                    const obj = {
                        from_year:from_year?moment(from_year).format('YYYY-MM-DD'):'',
                        to_year: to_year?moment(to_year).format('YYYY-MM-DD'):'',
                        country_code:country_code?country_code[0]:'',
                        edu_type,
                        institude_name,
                        course,
                        comment,
                        approver_id: approver_id?approver_id[0]:'',
                        remark,
                        is_save: ifSave,
                    }
                    //判断是保存还是修改
                    if(selectExp){
                        //修改
                        const {experience_tbl_approve_id, experience_tbl_id} = selectExp;
                        await this.props.User.editWorkExp(merged(obj, {experience_tbl_approve_id, experience_tbl_id}));

                    }else{
                        //保存或者提交
                        await this.props.User.addWorkExp(obj);
                    }
                }
                else {
                    if (err.from_year) {
                        Toast.info('请选择开始时间');
                    }
                    else if (err.edu_type) {
                        Toast.info('请填写公司名称');
                    }
                    else if (err.institude_name) {
                        Toast.info('请填写在职单位');
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
        //获取证书类型
        //根据ID获取详细的教育信息 教育经历

    }
    render() {
        const { getFieldProps } = this.props.form;
        const {countryList} = this.props.Common;
        const {approverList, selectExp} = this.props.User;
        let from_year,
            to_year,
            country_code,
            edu_type,
            institude_name,
            course,
            comment,
            imgInfo,
            remark;
        if(selectExp){
            from_year = selectExp.from_year;
            to_year = selectExp.to_year;
            country_code = selectExp.country_code;
            edu_type = selectExp.edu_type;
            institude_name = selectExp.institude_name;
            course = selectExp.course;
            comment = selectExp.comment;
            remark = selectExp.remark;
            imgInfo = selectExp.cert_filename;
        }
        const options = {
            title: 'Select Avatar'
        };
        return (
            <ScrollView>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'from_year',
                                    {
                                        initialValue: from_year?moment(parseInt(from_year)):'',
                                        rules: [{required: true}],

                                    }
                                )
                            }
                >
                    <List.Item arrow="horizontal">开始时间：</List.Item>
                </DatePicker>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'to_year',
                                    {
                                        initialValue: to_year?moment(parseInt(to_year)):'',
                                    }
                                )
                            }
                >
                    <List.Item arrow="horizontal">结束时间：</List.Item>
                </DatePicker>
                <InputItem
                    {
                        ...getFieldProps(
                            'edu_type',
                            {
                                initialValue: edu_type?edu_type:'',
                                rules: [{required: true}],
                            }
                        )
                    }
                >教育类型：</InputItem>
                <Picker data={countryList} cols={1}
                        {
                            ...getFieldProps(
                                'country_code',
                                {
                                    initialValue: country_code?[country_code]:[],

                                }
                            )
                        }
                >
                    <List.Item arrow="horizontal">所在地区：</List.Item>
                </Picker>
                <InputItem
                    {
                        ...getFieldProps(
                            'institude_name',
                            {
                                initialValue: institude_name?institude_name:'',
                                rules: [{required: true}],
                            }
                        )
                    }
                >学校/机构名称：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'course',
                            {
                                initialValue: course?course:'',
                            }
                        )
                    }
                >所学专业：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'comment',
                            {
                                initialValue: comment?comment:'',
                            }
                        )
                    }
                >教育成就：</InputItem>
                <List renderHeader={() => '附件'}>
                    <TouchableOpacity onPress={() => {
                        const BUTTONS = ['相册', '拍照', '取消'];
                        ActionSheet.showActionSheetWithOptions({
                            options: BUTTONS,
                            cancelButtonIndex: BUTTONS.length - 1
                        },(buttonIndex) => {
                            if(buttonIndex==0){
                                ImagePicker.launchImageLibrary(options, (response)  => {
                                    // this.props.User.updateUserPhoto(response);
                                    this.setState({
                                        imgInfo: response
                                    })
                                });
                            }else if(buttonIndex==1){
                                ImagePicker.launchCamera(options, (response)  => {
                                    // this.props.User.updateUserPhoto(response);
                                    this.setState({
                                        imgInfo: response
                                    })
                                });
                            }

                        });
                    }}>
                        {
                            imgInfo?
                                <Image style={styles.image} source={{uri: imgInfo.uri}}/>:
                                <View style={styles.image}>
                                    <Icon type={'\ue910'} style={{fontSize: 50}}/>
                                </View>

                        }
                    </TouchableOpacity>
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
                            <Button type="primary" onClick={this.onSubmit.bind(this, 1)}>保存</Button>
                        </WingBlank>
                    </Flex.Item>
                    <Flex.Item>
                        <WingBlank>
                            <Button type="primary" onClick={this.onSubmit.bind(this, 0)}>提交</Button>
                        </WingBlank>
                    </Flex.Item>
                </Flex>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default createForm()(Index);