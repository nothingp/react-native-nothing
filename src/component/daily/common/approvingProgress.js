import React, { Component } from 'react';
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
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';

//引入第三方库
import { format } from '../../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {
    render() {
        const { comments } = this.props;
        return (
            <ScrollView>
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
            </ScrollView>
        )
    }
}

export default createForm()(Index);