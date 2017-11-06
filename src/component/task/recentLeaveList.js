import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    Image,
    StatusBar
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Grid,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';

import RecentLeaveModal from './recentLeaveModal';
import { renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = {
        title: '近期假期查看',
        headerRight: (
            <RecentLeaveModal/>
        ),
    }

    componentWillMount() {
        const { True, User } = this.props;
        True.recentLeaveType = {
            value: 'three',
            label: '近3个月',
        };
        Toast.loading('loading');
        User.getPersonalInfo();
        True.leaveRecentLeaveApiAction(3,0);
    }

    render() {
        let { True, navigation, User } = this.props;
        const { leaveawardDetail, } = True;
        const { personalInfo } = User;

        const {
            name,
            user_photo,
            position,
        } = personalInfo || {};

        let res = [1, 2, 3]

        return (
            <ScrollView>

                <List>
                    {
                        renderHeadIconItem(user_photo, name, position)
                    }
                </List>

                <WhiteSpace size="lg"/>

                <List>
                    <List.Item
                        arrow="empty"
                    >
                        <Text>
                            共3条记录，请了4天假期。
                        </Text>
                    </List.Item>

                    {
                        res.map((v, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    multipleLine
                                    arrow="empty"
                                >
                                    <Text>
                                        年假（2天）
                                    </Text>
                                    <Brief>
                                        <Text>
                                            2017-02-21上午 到 2017-02-22下午
                                        </Text>
                                    </Brief>
                                </List.Item>
                            )
                        })
                    }
                </List>

            </ScrollView>

        )
    }
}

export default createForm()(Index);