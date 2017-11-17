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
    TouchableOpacity,
    StatusBar
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    SwipeAction,
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
import ApprovingButton from '../../personal/approvingButton';
import LeftTitleButton from './common/LeftTitleButton';
import ShowConfirm from '../../../component/ShowConfirm';

//引入第三方库
import { format } from '../../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        const { type } = navigation.state.params;
        let items = {
            type,
        }
        return {
            title: type == 'create' ? '报销申请' : '报销',
            // headerRight: (
            //     {/*<LeftTitleButton {...items}/>*/}
            // ),
        }
    };

    componentWillMount() {
        const { True, navigation } = this.props;
        True.selectTask = { function: 'CA', function_dtl: '' };
        True.claimsClaimitemsApiAction();
        const { type } = navigation.state.params;
        if (type != 'create') {
            True.claimsDetailsApplyApiAction();
        }
    }

    componentWillUnmount() {
    }

    getItemType = (type) => {
        let { claimsClaimitemsData } = this.props.True;
        const { claim_item } = claimsClaimitemsData;
        let item = '';
        claim_item && claim_item.map((v, i) => {
            if (v.item_code == type) {
                item = v.item_name;
            }
        })
        return item;
    }

    onClick = (v) => {
        let { True, navigation } = this.props;
        True.claimitem = v;
        navigation.navigate('ClaimsItemDetail');
    }

    onSubmit = (ifSave) => {
        const { form, True } = this.props;
        const { selectExp } = this.props.User;
        const { selectTask, selectApprover, claimsSubmitApiAction } = True;
        form.validateFields(async (err, values) => {
            const approver_id = selectApprover.value;
            if (!err) {
                //将对应的时间进行格式化
                const {
                    bgn_date,
                    end_date,
                    pri_country_code,
                    pri_comp,
                    pri_position,
                    department,
                    pri_contact_person,
                    pri_contact_no,
                    exp_remark,
                    remark,
                } = values;
                if (!approver_id) {
                    Toast.info('请选择审批人');
                    return
                }
                const obj = {
                    bgn_date: bgn_date ? format(new Date(bgn_date).getTime(), 'yyyy-MM-dd') : '',
                    end_date: end_date ? format(new Date(end_date).getTime(), 'yyyy-MM-dd') : '',
                    pri_country_code: pri_country_code ? pri_country_code[0] : '',
                    pri_comp,
                    pri_position,
                    department,
                    pri_contact_person,
                    pri_contact_no,
                    exp_remark,
                    approver_id: approver_id ? approver_id[0] : '',
                    remark,
                    is_save: ifSave,
                }
                const { type } = this.props.navigation.state.params;
                const successFn = () => {
                    this.props.navigation.goBack();
                }
                //判断是保存还是修改
                if (type == 'edit') {
                    //修改
                    const { experience_tbl_approve_id, experience_tbl_id } = selectExp;

                    this.refs.confirm.show(
                        {
                            title: ifSave == '1' ? '保存' : '提交',
                            massage: ifSave == '1' ? '您确定保存工作经历吗？' : '您确定提交工作经历吗？',
                            okFn: () => {
                                claimsSubmitApiAction(data);
                            },
                        }
                    );

                } else {
                    //保存或者提交

                    this.refs.confirm.show(
                        {
                            title: ifSave == '1' ? '保存' : '提交',
                            massage: ifSave == '1' ? '您确定保存工作经历吗？' : '您确定提交工作经历吗？',
                            okFn: () => {
                                this.props.User.addWorkExp(obj, successFn);
                            },
                        }
                    );
                }
            }
            else {
                if (err.bgn_date) {
                    Toast.info('请选择开始时间');
                }
                else if (err.pri_comp) {
                    Toast.info('请填写公司名称');
                }
                else if (err.pri_position) {
                    Toast.info('请填写单位');
                }
            }

        });
    }

    render() {
        const { True, navigation } = this.props;
        const { type } = navigation.state.params;

        const { claimsDetailData, claimsRemoveApiAction } = True;
        const {
            submission_date,
            amount,
            claim_id,
            sequence,
            claimitems,
            status_desc,
            status,
            comment,
        } = claimsDetailData;

        return (
            <View style={{ overflow: 'scroll', height: '100%' }}>
                <ScrollView>
                    <List
                        renderHeader={
                            <Flex style={{
                                height: 50,
                                backgroundColor: '#ccc',
                                paddingLeft: 20,
                                paddingRight: 20
                            }}>
                                <Flex.Item style={{ flex: 2 }}>
                                    <Text style={{ color: '#333', fontSize: 16 }}>
                                        {`${format(submission_date, 'yyyy-MM-dd')} (共${amount}元）`}
                                    </Text>
                                </Flex.Item>
                                <Flex.Item style={{ alignItems: 'flex-end' }}>
                                    <Button
                                        style={{
                                            borderColor: '#ccc',
                                            backgroundColor: '#ccc',
                                            paddingLeft: 10,
                                            paddingRight: 10
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 16 }}>
                                            添加
                                        </Text>
                                    </Button>
                                </Flex.Item>
                            </Flex>
                        }
                    >
                        {
                            claimitems && claimitems.map((v, i) => {
                                return (
                                    <SwipeAction
                                        key={i}
                                        style={{ backgroundColor: '#e9e9ef' }}
                                        autoClose
                                        right={
                                            [
                                                {
                                                    text: '删除',
                                                    onPress: () => {
                                                        claimsRemoveApiAction(claim_id)
                                                    },
                                                    style: { backgroundColor: '#f00', color: 'white' },
                                                }
                                            ]
                                        }
                                        left={
                                            [
                                                {
                                                    text: '删除',
                                                    onPress: () => {
                                                        claimsRemoveApiAction(claim_id)
                                                    },
                                                    style: { backgroundColor: '#f00', color: 'white' },
                                                }
                                            ]
                                        }
                                    >
                                        <List.Item
                                            arrow="empty"
                                            extra={
                                                <Text style={{ fontSize: 14, color: '#888' }}>
                                                    {`${v.amount} 元`}
                                                </Text>
                                            }
                                            onClick={
                                                () => {
                                                    this.onClick(v)
                                                }
                                            }
                                        >
                                            <Flex>
                                                <Flex.Item>
                                                    {
                                                        <Button style={styles.mybutton}>
                                                            <Text style={styles.mytext}>收据</Text>
                                                        </Button>
                                                    }
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text style={{ fontSize: 14, color: '#888' }}>
                                                        {format(v.as_of_date, 'yyyy-MM-dd') + ' '}
                                                    </Text>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text style={{ fontSize: 14 }}>
                                                        {this.getItemType(v.claim_item)}
                                                    </Text>
                                                </Flex.Item>
                                            </Flex>
                                        </List.Item>
                                    </SwipeAction>
                                )
                            })
                        }
                    </List>

                    <ApprovingButton/>

                    {
                        type == 'CREATE' || status == 'S' ?
                            <View style={{ backgroundColor: '#fff' }}>
                                <WhiteSpace size="sm"/>
                                <Flex>
                                    <Flex.Item>
                                        <WingBlank>
                                            <Button
                                                type="primary"
                                                onClick={
                                                    () => {
                                                        this.onSubmit(1)
                                                    }
                                                }
                                            >
                                                保存
                                            </Button>
                                        </WingBlank>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <WingBlank>
                                            <Button
                                                type="primary"
                                                onClick={
                                                    () => {
                                                        this.onSubmit(0)
                                                    }
                                                }
                                            >
                                                提交
                                            </Button>
                                        </WingBlank>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="sm"/>
                            </View> :
                            null
                    }

                </ScrollView>
                <ShowConfirm ref="confirm"/>
            </View>
        )
    }
}

export default createForm()(Index);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mybutton: {
        width: 50,
        height: 25,
        borderColor: '#3b99fc',
        paddingLeft: 0,
        paddingRight: 0
    },
    mytext: {
        fontSize: 14,
        color: '#3b99fc'
    }
});
