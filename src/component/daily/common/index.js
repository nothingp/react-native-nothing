import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    PixelRatio,
    Image
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

/**
 * 附件图片列表，最多4张图片
 * @param str用,分隔
 * @returns {XML}
 * @constructor
 */
export const ImgList = (str) => {
    const imgArr = str.split(',');
    const arr = Array.from(new Array(4 - imgArr.length));

    return(
        <View>
            <View style={{height: 40, backgroundColor: '#f2f2f2'}}>
                <Text style={{marginLeft: 15, lineHeight: 40}}>
                    附件
                </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                {
                    imgArr && imgArr.map((info, i) => {
                        return(
                            <View key={i} style={{flex: 1, width: 100, height: 70, marginTop: 10, marginBottom: 10}}>
                                <View style={{marginLeft: 5, marginRight: 5, position: 'relative'}}>
                                    <Image style={{width: '100%', height: '100%'}} source={{uri: info}}/>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    arr && arr.map((info, i) =>
                        <View key={i} style={{flex: 1}}>
                        </View>
                    )
                }
            </View>
        </View>
    )
}