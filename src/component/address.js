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
import { Navigation } from 'react-native-navigation';

@inject('User')
@observer
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
    }
    componentWillMount() {
        //请求个人的详细信息
        this.props.User.getPersonDetail();
    }
    render() {
        const {prc_former_name, sex, dob, prc_np_province_desc, prc_np_city_desc, mobile_no, office_no, prc_qq, home_no, comp_email, pers_email} = this.props.User.userDetail;
        let district = ''; //籍贯
        if(prc_np_province_desc && prc_np_city_desc){
            district = prc_np_province_desc + prc_np_city_desc
        }
        return (
            <ScrollView>
                <List>
                    <InputItem value={prc_former_name? prc_former_name: ''} editable={false}><Text style={styles.listName}>国家：</Text></InputItem>
                    <InputItem value={sex? sex == 'M'? '男': '女': ''} editable={false}><Text style={styles.listName}>地区：</Text></InputItem>
                    <TextareaItem
                        rows={5}
                        count={100}
                    />
                </List>
            </ScrollView>

        )
    }
}