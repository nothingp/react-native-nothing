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
import { Grid, WhiteSpace,Icon  ,Button,List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

export default class Index extends Component {
    render() {
        const data = Array.from(new Array(9)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: `name${i}`,
        }));


        return (
            <View>
                <Grid data={data} columnNum={3} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        height:200,
        backgroundColor:'green'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height:15
    }
});