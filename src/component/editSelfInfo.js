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
import districtList from '../const/district';

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
        //请求个人的详细信息
        this.props.User.getPersonDetail();
    }
    render() {
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
                    <InputItem placeholder="请输入">昵称：</InputItem>
                    <Picker data={sexArr} cols={1}>
                        <List.Item arrow="horizontal">性别：</List.Item>
                    </Picker>
                    <Picker data={sexArr} cols={1}>
                        <List.Item arrow="horizontal">民族：</List.Item>
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
                    <Picker data={sexArr} cols={1}>
                        <List.Item arrow="horizontal">政治面貌：</List.Item>
                    </Picker>
                    <Picker data={sexArr} cols={1}>
                        <List.Item arrow="horizontal">婚姻状况：</List.Item>
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