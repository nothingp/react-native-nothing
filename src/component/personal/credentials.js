/**
 * 查看证件
 **/

import React, {PureComponent} from 'react';
import {Flex, List} from 'antd-mobile';
import {
    View,
    StyleSheet,
    Text,
    PixelRatio
} from 'react-native';

import {Item} from './common/index';

export default class Index extends PureComponent{
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentWillMount() {
        //设置头部
        this.props.navigator.setButtons({
            rightButtons: [{
                title: '编辑', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }], // see "Adding buttons to the navigator" below for format (optional)
            animated: false // does the change have transition animation or does it happen immediately (optional)
        });
        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditCred',
                    title: '编辑证件信息'
                })
            }
        }
    }
    render() {
        return(
            <View>
                <Item name="身份证：" text="440999898998777"/>
                <Item name="社保电脑号：" text="440999898998777"/>
                <Item name="住房公积金号：" text="440999898998777"/>
            </View>
        )
    }
}