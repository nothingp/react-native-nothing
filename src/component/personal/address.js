/**
 * 查看地址页面
 */

import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
} from 'react-native';

import { List,TextareaItem } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
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
                <View style={{height: 40, backgroundColor: '#F4F4F9'}}>
                    <Text style={{lineHeight: 40, marginLeft: 10}}>户籍地</Text>
                </View>
                <Item name="省市区：" text={domicile}/>
                <View style={{height: 40}}>
                    <Text style={{lineHeight: 40, marginLeft: 10}}>详细地址：</Text>
                </View>
                <TextareaItem
                    value={domicileAddress}
                    editable={false}
                    rows={5}
                />
                <Item name="邮编：" text={post_codes}/>
                <View style={{height: 40, backgroundColor: '#F4F4F9'}}>
                    <Text style={{lineHeight: 40, marginLeft: 10}}>联系地址</Text>
                </View>
                <Item name="省市区：" text={relation}/>
                <View style={{height: 40}}>
                    <Text style={{lineHeight: 40, marginLeft: 10}}>详细地址：</Text>
                </View>
                <TextareaItem
                    value={relationAdress}
                    editable={false}
                    rows={5}
                />
            </ScrollView>

        )
    }
}