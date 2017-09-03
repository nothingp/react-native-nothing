/**
 * 查看地址页面
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

import { Flex, Radio, Checkbox, WingBlank, Icon,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { Navigation } from 'react-native-navigation';

@inject('User')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
    }
    componentWillMount() {

    }
    render() {
        const { getFieldProps } = this.props.form;

        const {userDetail, nationalityList, districtList, politicalList, maritalList, educationList} = this.props.User;

        let prc_former_name, sex, dob, prc_np_province_desc, prc_np_city_desc, mobile_no, office_no, prc_qq, home_no, comp_email, pers_email;

        if(userDetail){
            prc_former_name = userDetail.prc_former_name;
            sex = userDetail.sex;
            dob = userDetail.dob?userDetail.dob.split('T')[0]: '';
            prc_np_province_desc = userDetail.prc_np_province_desc;
            prc_np_city_desc = userDetail.prc_np_city_desc;
            mobile_no = userDetail.mobile_no;
            office_no = userDetail.office_no;
            prc_qq = userDetail.prc_qq;
            home_no = userDetail.home_no;
            comp_email = userDetail.comp_email;
            pers_email = userDetail.pers_email;
        }
        let district = ''; //籍贯
        if(prc_np_province_desc && prc_np_city_desc){
            district = prc_np_province_desc + prc_np_city_desc
        }

        const sexArr = [
            {
                label: '男',
                value: 'M',
            },
            {
                label: '女',
                value: 'F',
            },
        ];
        return (
            <ScrollView>
                <List>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_former_name',
                                {
                                    initialValue: prc_former_name
                                }
                            )
                        }
                    >昵称：</InputItem>
                    <Picker data={sexArr} cols={1}
                            {
                                ...getFieldProps(
                                    'sex',
                                    {
                                        initialValue: sex
                                    }
                                )
                            }
                    >
                        <List.Item arrow="horizontal">性别：</List.Item>
                    </Picker>
                    <DatePicker mode="date"
                                onChange={this.onChange}
                    >
                        <List.Item arrow="horizontal">生日：</List.Item>
                    </DatePicker>
                    <Picker
                        extra="选择地区"
                        data={districtList}
                    >
                        <List.Item arrow="horizontal">籍贯：</List.Item>

                    </Picker>
                    <Picker data={nationalityList} cols={1}>
                        <List.Item arrow="horizontal">民族：</List.Item>
                    </Picker>
                    <Picker data={politicalList} cols={1}>
                        <List.Item arrow="horizontal">政治面貌：</List.Item>
                    </Picker>
                    <Picker data={maritalList} cols={1}>
                        <List.Item arrow="horizontal">婚姻状况：</List.Item>
                    </Picker>
                    <Picker data={educationList} cols={1}>
                        <List.Item arrow="horizontal">教育状况：</List.Item>
                    </Picker>
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