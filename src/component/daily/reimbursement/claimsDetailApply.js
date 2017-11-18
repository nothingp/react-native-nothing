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
    NoticeBar
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
        return {
            title: '报销申请',
        }
    };

    // componentWillMount() {
    //     const { True } = this.props;
    //     True.selectTask = { function: 'CA', function_dtl: '' };
    //     True.claimsDetailsApplyApiAction();
    // }

    getItemType = (type) => {
        const { claimsClaimitemsData } = this.props.True;
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

    data = [];

    onSubmit = (ifSave) => {
        const { form, True } = this.props;
        const { selectApprover, claimsSubmitApiAction, claimsDetails } = True;

        form.validateFields(async (err, values) => {
            const approver_id = selectApprover.value;

            if (!err) {
                const { remark } = values;

                if (!approver_id) {
                    Toast.info('请选择审批人');
                    return
                }

                let data = {
                    approver_id: approver_id ? approver_id[0] : '',
                    remark,
                    month: format(new Date().getTime(), 'yyyy-MM'),
                    is_save: ifSave,
                    data: this.data,
                    claim_id: claimsDetails.claim_id
                }

                this.refs.confirm.show(
                    {
                        title: ifSave == '1' ? '保存' : '提交',
                        massage: ifSave == '1' ? '您确定保存报销申请吗？' : '您确定提交报销申请吗？',
                        okFn: () => {
                            claimsSubmitApiAction(data);
                        },
                    }
                );
            }
        });
    }

    render() {
        const { True, navigation, form } = this.props;
        const { claimsRemoveApiAction, claimsDetails, claimitemsList } = True;
        const { getFieldProps } = form;

        let {
            comment,
            status,
            status_desc,
            comments,
            is_last_approve,
            gl_seg1_label,
            gl_seg2_label,
            gl_seg3_label,
            gl_seg4_label,
            gl_seg5_label,

            gl_seq1_type,
            gl_seq2_type,
            gl_seq3_type,
            gl_seq4_type,
            gl_seq5_type,

            claim_id,
            claimitems,
            claimitemsv2 = [],
            submission_date,
            amount,

            name,
            user_photo,
            position,

        } = claimsDetails;

        this.data = [...claimitemsList, ...claimitemsv2];

        if (!submission_date && !amount) {//创建时，没有数据
            submission_date = new Date().getTime();
        }

        this.data.map((v, i) => {
            amount += Number(v.amount);
        })

        return (
            <View style={{ overflow: 'scroll', height: '100%' }}>
                <ScrollView>
                    <List
                        renderHeader={
                            <Flex
                                style={
                                    {
                                        height: 50,
                                        backgroundColor: '#ccc',
                                        paddingLeft: 20,
                                        paddingRight: 20
                                    }
                                }
                            >
                                <Flex.Item style={{ flex: 2 }}>
                                    <Text style={{ color: '#333', fontSize: 16 }}>
                                        {
                                            `${format(submission_date, 'yyyy-MM-dd')} (共${amount}元）`
                                        }
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
                                        onClick={
                                            () => {
                                                navigation.navigate('AddClaims');
                                            }
                                        }
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
                            this.data.length > 0 ?
                                this.data.map((v, i) => {
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
                                                        style: {
                                                            backgroundColor: '#f00',
                                                            color: 'white',
                                                        },
                                                    },
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
                                : null
                        }
                    </List>

                    <ApprovingButton/>

                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: comment ? comment : '',
                            })
                        }
                        placeholder="备注"
                        rows={5}
                        count={100}
                    />
                </ScrollView>

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
                </View>

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
