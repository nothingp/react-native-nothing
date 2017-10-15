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
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
//import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'

//引入第三方库
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {
    render() {
        const { comments } = this.props;
        return (
            <List renderHeader={() => '审批记录'}>
                {
                    comments && comments.map((v, i) => {
                        return (
                            <View key={i}>
                                <WingBlank size="lg">
                                    <WhiteSpace size="lg"/>

                                    <Flex justify="between">
                                        <Flex.Item>
                                            <Text>
                                                {`${v.approver} (${v.emp_id})`}
                                            </Text>
                                        </Flex.Item>
                                        <Flex.Item>
                                            {
                                                v.status == 'A' ?
                                                    <Text style={{ color: '#5ade00', textAlign: 'right' }}>
                                                        同意
                                                    </Text>
                                                    :
                                                    <Text style={{ color: '#f00', textAlign: 'right' }}>
                                                        不同意
                                                    </Text>
                                            }
                                        </Flex.Item>
                                    </Flex>

                                    <WhiteSpace size="lg"/>

                                    <Flex justify="between">
                                        <Flex.Item>
                                            <Text>
                                                {v.comment}
                                            </Text>
                                        </Flex.Item>

                                        <Flex.Item>
                                            <Text style={{ textAlign: 'right' }}>
                                                {v.approve_date && format(v.approve_date, 'yyyy-MM-dd')}
                                            </Text>
                                        </Flex.Item>
                                    </Flex>

                                    <WhiteSpace size="lg"/>
                                </WingBlank>

                            </View>

                        )
                    })
                }
            </List>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 40,
        borderRadius: 2
    },
    list: {
        height: 15
    },
    title: {
        marginLeft: 10
    },
    brief: {
        height: 18,
        width: 200,
        fontSize: 10,
        marginLeft: 10
    },
});

export default createForm()(Index);