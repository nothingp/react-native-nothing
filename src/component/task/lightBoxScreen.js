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
import { Navigation } from 'react-native-navigation';
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

    onChange = (selectObj) => {
        let { navigator, True } = this.props;
        True.taskSelectType = selectObj;

        console.log('log', True.taskSelectType);

        // navigator.setButtons({
        //     rightButtons: [{
        //         title: selectObj.label, // for a textual button, provide the button title (label)
        //         id: selectObj.value, // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //     }], // see "Adding buttons to the navigator" below for format (optional)
        //     animated: false // does the change have transition animation or does it happen immediately (optional)
        // });
        navigator.dismissLightBox();
    }

    render() {
        const data = [
            {
                value: 'ALL',
                label: '所有',
            },
            {
                value: 'OFF',
                label: '请假',
            },
            {
                value: 'REST',
                label: '调休假申请',
            },
            {
                value: 'PERSON',
                label: '个人中心',
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