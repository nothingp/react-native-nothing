/**
 * 添加教育经历
 */

import React, { Component } from 'react';
import {merged, format} from '../../common/Tool';
import ShowConfirm from '../../component/ShowConfirm';
import ImgSelect from '../../component/ImgSelect';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import { Flex, WingBlank, WhiteSpace, Toast,Icon,Button,List,ActionSheet,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import ImagePicker from 'react-native-image-picker';
import {RequireData} from './common/index';
import TitleButton from './common/educationTitleButton';
import {NoticeBarMessage} from './common';
import ApprovingButton from './approvingButton';

@inject('User', 'Common','True')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const {type} = navigation.state.params;
        if(type && type == 'edit'){
            return {
                title:'编辑教育经历',
                headerRight: (
                    <TitleButton navigation={navigation}/>
                ),
            }
        }else{
            return {
                title:'添加教育经历',
            }
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            imgArr: [],
            changeFlag: false,
        }
        //提交教育经历信息
        this.onSubmit = async (ifSave) => {
            //
            const { form,True} = this.props;
            const {imgArr} = this.state;
            const {selectTask, selectApprover} = True;

            form.validateFields(async (err, values) => {
                const approver_id=selectApprover.value;
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
                        remark,
                    } = values;

                    if(country_code.length == 0){
                        Toast.info('请选择所在地区');
                        return
                    }
                    if(edu_type.length == 0){
                        Toast.info('请选择教育类型');
                        return
                    }
                    if(!approver_id){
                        Toast.info('请选择审批人');
                        return
                    }
                    const obj = {
                        from_year:from_year?format(new Date(from_year).getTime(), 'yyyy-MM-dd'):'',
                        to_year: to_year?format(new Date(to_year).getTime(), 'yyyy-MM-dd'):'',
                        country_code:country_code?country_code[0]:'',
                        edu_type: edu_type?edu_type[0]:'',
                        institude_name,
                        course,
                        comment,
                        approver_id,
                        remark,
                        is_save: ifSave,
                        imgArr
                    }

                    const {type} = this.props.navigation.state.params;
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }
                    //判断是保存还是修改
                    if(type == 'edit'){
                        //修改
                        const {selectEduItem} = this.props.User;
                        const {education_tbl_id, education_tbl_approve_id} = selectEduItem;

                        this.refs.confirm.show(
                            {
                                title: ifSave == '1'?'保存':'提交',
                                massage: ifSave == '1'?'您确定保存教育经历吗？':'您确定提交教育经历吗？',
                                okFn: () => {
                                    this.props.User.editEduExp(merged(obj, {education_tbl_id, education_tbl_approve_id}), successFn);
                                },
                            }
                        );

                    }else{
                        //保存或者提交

                        this.refs.confirm.show(
                            {
                                title: ifSave == '1'?'保存':'提交',
                                massage: ifSave == '1'?'您确定保存教育经历吗？':'您确定提交教育经历吗？',
                                okFn: () => {
                                    this.props.User.addEduExp(obj, successFn);
                                },
                            }
                        );
                    }
                }
                else {
                    if (err.edu_type) {
                        Toast.info('请选择教育类型');
                    }
                    else if (err.country_code) {
                        Toast.info('请选择所在地区');
                    }
                    else if(err.institude_name){
                        Toast.info('请填写学校/机构名称');
                    }
                    else if(err.course){
                        Toast.info('请填写所学专业');
                    }
                }

            });
        }

    }
    //选择图片
    onSelectImg = (imgArr) => {
        this.setState({
            imgArr,
            changeFlag: true, //更改数据
        })
    }
    componentWillMount() {
        let { True, navigation } = this.props;
        True.selectTask = {function:'PP',function_dtl:'ED'};
        //请求审核人列表
        // this.props.User.getApprover();
        //获取教育类型
        this.props.Common.getEducationTypeList();

        //根据ID获取详细的教育信息 教育经历
        const {type} = this.props.navigation.state.params;

        if(type == 'edit'){
            this.props.User.getSimpleEduInfo();
        }
    }
    render() {
        const {type} = this.props.navigation.state.params;

        const { getFieldProps } = this.props.form;
        const {countryList, educationType} = this.props.Common;
        const {selectEduItem} = this.props.User;
        let {from_year,
            to_year,
            country_code,
            edu_type,
            institude_name,
            course,
            comment,
            cert_filename,
            remark,
            status} = selectEduItem && type == 'edit' ? selectEduItem:{};
        let {imgArr, changeFlag} = this.state;
        if(!imgArr.length && !changeFlag) {
            //保存图片数组处理初始化的时候，异步请求数据回来，图片url不更新
            const doctorArr = cert_filename?cert_filename.split(','):[];
            doctorArr && doctorArr.map(info => {
                if(info != ''){
                    imgArr.push({
                        uri: info,
                    })
                }
            })
            this.state.imgArr = imgArr;
        }

        return (
            <View style={{overflow: 'scroll', height:'100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <NoticeBarMessage status={status}/>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'from_year',
                                        {
                                            initialValue: from_year?new Date(from_year):'',

                                        }
                                    )
                                }
                                minDate={new Date(1900, 1, 1)}
                    >
                        <List.Item arrow="horizontal"><RequireData require={false} text="开始时间:"/></List.Item>
                    </DatePicker>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'to_year',
                                        {
                                            initialValue: to_year?new Date(to_year):'',
                                        }
                                    )
                                }
                                minDate={new Date(1900, 1, 1)}

                    >
                        <List.Item arrow="horizontal"><RequireData require={false} text="结束时间:"/></List.Item>
                    </DatePicker>
                    <Picker data={educationType} cols={1}
                            {
                                ...getFieldProps(
                                    'edu_type',
                                    {
                                        initialValue: edu_type?[edu_type]:[],
                                        rules: [{required: true}],
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="教育类型:"/></List.Item>
                    </Picker>
                    <Picker data={countryList} cols={1}
                            {
                                ...getFieldProps(
                                    'country_code',
                                    {
                                        initialValue: country_code?[country_code]:[],
                                        rules: [{required: true}],

                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="所在地区:"/></List.Item>
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
                    ><RequireData require={true} text="学校/机构名称:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'course',
                                {
                                    initialValue: course?course:'',
                                    rules: [{required: true}],
                                }
                            )
                        }
                    ><RequireData require={true} text="所学专业:"/></InputItem>
                    <InputItem
                        {
                            ...getFieldProps(
                                'comment',
                                {
                                    initialValue: comment?comment:'',
                                }
                            )
                        }
                    ><RequireData require={false} text="教育成就:"/></InputItem>
                    <ImgSelect imgArr={imgArr} onSelect={this.onSelectImg}/>

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

                <ShowConfirm ref="confirm"/>

            </View>
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
    text: {
        fontSize: 50,
        lineHeight: 80,
        marginLeft: 10
    },
    brief: {
        fontSize: 14
    }
});

export default createForm()(Index);