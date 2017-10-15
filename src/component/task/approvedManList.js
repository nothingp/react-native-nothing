import React, { Component } from 'react';
import moment from 'moment';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
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
    SearchBar,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
//import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    componentWillMount() {
        let { True } = this.props;
        // True.managerApiAction();
        // Toast.loading('loading');
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }

    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }

    selectItem = (v) => {
        console.log('log', v);
    }

    render() {
        let { True, navigator } = this.props;
        // const { selectTaskManagers } = True;
        // console.log('selectTaskManagers', selectTaskManagers);
        let appList = [
            { label: 'person1', value: '1' },
            { label: 'person2', value: '2' },
            { label: 'person3', value: '3' },
            { label: 'person4', value: '4' },
        ]
        return (
            <View>
                <SearchBar placeholder="请输入编号或名字过滤" maxLength={8}/>
                <ScrollView>
                    <List>
                        {
                            appList.map((v, i) => {
                                return (
                                    <List.Item onClick={() => this.selectItem(v.label)} key={i}>{v.label}</List.Item>
                                )
                            })
                        }
                    </List>
                </ScrollView>
            </View>

        )
    }
}

export default createForm()(Index);