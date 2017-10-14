/**
 * 查看地址页面
 */

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import {WingBlank, WhiteSpace, Toast,Button,List,Picker,TextareaItem, InputItem} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';
import {RequireData} from './common/index';

@inject('User', 'Common')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
        this.onSubmit = () => {
            const { form, User } = this.props;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    //邮编正则校验

                    const {
                        regDistrict,
                        domicileAddress,
                        conDistrict,
                        relationAddress,
                        remark,
                        approver_id,
                        post_code
                    } = values;
                    const reg = /^[1-9][0-9]{5}$/;

                    if(regDistrict.length == 0){
                        Toast.info('请选择户籍地');
                        return
                    }
                    if(conDistrict.length == 0){
                        Toast.info('请选择详细地址');
                        return
                    }
                    if(approver_id.length == 0){
                        Toast.info('请选择审批人');
                        return
                    }
                    if(post_code != '' && !reg.test(post_code)){
                        Toast.info('请填写正确的邮政编码');
                        return
                    }
                    const obj = {
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
                    await User.saveSelfAddress(obj);
                }
                else {
                    if (err.regDistrict) {
                        Toast.info('请选择户籍地');
                    }
                    else if (err.conDistrict) {
                        Toast.info('请选择联系地址');
                    }
                    else if (err.approver_id) {
                        Toast.info('请填写审批人信息');
                    }
                }

            });
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();

        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {addressList} = this.props.Common;
        const {approverList} = this.props.User;


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

        if(this.props.User.addressInfo){
            const {reg_province_code, reg_city_code, reg_city_district_code, reg_address, con_province_code, con_city_code, con_city_district_code,con_address, remark, post_code} = this.props.User.addressInfo;
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
            <ScrollView>
                <Picker
                    extra="请选择"
                    {
                        ...getFieldProps(
                            'regDistrict',
                            {
                                initialValue: [regProvinceCode, regCityCode, regCityDistrictCode],
                                rules: [{required: true}],
                            }
                        )
                    }
                    data={addressList}
                >
                    <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>户籍地:</Text></List.Item>

                </Picker>
                <List renderHeader={() => '户籍地详细地址'}>
                    <TextareaItem
                        {
                            ...getFieldProps(
                                'domicileAddress',
                                {
                                    initialValue: domicileAddress,
                                    rules: [{required: true}],
                                }
                            )
                        }
                        rows={5}
                        count={100}
                    />
                </List>
                <InputItem
                    {
                        ...getFieldProps(
                            'post_code',
                            {
                                initialValue: postCode,
                                rules: [{required: true}],
                            }
                        )
                    }
                ><Text style={styles.brief}>邮编:</Text></InputItem>
                <Picker
                    extra="请选择"
                    {
                        ...getFieldProps(
                            'conDistrict',
                            {
                                initialValue: [conProvinceCode, conCityCode, conCityDistrictCode],
                                rules: [{required: true}],
                            }
                        )
                    }
                    data={addressList}
                >
                    <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>联系地址:</Text></List.Item>
                </Picker>
                <List renderHeader={() => '联系详细地址'}>
                    <TextareaItem
                        {
                            ...getFieldProps(
                                'relationAddress',
                                {
                                    initialValue: relationAddress,
                                    rules: [{required: true}],
                                }
                            )
                        }
                        rows={5}
                        count={100}
                    />
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
                    <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>审批人:</Text></List.Item>
                </Picker>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: remarks,
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
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    brief: {
        fontSize: 14
    }
})
export default createForm()(Index);