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
    }
    render() {
        let province = '', //省份
            city = '', //市
            address = ''; //详细地址
        if(this.props.User.addressInfo){
            const {reg_province_desc, reg_city_desc, con_address} = this.props.User.addressInfo;
            province = reg_province_desc;
            city = reg_city_desc;
            address = con_address;
        }
        return (
            <ScrollView>
                <List>
                    <InputItem value={province} editable={false}>省份：</InputItem>
                </List>
                <List>
                    <InputItem value={city} editable={false}>市/县：</InputItem>
                </List>
                <List renderHeader={() => '地址'}>
                    <TextareaItem
                        value={address}
                        editable={false}
                        rows={5}
                        count={100}
                    />
                </List>
            </ScrollView>

        )
    }
}