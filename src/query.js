import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    Image
} from 'react-native';
import { Flex, WhiteSpace,Icon,Grid,Button,List,NavBar,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import Header from './component/Header'

const Item = List.Item;
const Brief = Item.Brief;

class Index extends Component {
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <View >
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >登记编号</InputItem>
                <InputItem
                    {...getFieldProps('input3')}
                    placeholder="请输入"
                >查询码</InputItem>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" >查询</Button>
            </View>

        )
    }
}

export default createForm()(Index);

const styles = StyleSheet.create({
    image: {
        height:'100%',
    },
    button: {
        width:'100%',
        marginBottom:180,
        alignSelf:'flex-end'
    },
    list: {
        height:15
    }
});