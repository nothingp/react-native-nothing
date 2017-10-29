import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Platform,
    PixelRatio,
    Image
} from 'react-native';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Result, Toast, Modal } from 'antd-mobile';

export const showAlert = ({
                              title = '提交',
                              massage = '确定修改信息吗',
                              okTxt = '确定',
                              okFn = () => {
                              },
                              cancelTxt = '取消',
                              cancelFn = () => {
                              }
                          }) => {
    Modal.alert(
        <View style={{
            height: 30,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <Text style={{ fontSize: 20 }}>
                {title}
            </Text>
        </View>,
        <View style={{
            height: 50,
            width: 250,
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <Text style={{ fontSize: 16 }}>
                {massage}
            </Text>
        </View>,
        [
            {
                text: cancelTxt,
                onPress: cancelFn,
                style: { color: '#333', paddingTop: 5 }
            },
            {
                text: okTxt,
                onPress: okFn,
                style: { color: '#333', paddingTop: 5 }
            },
        ]
    );
};