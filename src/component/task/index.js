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
import { Tabs, Badge,Icon,Grid,Button,List } from 'antd-mobile';
import {gColors} from '../../common/GlobalContants'

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

export default class Index extends Component {
    static navigatorStyle = {
        navBarBackgroundColor:gColors.brandPrimary,
        navBarTextColor: '#fff'
    };

    render() {
        return (
                <Tabs defaultActiveKey="2" activeTextColor={gColors.brandPrimary} activeUnderlineColor={gColors.brandPrimary} >
                    <TabPane tab="未处理" key="1">
                        <List className="my-list">
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
                            <Item
                                arrow="horizontal"
                                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                multipleLine
                                onClick={() => {}}
                            >
                                Title <Brief>subtitle</Brief>
                            </Item>
                        </List>
                    </TabPane>
                    <TabPane tab="已处理" key="2">
                        <List className="my-list">
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
                            <Item
                                arrow="horizontal"
                                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                multipleLine
                                onClick={() => {}}
                            >
                                Title <Brief>subtitle</Brief>
                            </Item>
                        </List>
                    </TabPane>
                </Tabs>

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