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
import { NavigationActions } from 'react-navigation';

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
import RightTitleBtn from './common/RightTitleBtn';
import ShowConfirm from '../../../component/ShowConfirm';
import TextAreaLike from '../../../component/TextAreaLike';
import ImgViewer from '../../../component/ImgViewer';

//引入第三方库
import { format } from '../../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True', 'Base')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        const { info } = navigation.state.params;
        if (info.status == 'create') {
            return {
                title: '报销申请',
            }
        }
        return {
            title: '报销',
            headerRight: (
                <RightTitleBtn info={info} navigation={navigation}/>
            ),
        }
    };

    componentWillMount() {
        const { True, navigation } = this.props;
        const { info } = navigation.state.params;

        True.selectTask = { function: 'CA', function_dtl: '' };

        if (info.status != 'create' && !info.isEdit) {
            True.claimsDetailsApplyApiAction();
        }
    }

    componentWillUnmount() {
    }

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

    onSubmit = (ifSave) => {
        const { form, True, navigation, User, Base } = this.props;
        const info = navigation.state.params.info;
        const { selectApprover, claimsSubmitApiAction, claimsDetails, claimitemsList } = True;

        let { claimitemsv2 = [] } = claimsDetails;
        if (info.status == 'create') {//创建时，没有数据
            claimitemsv2 = claimitemsList;
        }

        const time = new Date().getTime();
        const month = format(time, 'yyyy-MM');

        let routeName = 'DailyMain';
        if (Base.userInfo) {
            if (Base.userInfo.is_manager == '1') {
                routeName = 'DailyAdminMain';
            }
        }

        form.validateFields(async (err, values) => {
            const approver_id = selectApprover.value;
            if (!approver_id) {
                Toast.info('请选择审批人');
                return;
            }

            if (!err) {
                const { remark } = values;

                let dataList = [];
                claimitemsv2.map((v, i) => {
                    const item = {
                        ...v,
                        item_code: v.claim_item,
                        unit: v.unit_code
                    };
                    const { claim_item, unit_code, ...rest } = item;//去掉无用参数
                    dataList.push({ ...rest });
                })

                let data = {
                    approver_id,
                    remark,
                    month,
                    is_save: ifSave.toString(),
                    data: dataList,
                    claim_id: claimsDetails.claim_id ? claimsDetails.claim_id : ''
                }

                this.refs.confirm.show(
                    {
                        title: ifSave == '1' ? '保存' : '提交',
                        massage: ifSave == '1' ? '您确定保存报销申请吗？' : '您确定提交报销申请吗？',
                        okFn: () => {
                            claimsSubmitApiAction(data, () => {
                                True.claimitemsList = [];
                                User.getClaimsList(month);
                                const resetAction = NavigationActions.reset({
                                    index: 1,
                                    actions: [
                                        NavigationActions.navigate({ routeName }),
                                        NavigationActions.navigate({ routeName: 'Reimbursement' }),
                                    ],
                                })
                                navigation.dispatch(resetAction);
                            });
                        },
                    }
                );
            }
        });
    }

    isCreateStatus = () => {
        const { navigation } = this.props;
        const info = navigation.state.params.info;
        const status = info.status == 'create' || info.status == 'S';
        return status;
    }

    render() {
        const { True, navigation, form } = this.props;
        const info = navigation.state.params.info;
        let { deleteClaimsItemAction, claimsDetails, claimitemsList } = True;
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

        if (info.status == 'create') {//创建时，没有数据
            submission_date = new Date().getTime();
            claimitemsv2 = claimitemsList;
        }

        let sum = 0;
        claimitemsv2.map((v, i) => {
            sum += Number(v.amount);
        })

        return (
            <View style={{ overflow: 'scroll', height: '100%' }}>
                <ScrollView>
                    {
                        this.isCreateStatus() ?
                            null
                            :
                            <NoticeBar>
                                {
                                    info.status == 'N' ? '您的报销申请已提交成功，等待审批中。' :
                                        info.status == 'C' ? '您已取消报销申请。' :
                                            info.status == 'P' ? '您的报销申请正在审批中。' :
                                                info.status == 'R' ? '您报销申请审批不通过。' :
                                                    info.status == 'A' ? '您报销申请已审批通过。' : ''
                                }
                            </NoticeBar>
                    }

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
                                        {`${submission_date ? format(submission_date, 'yyyy-MM-dd') : ''} (共${sum.toFixed(2)}元）`}
                                    </Text>
                                </Flex.Item>
                                <Flex.Item style={{ alignItems: 'flex-end' }}>
                                    {
                                        this.isCreateStatus() ?
                                            <Button
                                                style={{
                                                    borderColor: '#ccc',
                                                    backgroundColor: '#ccc',
                                                    paddingLeft: 10,
                                                    paddingRight: 10
                                                }}
                                                onClick={
                                                    () => {
                                                        navigation.navigate('AddClaims', { isEdit: true });
                                                    }
                                                }
                                            >
                                                <Text style={{ color: '#fff', fontSize: 16 }}>
                                                    添加
                                                </Text>
                                            </Button>
                                            : null
                                    }

                                </Flex.Item>
                            </Flex>
                        }
                    >
                        {
                            claimitemsv2.length > 0 ?
                                claimitemsv2.map((v, i) => {
                                    let item = this.isCreateStatus() ?
                                        <SwipeAction
                                            key={i}
                                            style={{ backgroundColor: '#e9e9ef' }}
                                            autoClose
                                            right={
                                                [
                                                    {
                                                        text: '删除',
                                                        onPress: () => {
                                                            this.refs.confirm.show(
                                                                {
                                                                    title: '删除',
                                                                    massage: '是否删除此报销项？',
                                                                    okFn: () => {
                                                                        deleteClaimsItemAction(i);
                                                                    },
                                                                }
                                                            );
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
                                                    <Button
                                                        style={styles.mybutton}
                                                        activeStyle={styles.mybutton}
                                                        onPressIn={
                                                            () => {
                                                                v.receipt ? this.refs.img.show(v.receipt) : ''
                                                            }
                                                        }
                                                    >
                                                        {
                                                            v.receipt ?
                                                                <Icon type={'\ue676'} color={'#00f'} size={'sm'}/>
                                                                : null
                                                        }
                                                    </Button>
                                                }
                                                onClick={
                                                    () => {
                                                        this.onClick(v)
                                                    }
                                                }
                                            >
                                                <View style={
                                                    {
                                                        width: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }
                                                }>
                                                    <View style={{ flex: 1.5 }}>
                                                        <Text style={styles.listText}>
                                                            {v.as_of_date ? format(parseInt(v.as_of_date), 'yyyy-MM-dd') : ''}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flex: 1.5 }}>
                                                        <Text style={styles.listText}>
                                                            {this.getItemType(v.claim_item || v.item_code)}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ fontSize: 14, color: '#888' }}>
                                                            {`${v.amount} 元`}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </List.Item>
                                        </SwipeAction> :
                                        <List.Item
                                            key={i}
                                            arrow="empty"
                                            extra={
                                                <Button
                                                    style={styles.mybutton}
                                                    activeStyle={styles.mybutton}
                                                    onPressIn={
                                                        () => {
                                                            v.receipt ? this.refs.img.show(v.receipt) : ''
                                                        }
                                                    }
                                                >
                                                    {
                                                        v.receipt ?
                                                            <Icon type={'\ue676'} color={'#00f'} size={'sm'}/>
                                                            : null
                                                    }
                                                </Button>
                                            }
                                            onClick={
                                                () => {
                                                    this.onClick(v)
                                                }
                                            }
                                        >
                                            <View style={
                                                {
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }
                                            }>
                                                <View style={{ flex: 1.5 }}>
                                                    <Text style={styles.listText}>
                                                        {v.as_of_date ? format(parseInt(v.as_of_date), 'yyyy-MM-dd') : ''}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1.5 }}>
                                                    <Text style={styles.listText}>
                                                        {this.getItemType(v.claim_item || v.item_code)}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 14, color: '#888' }}>
                                                        {`${v.amount} 元`}
                                                    </Text>
                                                </View>
                                            </View>
                                        </List.Item>
                                    return (
                                        item
                                    )
                                })
                                : null
                        }
                    </List>

                    {
                        this.isCreateStatus() ?
                            <ApprovingButton/>
                            : null
                    }

                    <List>
                        <TextAreaLike
                            {
                                ...getFieldProps('remark', {
                                    initialValue: comment ? comment : '',
                                })
                            }
                            placeholder="备注"
                            editable={this.isCreateStatus() ? true : false}
                            rows={5}
                            count={100}
                        />
                    </List>

                </ScrollView>

                {
                    this.isCreateStatus() ?
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
                        : null
                }
                <ShowConfirm ref="confirm"/>
                <ImgViewer ref="img"/>

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
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
        width: 30,
        paddingLeft: 0,
        paddingRight: 0
    },
    listText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888'
    },
});
