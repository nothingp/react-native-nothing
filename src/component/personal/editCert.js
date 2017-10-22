/**
 * 添加编辑证书
 */

import React, { Component } from 'react';
import moment from 'moment';
import {merged} from '../../common/Tool';

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
import TitleButton from './common/certTitleButton';
import {NoticeBarMessage} from './common';

@inject('User', 'Common')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const {type} = navigation.state.params;
        if(type && type == 'edit'){
            return {
                title:'编辑证书',
                headerRight: (
                    <TitleButton navigation={navigation}/>
                ),
            }
        }else{
            return {
                title:'添加证书',
            }
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            imgInfo: '', //附件图片信息
        }
        //提交证书信息
        this.onSubmit = async (ifSave) => {
            //
            const { form} = this.props;
            const {selectCertItem} = this.props.User;
            const {imgInfo} = this.state;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        cert_code,
                        license_cert_no,
                        valid_date,
                        expiry_date,
                        attach_path,
                        cert_remark,
                        approver_id,
                        remark,
                    } = values;
                    if(cert_code.length == 0){
                        Toast.info('请选择证书类型');
                        return
                    }
                    if(valid_date.length == 0){
                        Toast.info('请选择生效日期');
                        return
                    }
                    if(approver_id.length == 0){
                        Toast.info('请选择审批人');
                        return
                    }
                    const obj = {
                        cert_code: cert_code?cert_code[0]:'',
                        license_cert_no,
                        valid_date:valid_date?moment(valid_date).format('YYYY-MM-DD'):'',
                        expiry_date: expiry_date?moment(expiry_date).format('YYYY-MM-DD'):'',
                        attach_path,
                        cert_remark,
                        approver_id: approver_id?approver_id[0]:'',
                        remark,
                        is_save: ifSave,
                        imgInfo
                    }

                    const {type} = this.props.navigation.state.params;
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }
                    //判断是保存还是修改
                    if(type == 'edit'){
                        //修改
                        const {license_cert_tbl_id, license_cert_tbl_approve_id} = selectCertItem;
                        await this.props.User.editCertExp(merged(obj, {license_cert_tbl_id, license_cert_tbl_approve_id}), successFn);

                    }else{
                        //保存或者提交
                        await this.props.User.addCertExp(obj, successFn);
                    }
                }
                else {
                    if (err.cert_code) {
                        Toast.info('请选择证书类型');
                    }
                    else if (err.valid_date) {
                        Toast.info('请选择生效日期');
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
        this.props.Common.getCertTypeList();

        //根据ID获取详细的教育信息 教育经历
        const {type} = this.props.navigation.state.params;

        if(type == 'edit'){
            this.props.User.getSimpleCertInfo();
        }
    }
    render() {
        const {type} = this.props.navigation.state.params;

        const { getFieldProps } = this.props.form;
        const {certTypeList} = this.props.Common;
        const {imgInfo} = this.state;

        const {approverList, selectCertItem} = this.props.User;
        let valid_date,
            expiry_date,
            cert_code,
            license_cert_no,
            cert_remark,
            attach_path,
            remark,
            status = '';
        if(selectCertItem && type == 'edit'){
            valid_date = selectCertItem.valid_date;
            expiry_date = selectCertItem.expiry_date;
            cert_code = selectCertItem.cert_code;
            license_cert_no = selectCertItem.license_cert_no;
            cert_remark = selectCertItem.cert_remark;
            remark = selectCertItem.remark;
            attach_path = selectCertItem.attach_path;
            status = selectCertItem.status;

        }
        console.log(moment(parseInt(valid_date)));

        const options = {
            title: 'Select Avatar'
        };
        return (
            <View style={{overflow: 'scroll', height:'100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <NoticeBarMessage status={status}/>
                    <Picker data={certTypeList} cols={1}
                            {
                                ...getFieldProps(
                                    'cert_code',
                                    {
                                        initialValue: cert_code?[cert_code]:[],
                                        rules: [{required: true}],
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>证书类型:</Text></List.Item>
                    </Picker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'license_cert_no',
                                {
                                    initialValue: license_cert_no?license_cert_no:'',
                                }
                            )
                        }
                    ><Text style={styles.brief}>证书编号:</Text></InputItem>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'valid_date',
                                        {
                                            initialValue: valid_date?moment(parseInt(valid_date)):'',
                                            rules: [{required: true}],
                                        }
                                    )
                                }
                                minDate={moment('1900-01-01')}

                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>生效日期:</Text></List.Item>
                    </DatePicker>
                    <DatePicker mode="date"
                                {
                                    ...getFieldProps(
                                        'expiry_date',
                                        {
                                            initialValue: expiry_date?moment(parseInt(expiry_date)):'',
                                        }
                                    )
                                }
                                minDate={moment('1900-01-01')}

                    >
                        <List.Item arrow="horizontal"><Text style={styles.brief}>过期日期:</Text></List.Item>
                    </DatePicker>
                    <List renderHeader={() => '备注'}>
                        <TextareaItem
                            {
                                ...getFieldProps('cert_remark', {
                                    initialValue: cert_remark?cert_remark:'',
                                })
                            }
                            rows={5}
                            count={100}
                        />
                    </List>
                    <List renderHeader={() => '附件'}>
                        <TouchableOpacity onPress={() => {
                            const BUTTONS = ['相册', '拍照', '取消'];
                            ActionSheet.showActionSheetWithOptions({
                                options: BUTTONS,
                                cancelButtonIndex: BUTTONS.length - 1
                            },(buttonIndex) => {
                                if(buttonIndex==0){
                                    ImagePicker.launchImageLibrary(options, (response)  => {
                                        this.setState({
                                            imgInfo: response
                                        })
                                    });
                                }else if(buttonIndex==1){
                                    ImagePicker.launchCamera(options, (response)  => {
                                        this.setState({
                                            imgInfo: response
                                        })
                                    });
                                }

                            });
                        }}>
                            {
                                imgInfo || attach_path?
                                    <Image style={styles.image} source={{uri: imgInfo.uri ? imgInfo.uri:attach_path}}/>:
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
                        <List.Item arrow="horizontal"><RequireData/>审批人:</List.Item>
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
    image: {
        width: 100,
        height: 100,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    brief: {
        fontSize: 14
    }
});

export default createForm()(Index);