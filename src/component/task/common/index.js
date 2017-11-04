/**
 * 一些通用的共用组件
 **/
import React, { PureComponent } from 'react';

import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    StatusBar,
    Image,
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Grid,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';

/**
 * icon组件
 * @param txt:现在的文案，old_txt:修改前的文案
 */
export const renderIcon = (txt, old_txt) => {
    if (!old_txt && txt) {
        return (
            <Icon type={'\ue630'} color={'#5ade00'}/>
        )
    }
    else if (old_txt && txt && old_txt != txt) {
        return (
            <Text onPress={() => {
                Toast.success('修改前：' + old_txt);
            }}>
                <Icon type={'\ue631'} color={'#f59700'}/>
            </Text>
        )
    }
    else if (old_txt == txt) {
        return '';
    }
    return '';
}

/**
 * 列表项组件
 * @param txt:现在的文案，old_txt:修改前的文案，列表标签名称:name
 */
export const renderNameItem = (txt, old_txt, name) => {
    return (
        <List.Item
            arrow="empty"
            extra={
                renderIcon(txt, old_txt)
            }
        >
            <Text>
                {name}：{txt}
            </Text>
        </List.Item>
    )
}

export const transGender = (sex) => {
    let gender = '';
    switch (sex) {
        case 'M':
            gender = '男';
            break;
        case 'F':
            gender = '女';
            break;
        default:
    }
    return gender;
}


export const renderRemark = (remark) => {
    return (
        <List.Item arrow="empty">
            <Text>
                备注：{remark}
            </Text>
        </List.Item>
    )
}

export const renderAttachment = (attachment, old_attachment) => {
    return (
        <List.Item
            arrow="empty"
            extra={
                renderIcon(attachment, old_attachment)
            }
        >
            <Text>
                附件：
            </Text>
            <WhiteSpace/>
            {
                attachment ?
                    <Image style={ItemStyles.image} source={{ uri: attachment }}/>
                    : null
            }
        </List.Item>
    )
}

export const renderHeadIconItem = (img, name, message) => {
    return (
        <List.Item
            arrow="empty"
            thumb={
                img || <Icon type={'\ue6a8'}/>
            }
            multipleLine
        >
            <Text style={ItemStyles.title}>
                {name}
            </Text>
            <List.Item.Brief style={ItemStyles.brief}>
                <Text>
                    {message}
                </Text>
            </List.Item.Brief>
        </List.Item>
    )
}

const ItemStyles = StyleSheet.create({
    title: {
        height: 30,
        lineHeight: 30,
        width: 150,
        fontSize: 14,
    },
    image: {
        height: 80,
        width: 80,
    },
    brief: {
        height: 18,
        width: 200,
        fontSize: 10,
    },
})