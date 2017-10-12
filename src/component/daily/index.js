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
import { Grid, WhiteSpace, Icon, Toast, List } from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';

import BaseComponent from '../BaseComponent'
import navigator from '../../decorators/navigator'

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('True', 'Base')
@observer
export default class Index extends BaseComponent {

    willAppear = (event) => {
        let { Base, True } = this.props;
        if (Base.userInfo) {
            True.sysfunctionmenuListAction();
            Toast.loading('loading');
        }
    }

    initialData = (data) => {
        let newData = []
        data && data.map((v, i) => {
            newData.push({
                text: v.name_trad,
                icon: <Icon type={'\ue66a'}/> || v.href,
                url: v.href,
            })
        })
        return (
            newData
        )
    }

    render() {
        let { True } = this.props;
        return (
            <View>
                <Grid data={this.initialData(True.sysfunctionmenuListData)} columnNum={3}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        backgroundColor: 'green'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height: 15
    }
});