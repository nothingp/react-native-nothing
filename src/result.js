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
import { Flex, WhiteSpace,Icon,Grid,Button,List,Result } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

export default class Index extends Component {


    render() {
        return (
            <View >
                <Result
                    img={<Icon type="check-circle" size={70} color="#1F90E6"/>}
                    title="提交成功"
                    message="所提交内容已成功完成验证"
                />
                <Button type="primary" >返回</Button>
            </View>

        )
    }
}
