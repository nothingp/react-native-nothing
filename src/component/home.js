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
import { Flex, WhiteSpace,Icon,Grid,Button,List } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

const Item = List.Item;
const Brief = Item.Brief;

@inject('Counter','User')
@observer
export default class Index extends Component {

    componentDidMount() {
        this.props.User.alertsList();
    }

    render() {
        const { Counter,User } = this.props;
        return (
            <View>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => Counter.onPlus()}
                    >
                        user session Id {this.props.User.userInfo.session_id} <Brief>subtitle {Counter.count}</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title <Brief>subtitle</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title <Brief>subtitle</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title <Brief>subtitle</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title <Brief>subtitle</Brief>
                    </Item>
                </List>
            </View>

        )
    }
}