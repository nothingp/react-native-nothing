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
    DatePicker,
    CheckboxItem
} from 'antd-mobile';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import { withNavigation } from 'react-navigation';
import { createForm } from 'rc-form';
import ShowConfirm from '../ShowConfirm';
import TextAreaLike from '../TextAreaLike';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;
const RadioItem = Radio.RadioItem;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    state = {
        showApprovers: false
    }

    onSubmit = (status) => {
        const { form, True, navigation, is_last_approve } = this.props;
        const { selectTask, selectApprover } = True;

        form.validateFields((err, values) => {
            console.log('err', err, values);
            if (!err) {
                const { remark } = values;
                const approver_id = selectApprover.value;
                if (is_last_approve != 1 && !approver_id) {
                    Toast.info('请选择审批人');
                    return;
                }
                this.refs.confirm.show(
                    {
                        title: '提交',
                        massage: status === 'A' ? '您确定要同意审批？' : '您确定要不同意审批？',
                        okFn: () => {
                            True.taskSubmitApiAction(
                                status,
                                selectTask.function,
                                selectTask.function_dtl,
                                selectTask.key,
                                remark,
                                approver_id,
                            );
                            navigation.goBack();
                        },
                    }
                );
            }
        });
    }

    onChange = (value, label) => {
        this.props.True.selectApproverAction({
            value,
            label
        })

        this.setState({
            showApprovers: false
        })
    }

    selectApprover = () => {
        const { showApprovers } = this.state;
        this.setState({
            showApprovers: !showApprovers
        })
    }

    render() {
        const { True, form, is_last_approve, navigation } = this.props;
        const { getFieldProps } = form;
        const { selectTaskApprovers, selectApprover } = True;
        const { value, label } = selectApprover;
        const { showApprovers } = this.state;

        return (
            <List>

                <WhiteSpace style={{ backgroundColor: '#f5f5f9' }}/>

                {
                    is_last_approve != 1 &&
                    <List>
                        <List.Item
                            arrow="down"
                            extra={label}
                            onClick={this.selectApprover}
                        >
                            审批人：
                        </List.Item>
                        {
                            showApprovers &&
                            label &&
                            selectTaskApprovers.map(i => (
                                <RadioItem
                                    key={i.value}
                                    checked={value === i.value}
                                    onChange={() => this.onChange(i.value, i.label)}
                                >
                                    {i.label}
                                </RadioItem>
                            ))
                        }
                        {
                            showApprovers &&
                            <List.Item
                                arrow="horizontal"
                                onClick={
                                    () => {
                                        True.managerApiAction();
                                        navigation.navigate('ApprovedManList');
                                        this.setState({
                                            showApprovers: false
                                        })
                                    }
                                }
                            >
                                其他审批人
                            </List.Item>
                        }
                    </List>
                }

                <TextAreaLike
                    {
                        ...getFieldProps('remark', {
                            initialValue: '',
                        })
                    }
                    rows={5}
                    placeholder={'备注：'}
                    count={100}
                />

                <WhiteSpace/>

                <WingBlank>
                    <Flex justify="between">
                        <Button
                            style={styles.button}
                            type="primary"
                            onClick={() => {
                                this.onSubmit('A')
                            }}
                        >
                            同意
                        </Button>
                        <Button
                            style={styles.button}
                            onClick={() => {
                                this.onSubmit('R')
                            }}
                        >
                            不同意
                        </Button>
                    </Flex>
                </WingBlank>

                <WhiteSpace/>

                <ShowConfirm ref="confirm"/>
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

export default withNavigation(createForm()(Index));