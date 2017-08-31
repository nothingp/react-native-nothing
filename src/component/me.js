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


const Separator = () => (
    <Flex
        style={styles.separator}
    />
);

@inject('User')
@observer
export default class Index extends Component {
    render() {
        console.warn(this.props.User.userInfo);
        return (
            <View>
                <Separator/>
                <List className="my-list">
                    <Item
                        thumb={<Image source={{uri: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'}}
                                      style={styles.image}/>}
                        multipleLine
                        extra={<Brief>个人资料</Brief>}
                        arrow="horizontal"
                        onClick={() => this.props.navigator.push({
                            screen: 'SelfInfo',
                            title: '个人信息'
                        })}
                    >
                        陈灵 <Brief style={styles.smallFont}>Manager</Brief>
                        <Brief style={styles.smallFont}>工号: ES0001</Brief>
                    </Item>
                </List>
                <Separator/>
                <List>
                    <Item
                        thumb={<Icon type={'\ue686'} />}
                        arrow="horizontal"
                        onClick={() => this.props.navigator.push({
                            screen: 'SelfInfo',
                            animated: false,
                            title: '图表'
                        })}
                    >地址</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">紧急联系人</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">银行账号</Item>

                </List>
                <Separator/>
                <List>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >工资单</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">IR56B</Item>
                </List>
                <Separator/>
                <List>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >修改密码</Item>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">更新基数数据</Item>
                </List>
                <WhiteSpace/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#f2f2f2'
    },
    smallFont: {
        fontSize: 12,
    },
    image: {
        width: 55,
        height: 55,
        marginRight: 15,
    }
});