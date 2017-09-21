/**
 * 添加联系人
 */

import React, { Component } from 'react';

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

import { Flex, WingBlank, WhiteSpace, Toast,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';
import districtList from '../../const/district';

@inject('User', 'Common')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();
        //请求联系人关系列表
        this.props.Common.getRelationShip();
        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {addressList, relationShipList} = this.props.Common;
        const {approverList} = this.props.User;


        let regProvinceCode = '',
            regCityCode = '',
            regCityDistrictCode = '',
            conProvinceCode = '',
            conCityCode = '',
            conCityDistrictCode = '',
            domicileAddress = '', //详细地址
            relationAddress = '', //详细联系地址
            remarks = ''; //备注信息

        if(this.props.User.addressInfo){
            const {reg_province_code, reg_city_code, reg_city_district_code, reg_address, con_province_code, con_city_code, con_city_district_code,con_address, remark} = this.props.User.addressInfo;
            regProvinceCode = reg_province_code;
            regCityCode = reg_city_code;
            regCityDistrictCode = reg_city_district_code;

            conProvinceCode = con_province_code;
            conCityCode = con_city_code;
            conCityDistrictCode = con_city_district_code;

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
                            'relationShipType',
                            {
                                initialValue: ['C'],
                                rules: [{required: true}],
                            }
                        )
                    }
                    cols={1}
                    data={relationShipList}
                >
                    <List.Item arrow="horizontal">关系：</List.Item>
                </Picker>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_former_name',
                            {
                                initialValue: '',
                                rules: [{required: true}],
                            }
                        )
                    }
                >名字：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_former_name',
                            {
                                initialValue: '',
                                rules: [{required: true}],
                            }
                        )
                    }
                >电话：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_former_name',
                            {
                                initialValue: '',
                            }
                        )
                    }
                >年龄：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_former_name',
                            {
                                initialValue: '',
                            }
                        )
                    }
                >工作单位及职务：</InputItem>
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

export default createForm()(Index);