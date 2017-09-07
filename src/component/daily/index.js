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
import { Grid, WhiteSpace, Icon, Button, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

export default class Index extends Component {

    dataList = [
        { text: '累计假期', icon: <Icon type={'\ue66a'}/>, color: 'yellow' },
        { text: '休假', icon: <Icon type={'\ue637'}/>, color: 'red' },
        { text: '调休申请', icon: <Icon type={'\ue637'}/>, color: 'green' },
        { text: '报销', icon: <Icon type={'\ue637'}/>, color: 'purple' },
        { text: '考勤', icon: <Icon type={'\ue637'}/>, color: 'blue' },
        { text: '工作时间表', icon: <Icon type={'\ue637'}/>, color: 'light' },
    ]

    render() {
        const data = Array.from(new Array(9)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: `name${i}`,
        }));


        return (
            <View>
                <Grid data={this.dataList} columnNum={3}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        backgroundColor: 'green'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height: 15
    }
});