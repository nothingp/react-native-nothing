/**
 * 头部进度组件
 **/

import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {
    Icon
} from 'antd-mobile';

export default class Index extends Component{
    render() {
        console.log(222)
        return(
            <View style={styles.titleWrap}>
                <View style={styles.tlIcon}>
                    <Text style={{textAlign: 'center', marginTop: 8}}>
                        <Icon type={'\ue62c'} color={'#F87C36'} size="xs"/>
                    </Text>
                </View>
                <View style={styles.infoWrap}>
                    <Text style={{lineHeight: 30, color: '#F87C36'}}>
                        您的假期申请已提交成功，等待审批中。
                    </Text>
                </View>
                <View style={styles.upWrap}>
                    <Text style={{textAlign: 'center', marginTop: 8}}>
                        <Icon type={'\ue61d'} color={'#9E9F9E'} size="xs"/>
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleWrap: {
        display: 'flex',
        flexDirection: 'row',
        height: 35,
        backgroundColor: '#FFF9D9'
    },
    tlIcon: {
        width: 40,
        height: 35,
    },
    infoWrap: {
        flex: 1
    },
    upWrap: {
        width: 40,
        height: 35,
    }
})