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
import { Flex, WhiteSpace,Icon,Grid,Button,List } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';

const Item = List.Item;
const Brief = Item.Brief;


@inject('Counter')
@observer
export default class Index extends Component {
    render() {
        const { Counter } = this.props;
        return (
            <View>
                <List className="my-list">
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => this.props.navigator.push({
                            screen: 'SelfInfo',
                            title: '个人信息'
                        })}
                    >
                        陈灵 <Brief>管理员 {Counter.count}</Brief>
                    </Item>
                </List>
                <List renderHeader={() => '基本信息'}>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => this.props.navigator.push({
                            screen: 'SelfInfo',
                            animated: false,
                            title: '图表'
                        })}
                    >My wallet</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">My Cost Ratio</Item>
                </List>
                <List renderHeader={() => 'XX信息'}>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >My wallet</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">My Cost Ratio</Item>
                </List>
                <List renderHeader={() => 'xx信息'}>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >My wallet</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">My Cost Ratio</Item>
                </List>
                <WhiteSpace/>
                <Button type="primary"  onPressIn={()=>{startLoginScreen()}}>退出</Button>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        height:200,
        backgroundColor:'green'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height:15
    }
});