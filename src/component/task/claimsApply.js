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
            claim_id,
            claimitems,

            name,
            user_photo,
            position,

        } = claimsDetails;

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position)
                    }
                </List>


                <List renderHeader={'2017-03-22 (共150.00元）'}>
                    {
                        claimitems && claimitems.map((v, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    arrow="empty"
                                    extra={<Text style={{ fontSize: 14, color: '#888' }}>{v.amount + v.unit}</Text>}
                                    onClick={
                                        () => {
                                            console.log('log', 2222);
                                        }
                                    }
                                >
                                    <Text>
                                        <Text style={{ fontSize: 14, color: '#888' }}>
                                            {format(v.as_of_date, 'yyyy-MM-dd') + ' '}
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>
                                            {this.getItemType(v.claim_item)}
                                        </Text>
                                    </Text>
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

export default createForm()(Index);