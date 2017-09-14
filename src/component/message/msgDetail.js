import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    ScrollView,
    ListView,
    WebView,
    Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Flex, WhiteSpace, WingBlank, Icon, Grid, Button, List, Toast, Modal } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent'
import navigator from '../../decorators/navigator'
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'Base')
@observer
export default class Index extends BaseComponent {
    render() {
        let { create_time, title, url, description } = this.props.User.alertsDetailData;
        return (
            <ScrollView>
                <WhiteSpace size="lg"/>

                <WingBlank size='lg'>
                    <Flex>
                        <Flex.Item>
                            <Text>
                                {title}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <WhiteSpace size="lg"/>

                <WingBlank size='lg'>
                    <Flex>
                        <Flex.Item>
                            <Text>
                                {create_time && format(create_time, 'yyyy-MM-dd')}
                            </Text>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

                <WhiteSpace size="lg"/>
                <WingBlank size='lg'>
                    <HTMLView value={description}/>
                </WingBlank>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    brief: {
        height: 66,
        fontSize: 14,
    },
});

