import React, { Component } from 'react';
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

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Base')
@observer
export default class Index extends Component {

    componentWillMount() {
        if (this.props.Base.userInfo == null) {
            startLoginScreen();
        } else {
            this.props.User.alertsList();
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.Base.userInfo == null) {
            startLoginScreen();
        } else {
            this.props.User.alertsList();
        }
    }

    render() {
        const { User } = this.props;
        console.log('log',);
        let { data = [], unread_total = 0 } = User.alertsListData || {};
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
                                    <Brief>{v.description}</Brief>
                                </Item>
                            </List>
                        )
                    })
                }
            </ScrollView>

        )
    }
}