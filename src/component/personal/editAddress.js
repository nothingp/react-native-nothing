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
import districtList from '../../const/district';

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

        const sexArr = [
            {
                label: '男',
                value: '0',
            },
            {
                label: '女',
                value: '1',
            },
        ];
        return (
            <ScrollView>
                <List>
                    <Picker data={sexArr} cols={1}>
                        <List.Item arrow="horizontal">省份：</List.Item>
                    </Picker>
                    <Picker data={sexArr} cols={1}>
                        <List.Item arrow="horizontal">市/县：</List.Item>
                    </Picker>
                    <List renderHeader={() => '地址'}>
                        <TextareaItem
                            editable={false}
                            rows={5}
                            count={100}
                        />
                    </List>
                </List>
            </ScrollView>

        )
    }
}

export default createForm()(Index);