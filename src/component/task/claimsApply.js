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
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderAttachment, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        const { type } = navigation.state.params;
        return {
            title: type == 'apply' ? '报销审批'
                : type == 'record' ? '报销审批记录'
                    : '报销审批',
        }
    };

    componentWillMount() {
        const { True, User } = this.props;
        True.claimsClaimitemsApiAction();
        User.getPersonalInfo();
        True.claimsDetailsApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.claimsDetails = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
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

    render() {
        const { True, navigation } = this.props;
        const { claimsDetails, activeKey } = True;

        const {
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
            claimitemsv2,
            submission_date,
            amount,

            name,
            user_photo,
            position,

        } = claimsDetails;

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }
                </List>


                <List
                    renderHeader={
                        `${submission_date ? format(submission_date, 'yyyy-MM-dd') : ''} (共${amount || 0}元）`
                    }
                >
                    {
                        claimitemsv2 && claimitemsv2.map((v, i) => {
                            return (
                                <List.Item
                                    arrow="empty"
                                    key={i}
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
                                        <Flex.Item style={{ flex: 1 }}>
                                            {
                                                v.receipt ?
                                                    <Button style={styles.mybutton}>
                                                        <Text style={styles.mytext}>收据</Text>
                                                    </Button>
                                                    : null
                                            }
                                        </Flex.Item>
                                        <Flex.Item style={{ flex: 2 }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#888',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {v.as_of_date ? format(v.as_of_date, 'yyyy-MM-dd') : ''}
                                            </Text>
                                        </Flex.Item>
                                        <Flex.Item style={{ flex: 2 }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {this.getItemType(v.claim_item)}
                                            </Text>
                                        </Flex.Item>
                                    </Flex>
                                </List.Item>
                            )
                        })
                    }
                </List>

                {
                    activeKey == 'PE' &&
                    <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                }

                {
                    comments && comments.length > 0 && <ApprovingHistory comments={comments}></ApprovingHistory>
                }
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mybutton: {
        width: 50,
        height: 25,
        borderColor: '#00f',
        paddingLeft: 0,
        paddingRight: 0
    },
    mytext: {
        fontSize: 14,
        color: '#00f'
    }
});

export default createForm()(Index);