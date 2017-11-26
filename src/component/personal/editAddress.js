/**
 * 编辑地址页面
 */

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    ScrollView,
    View
} from 'react-native';

import { WingBlank, WhiteSpace, Toast, Button, List, Picker, TextareaItem, InputItem } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { RequireData } from './common/index';
import ApprovingButton from './approvingButton';
import ShowConfirm from '../../component/ShowConfirm';

@inject('User', 'Common','True')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '编辑地址信息',
    });

    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
        this.onSubmit = () => {
            const { form,True } = this.props;
            const {selectTask, selectApprover} = True;
            form.validateFields(async (err, values) => {
                const approver_id=selectApprover.value;
                if (!err) {
                    //将对应的时间进行格式化
                    //邮编正则校验

                    const {
                        regDistrict,
                        domicileAddress,
                        conDistrict,
                        relationAddress,
                        remark,
                        post_code
                    } = values;
                    const reg = /^[1-9][0-9]{5}$/;

                    if (regDistrict.length == 0) {
                        Toast.info('请选择户籍地');
                        return
                    }
                    if (conDistrict.length == 0) {
                        Toast.info('请选择详细地址');
                        return
                    }
                    if (!approver_id) {
                        Toast.info('请选择审批人');
                        return
                    }
                    if (post_code != '' && !reg.test(post_code)) {
                        Toast.info('请填写正确的邮政编码');
                        return
                    }
                    const obj = {
                        post_code,
                        reg_province_code: regDistrict[0],
                        reg_city_code: regDistrict[1],
                        reg_city_district_code: regDistrict[2],
                        reg_address: domicileAddress,
                        con_province_code: conDistrict[0],
                        con_city_code: conDistrict[1],
                        con_city_district_code: conDistrict[2],
                        con_address: relationAddress,
                        remark,
                        approver_id
                    }
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }

                    this.refs.confirm.show(
                        {
                            title: '提交',
                            massage: '您确定修改个人地址信息吗?',
                            okFn: () => {
                                this.props.User.saveSelfAddress(obj, successFn);
                            },
                        }
                    );
                }
                else {
                    if (err.regDistrict) {
                        Toast.info('请选择户籍地');
                    }
                    else if (err.conDistrict) {
                        Toast.info('请选择联系地址');
                    }
                }

            });
        }

    }

    componentWillMount() {
        let { True, navigation } = this.props;
        True.selectTask = {function:'PP',function_dtl:'AD'};
        //请求审核人列表
        //this.props.User.getApprover();
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { addressList } = this.props.Common;
        const { approverList } = this.props.User;


        let regProvinceCode = '',
            regCityCode = '',
            regCityDistrictCode = '',
            conProvinceCode = '',
            conCityCode = '',
            conCityDistrictCode = '',
            postCode = '',
            domicileAddress = '', //详细地址
            relationAddress = '', //详细联系地址
            remarks = ''; //备注信息

        if (this.props.User.addressInfo) {
            const { reg_province_code, reg_city_code, reg_city_district_code, reg_address, con_province_code, con_city_code, con_city_district_code, con_address, remark, post_code } = this.props.User.addressInfo;
            regProvinceCode = reg_province_code;
            regCityCode = reg_city_code;
            regCityDistrictCode = reg_city_district_code;

            conProvinceCode = con_province_code;
            conCityCode = con_city_code;
            conCityDistrictCode = con_city_district_code;

            postCode = post_code;
            remarks = remark;
            domicileAddress = reg_address;
            relationAddress = con_address;
        }
        return (
            <View style={{overflow: 'scroll'}}>
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={{height: 40, backgroundColor: '#F4F4F9'}}>
                        <Text style={{lineHeight: 40, marginLeft: 10}}>户籍地</Text>
                    </View>
                    <Picker
                        extra="请选择"
                        {
                            ...getFieldProps(
                                'regDistrict',
                                {
                                    initialValue: regProvinceCode?[regProvinceCode, regCityCode, regCityDistrictCode]:[],
                                    rules: [{ required: true }],
                                }
                            )
                        }
                        data={addressList}
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="省市区:"/></List.Item>

                    </Picker>
                    <View style={{height: 40}}>
                        <Text style={{lineHeight: 40, marginLeft: 10}}>详细地址：</Text>
                    </View>
                    <TextareaItem
                        {
                            ...getFieldProps(
                                'domicileAddress',
                                {
                                    initialValue: domicileAddress,
                                }
                            )
                        }
                        rows={5}
                        count={100}
                    />
                    <InputItem
                        {
                            ...getFieldProps(
                                'post_code',
                                {
                                    initialValue: postCode,
                                }
                            )
                        }
                    ><RequireData text="邮编:"/></InputItem>
                    <View style={{height: 40, backgroundColor: '#F4F4F9'}}>
                        <Text style={{lineHeight: 40, marginLeft: 10}}>联系地址</Text>
                    </View>
                    <Picker
                        extra="请选择"
                        {
                            ...getFieldProps(
                                'conDistrict',
                                {
                                    initialValue: conProvinceCode?[conProvinceCode, conCityCode, conCityDistrictCode]:[],
                                    rules: [{ required: true }],
                                }
                            )
                        }
                        data={addressList}
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="省市区:"/></List.Item>
                    </Picker>
                    <View style={{height: 40}}>
                        <Text style={{lineHeight: 40, marginLeft: 10}}>详细地址：</Text>
                    </View>
                    <TextareaItem
                        {
                            ...getFieldProps(
                                'relationAddress',
                                {
                                    initialValue: relationAddress,
                                }
                            )
                        }
                        rows={5}
                        count={100}
                    />
                    <ApprovingButton/>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: remarks,
                            })
                        }
                        placeholder="备注"
                        rows={5}
                        count={100}
                    />
                </ScrollView>
                <View style={{backgroundColor: '#fff'}}>
                    <WhiteSpace size="sm"/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </WingBlank>
                    <WhiteSpace size="sm"/>
                </View>

                <ShowConfirm ref="confirm"/>

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