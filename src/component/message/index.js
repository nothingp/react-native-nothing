import React, { Component } from 'react';
import {observable, action, runInAction,computed,autorun} from 'mobx';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    ScrollView,
    ListView,
    Image
} from 'react-native';
import { startLoginScreen } from '../../screens/index';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent'
import navigator from '../../decorators/navigator'

const Item = List.Item;
const Brief = Item.Brief;



@inject('User','Common','Base')
@observer
@navigator
export default class Index extends BaseComponent {
    componentWillMount() {
        autorun(() => {
            if (!this.props.Base.userInfo) {
                startLoginScreen();
            }else{
                this.props.User.alertsList();
            }
        })
    }


    render() {
        let { data = [], unread_total = 0 } = this.props.User.alertsListData;
        return (
            <ScrollView>
                {
                    data.map((v, i) => {
                        return (
                            <List key={i}>
                                <Item
                                    arrow="horizontal"
                                    extra={v.create_time}
                                    thumb={v.url || 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'}
                                    multipleLine
                                    onClick={() => {
                                    }}
                                >
                                    {v.title}
                                    <Brief style={styles.brief}>{v.description}</Brief>
                                </Item>
                            </List>
                        )
                    })
                }
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    brief: {
        height: 50,
        fontSize: 14
    },
});
