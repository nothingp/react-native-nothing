/**
 * 一些通用的共用组件
 **/
import React, {PureComponent} from 'react';
import {Flex, NoticeBar} from 'antd-mobile';
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
        <View style={ItemStyles.listItem}>
            <View style={ItemStyles.titleWrap}>
                <Text style={ItemStyles.listTitle}>
                    {props.name?props.name:''}
                </Text>
            </View>
            <View style={ItemStyles.listContent}>
                <Text style={ItemStyles.listText}>
                    {props.text && props.text != null?props.text:''}
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
        justifyContent: 'center',
    },
    listContent: {
        justifyContent: 'center',
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

/**
 * 顶部审批状态信息
 * @param props
 * @returns {XML}
 * @constructor
 */
export const NoticeBarMessage = (props) => {
    return(
        <View>
            {
                props.status == 'N'?
                    <NoticeBar>
                        您的信息已提交成功，等待审批中。
                    </NoticeBar>:
                    props.status == 'P'?
                        <NoticeBar>
                            您的信息正在审批中。
                        </NoticeBar>:
                        props.status == 'R'?
                            <NoticeBar>
                                您的信息已审批不通过。
                            </NoticeBar>:
                            props.status == 'A'?
                                <NoticeBar>
                                    您的信息已审批通过。
                                </NoticeBar>:
                                null
            }
        </View>
    )
}

export const RequireData = () => {
    return(
        <Text style={requireStyle.text}>
            *
        </Text>
    )
}

const requireStyle = StyleSheet.create({
    text: {
        color: 'red',
    }
})