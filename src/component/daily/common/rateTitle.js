/**
 * 头部进度组件
 **/

import React, {Component} from 'react';

import {
    View,
    StyleSheet
} from 'react-native';
import {
    Icon
} from 'antd-mobile';

export default class Index extends Component{
    render() {
        const {status} = this.props;

        return(
            <View style={styles.titleWrap}>
                <View style={styles.tlIcon}>
                    <Icon type={'\ue630'} color={'#5ade00'}/>
                </View>
                <View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet({
    titleWrap: {
        display: 'flex',
    },
    tlIcon: {
        width: 50,
        textAlign: 'center'
    }
})