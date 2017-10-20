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
import { NavigationActions } from 'react-navigation';

import {
    Flex,
    Accordion,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Tabs,
    Grid,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    Badge,
    Radio,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { gColors } from '../../common/GlobalContants';

//引入第三方库
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;
const RadioItem = Radio.RadioItem;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: '',
            value: '',
            valueOther: '',
            activeKey: '',
        };
    }

    onSubmit = (status) => {
        const { form, True, navigation } = this.props;
        const { selectTask } = True;

        form.validateFields(async (err, values) => {
            console.log('err', err, values);

            if (!err) {//将对应的时间进行格式化
                const {
                    remark,
                    approver_id
                } = values;
                Toast.loading('loading');
                await True.taskSubmitApiAction(
                    status,
                    selectTask.function,
                    selectTask.function_dtl,
                    selectTask.key,
                    remark,
                    approver_id && approver_id[0],
                    () => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Task' })
                            ]
                        })
                        navigation.dispatch(resetAction);
                    });

            }
        });
    }

    onChange = (value) => {
        this.setState({
            value
        })
    }

    selectItem = (label) => {
        this.setState({
            label
        })
    }

    onChangeOther = (valueOther) => {
        this.setState({
            valueOther
        })
    }

    render() {
        let { True, form, is_last_approve, navigator } = this.props;
        const { getFieldProps } = form;
        const { selectTaskApprovers } = True;
        let { value, valueOther, activeKey, label } = this.state;

        let appList = [
            { label: 'person1', value: '1' },
            { label: 'person2', value: '2' },
            { label: 'person3', value: '3' },
            { label: 'person4', value: '4' },
        ]
        let otherList = [
            { label: 'other1', value: '1' },
            { label: 'other2', value: '2' },
            { label: 'other3', value: '3' },
            { label: 'other4', value: '4' },
        ]
        return (
            <List renderHeader={() => ''}>
                {
                    is_last_approve != 1 &&
                    <Picker data={selectTaskApprovers} cols={1}
                            {
                                ...getFieldProps(
                                    'approver_id',
                                    {
                                        initialValue: [selectTaskApprovers.length ? selectTaskApprovers[0].value : ''],
                                        rules: [{ required: true }],
                                    }
                                )
                            }>
                        <List.Item arrow="horizontal">审批人：</List.Item>
                    </Picker>
                }

                {/*{手风琴模式}*/}

                {/*<Accordion>*/}
                {/*<Accordion.Panel*/}
                {/*header={`审批人:      ${label ? label : appList[0].label}`}>*/}
                {/*<List>*/}
                {/*{*/}
                {/*appList.map((v, i) => {*/}
                {/*return (*/}
                {/*<List.Item onClick={() => this.selectItem(v.label)}*/}
                {/*key={i}>{v.label}</List.Item>*/}
                {/*)*/}
                {/*})*/}
                {/*}*/}
                {/*<List.Item onClick={*/}
                {/*() => {*/}
                {/*navigator.push({*/}
                {/*screen: 'ApprovedManList',*/}
                {/*title: '审批人'*/}
                {/*})*/}
                {/*}*/}
                {/*}>{'其他审批人'}</List.Item>*/}
                {/*</List>*/}
                {/*</Accordion.Panel>*/}
                {/*</Accordion>*/}

                {/*{标签模式}*/}

                {/*<Tabs activeKey={activeKey}*/}
                {/*onTabClick={(activeKey) => {*/}
                {/*this.setState({*/}
                {/*activeKey,*/}
                {/*value: activeKey == 'approver' ? appList[0].value : '',*/}
                {/*valueOther: activeKey == 'otherApprover' ? otherList[0].value : '',*/}
                {/*})*/}
                {/*}}*/}
                {/*activeTextColor={gColors.brandPrimary}*/}
                {/*activeUnderlineColor={gColors.brandPrimary}*/}
                {/*>*/}
                {/*<TabPane tab={'审批人'} key="approver">*/}
                {/*{*/}
                {/*appList.map((v, i) => (*/}
                {/*// selectTaskApprovers && selectTaskApprovers.map((v, i) => (*/}
                {/*<RadioItem key={v.value} checked={value ? value == v.value ? true : false : i == 0}*/}
                {/*onChange={() => this.onChange(v.value)}>*/}
                {/*{v.label}*/}
                {/*</RadioItem>*/}
                {/*))*/}
                {/*}*/}

                {/*</TabPane>*/}
                {/*<TabPane tab={'其他审批人'} key="otherApprover">*/}
                {/*{*/}
                {/*otherList.map((v, i) => (*/}
                {/*<RadioItem key={v.value}*/}
                {/*checked={valueOther ? valueOther == v.value ? true : false : i == 0}*/}
                {/*onChange={() => this.onChangeOther(v.value)}*/}
                {/*>*/}
                {/*{v.label}*/}
                {/*</RadioItem>*/}
                {/*))*/}
                {/*}*/}
                {/*</TabPane>*/}
                {/*</Tabs>*/}

                <WhiteSpace/>

                <TextareaItem
                    {
                        ...getFieldProps('remark', {
                            initialValue: '',
                        })
                    }
                    rows={5}
                    placeholder="备注："
                    count={100}
                >
                </TextareaItem>

                <WhiteSpace/>

                <WingBlank>
                    <Flex justify="between">
                        <Button style={styles.button} type="primary" onClick={() => {
                            this.onSubmit('A')
                        }}>
                            同意
                        </Button>
                        <Button style={styles.button} onClick={() => {
                            this.onSubmit('R')
                        }}>
                            不同意
                        </Button>
                    </Flex>
                </WingBlank>
                <WhiteSpace/>
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
        height: 30,
        lineHeight: 30,
        width: 150,
        fontSize: 14,
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