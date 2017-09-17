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
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditAddress',
                    title: '编辑地址'
                })
            }
        }
    }

    componentWillMount() {
        //请求个人的地址信息
        this.props.User.getAddressInfo();

        //设置头部
        this.props.navigator.setButtons({
            rightButtons: [{
                title: '编辑', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }], // see "Adding buttons to the navigator" below for format (optional)
            animated: false // does the change have transition animation or does it happen immediately (optional)
        });

        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        let domicile = '', //户籍地
            relation= '', //市
            domicileAddress = '', //详细地址
            relationAdress = '', //详细联系地址
            remarks = '', //备注
            post_codes = '';

        if(this.props.User.addressInfo){
            const {reg_province_desc, reg_city_desc, reg_city_district_desc, reg_address, con_province_desc, con_city_desc, con_city_district_desc,con_address, remark, post_code} = this.props.User.addressInfo;
            domicile = reg_province_desc + reg_city_desc + reg_city_district_desc;
            relation = con_province_desc + con_city_desc + con_city_district_desc;
            post_codes = post_code;
            remarks = remark;
            domicileAddress = reg_address;
            relationAdress = con_address;
        }
        return (
            <ScrollView>
                <List>
                    <InputItem value={domicile} editable={false}>户籍地：</InputItem>
                </List>
                <List renderHeader={() => '户籍地详细地址'}>
                    <TextareaItem
                        value={domicileAddress}
                        editable={false}
                        rows={5}
                        count={100}
                    />
                </List>
                <List>
                    <InputItem value={relation} editable={false}>联系地址：</InputItem>
                </List>
                <List>
                    <InputItem value={post_codes} editable={false}>邮编：</InputItem>
                </List>
                <List renderHeader={() => '联系详细地址'}>
                    <TextareaItem
                        value={relationAdress}
                        editable={false}
                        rows={5}
                        count={100}
                    />
                </List>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        value={remarks}
                        editable={false}
                        rows={5}
                        count={100}
                    />
                </List>
            </ScrollView>

        )
    }
}