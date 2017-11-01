import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {
    Flex,
    Toast,
    Icon,
    ActivityIndicator,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    WingBlank,
    WhiteSpace,
    TextareaItem
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import BtnConfirm from '../BtnConfirm';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Base')
@observer
export default class Index extends BtnConfirm {

    okFn = () => {
        this.props.Base.logout();
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    btnTxt = '退出';

    title = '退出';

    massage = '确定要退出登录么？';

    okTxt = '确定';

    cancelTxt = '取消';

    cancelFn = () => {
        console.log('cancel',);
    }
}
