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
import { startLoginScreen } from '../../screens/index';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast,Modal} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

@inject('Counter', 'User')
@observer
export default class Index extends Component {

    componentWillMount() {
        if(this.props.User.userInfo==null){
            startLoginScreen();
        }else {
            this.props.User.alertsList();
        }
    }

    componentWillUpdate(nextProps,nextState) {

    }

    render() {
        const { Counter, User } = this.props;
        // console.log('alertsListData', User.alertsListData);
        let { data = [], unread_total = 0 } = User.alertsListData || {};
        return (
            <View>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => Counter.onPlus()}
                    >

                        <Brief>click times {Counter.count}</Brief>
                    </Item>
                    {
                        data.map((v, i) => {
                            return (
                                <Item key={i}
                                      arrow="horizontal"
                                      extra={v.CREATE_TIME}
                                      thumb={v.URL || 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'}
                                      multipleLine
                                      onClick={() => {
                                          Modal.alert('基础数据更新成功！');
                                      }}
                                >
                                    {v.name}
                                    <Brief>{`${v.name} for ${v.year} ${v.month}`}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </View>

        )
    }
}