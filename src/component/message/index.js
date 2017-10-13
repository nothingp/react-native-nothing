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
    Image
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { startLoginScreen } from '../../screens/index';
//import JPushModule from 'jpush-react-native';
import { Flex, WhiteSpace, Icon, Grid, Button, List, Toast, Modal, Badge } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import BaseComponent from '../BaseComponent'
import navigator from '../../decorators/navigator'
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'Base', 'True')
@observer
export default class Index extends BaseComponent {
    static navigationOptions = {
        title:'消息中心',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../resource/tabs/message_01.png')}
                style={[{tintColor: tintColor}]}
            />
        )
    }


    componentWillMount() {
        autorun(() => {
            if (!this.props.Base.userInfo) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login'})
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        })

        if(this.props.Base.userInfo){
            this.props.User.alertsList();
        }
    }

    componentWillUnmount() {
        // JPushModule.removeReceiveCustomMsgListener();
        // JPushModule.removeReceiveNotificationListener();
    }

    render() {
        let { User, True, navigation } = this.props;
        let { data = [], unread_total = 0 } = User.alertsListData;
        return (
            <ScrollView >
                {
                    data.map((v, i) => {
                        return (
                            <List key={i}>
                                <Item
                                    arrow="horizontal"//v.status
                                    extra={v.create_time && format(v.create_time, 'MM-dd')}
                                    thumb={
                                        <Badge
                                            dot
                                            //text={2}
                                        >
                                            {
                                                v.url
                                                || <Icon type={'\ue6ab'}/>
                                            }
                                        </Badge>
                                    }
                                    multipleLine
                                    onClick={
                                        () => {
                                            User.alertsDetail(v);
                                            True.alertsSubmitApiAction(v.alert_tbl_id);
                                            Toast.loading('loading');
                                            navigation.navigate('MsgDetail')
                                        }
                                    }
                                >
                                    <Text style={styles.title}>
                                        {v.title}
                                    </Text>
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
    title: {
        height: 30,
        lineHeight: 30,
        width: 150,
        fontSize: 14,
        marginLeft: 10
    },
    brief: {
        height: 18,
        width: 150,
        fontSize: 12,
        marginLeft: 10
    },
});

