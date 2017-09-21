/**
 * 一些通用的共用组件
 **/
import React, {PureComponent} from 'react';
import {Flex, List} from 'antd-mobile';
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
    return(
        <Flex style={ItemStyles.listItem}>
            <Flex.Item>
                <Text style={ItemStyles.listTitle}>
                    {props.name?props.name:''}
                </Text>
            </Flex.Item>
            <Flex.Item style={ItemStyles.listContent}>
                <Text>
                    {props.text?props.text:''}
                </Text>
            </Flex.Item>
        </Flex>
    )
}

const ItemStyles = StyleSheet.create({
    listItem: {
        height: 50,
        borderBottomWidth: 1/PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#dddddd',
    },
    listContent: {
        flex: 3,
    },
    listTitle: {
        fontSize: 20
    }
})