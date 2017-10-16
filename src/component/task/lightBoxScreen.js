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
    PickerView,
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
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    onChange = (selectObj) => {
        let { navigator, True } = this.props;
        True.taskSelectType = selectObj;
        True.activeKey = 'PE';
        navigator.dismissLightBox();
        True.taskListAction();
    }

    render() {
        const data = [
            {
                value: 'ALL',
                label: '所有',
            },
            {
                value: 'PP',
                label: '个人信息',
            },
            {
                value: 'LA',
                label: '假期',
            },
            {
                value: 'CA',
                label: '报销',
            },
            {
                value: 'TS',
                label: '工作时间表',
            },
            {
                value: 'LC',
                label: '可调休假',
            },
            {
                value: 'CL',
                label: '取消假期',
            },
        ];
        return (
            <View>
                <List>
                    {
                        data.map((v, i) => {
                            return (
                                <Item key={i}
                                      onClick={() => {
                                          this.onChange(v)
                                      }}>
                                    {v.label}
                                </Item>
                            )
                        })
                    }
                </List>
            </View>
        )
    }
}

export default createForm()(Index);