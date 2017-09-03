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
import { startLoginScreen } from '../screens';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast,Modal} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

@inject('Counter', 'User')
@observer
export default class Index extends Component {

    componentDidMount() {
        console.log('this.props.User.userInfo:',this.props.User.userInfo);
        if(this.props.User.userInfo==null){
            startLoginScreen();
        }else {
            //this.props.User.alertsList();
        }
    }

    render() {
        const { Counter, User } = this.props;
        let list = [
            {
                url: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                name: 'truexin',
                month: 7,
                year: 2017,
                day: 7
            }, {
                url: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                name: 'truexin',
                month: 8,
                year: 2017,
                day: 8
            }, {
                url: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                name: 'truexin',
                month: 9,
                year: 2017,
                day: 9
            }, {
                url: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                name: 'truexin',
                month: 10,
                year: 2017,
                day: 10
            },
        ]
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
                        list.map((v, i) => {
                            return (
                                <Item key={i}
                                    arrow="horizontal"
                                    extra={`${v.month}-${v.day}`}
                                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
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