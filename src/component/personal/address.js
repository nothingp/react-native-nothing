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

import { Flex, Radio, Checkbox, WingBlank, Icon,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker, NoticeBar } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
//import { Navigation } from 'react-native-navigation';
import {Item, NoticeBarMessage} from './common/index';
import TitleButton from './common/addressTitleButton';

@inject('User')
@observer
export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:'地址',
        headerRight: (
            <TitleButton navigation={navigation}/>
        ),
    });

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //请求个人的地址信息
        this.props.User.getAddressInfo();
    }
    render() {
        let domicile = '', //户籍地
            relation= '', //市
            domicileAddress = '', //详细地址
            relationAdress = '', //详细联系地址
            post_codes = '',
            statusStr = '';

        if(this.props.User.addressInfo){
            const {reg_province_desc, reg_city_desc, reg_city_district_desc, reg_address, con_province_desc, con_city_desc, con_city_district_desc,con_address, remark, post_code, status} = this.props.User.addressInfo;
            domicile = reg_province_desc + reg_city_desc + reg_city_district_desc;
            relation = con_province_desc + con_city_desc + con_city_district_desc;
            post_codes = post_code;
            domicileAddress = reg_address;
            relationAdress = con_address;
            statusStr = status;
        }
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                <NoticeBarMessage status={statusStr}/>
                <Item name="户籍地：" text={domicile}/>
                <List renderHeader={() => '户籍地详细地址'}>
                    <TextareaItem
                        value={domicileAddress}
                        editable={false}
                        rows={5}
                    />
                </List>
                <Item name="邮编：" text={post_codes}/>
                <Item name="联系地址：" text={relation}/>
                <List renderHeader={() => '联系详细地址'}>
                    <TextareaItem
                        value={relationAdress}
                        editable={false}
                        rows={5}
                    />
                </List>
            </ScrollView>

        )
    }
}