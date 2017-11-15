import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    PixelRatio
} from 'react-native';
/**
 * 详细列表组件
 * @param props  name: 名字， text: 内容
 * @returns {XML}
 * @constructor
 */
export const Item = (props) => {
    const name = props.name?props.name:'';
    const text = props.text && props.text != null && props.text != 'null'?props.text:'';
    return(
        <View style={ItemStyles.listItem}>
            <View style={ItemStyles.titleWrap}>
                <Text style={ItemStyles.listTitle} numberOfLines={1}>
                    {name}
                </Text>
            </View>
            <View style={ItemStyles.listContent}>
                <Text style={ItemStyles.listText} numberOfLines={1}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const ItemStyles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        height: 50,
        borderBottomWidth: 1/PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#dddddd',
    },
    titleWrap: {
        height: 50,
        justifyContent: 'center',
    },
    listContent: {
        height: 50,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    listTitle: {
        fontSize: 15,
        marginRight: 10,
    },
    listText: {
        fontSize: 14,
        color: '#9F9F9F',
    }
})