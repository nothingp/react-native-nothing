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
import ImgViewer from '../../component/ImgViewer';
import TextAreaLike from '../TextAreaLike';

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
        const { True } = this.props;
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
                                <List key={i}>
                                    <List.Item
                                        arrow="empty"
                                        extra={
                                            v.receipt ?
                                                <Button
                                                    style={styles.mybutton}
                                                    activeStyle={styles.mybutton}
                                                    onPressIn={
                                                        () => {
                                                            this.refs.img.show(v.receipt)
                                                        }
                                                    }
                                                >
                                                    <Icon type={'\ue676'} color={'#00f'} size={'xxs'}/>
                                                </Button>
                                                :
                                                <View style={styles.mybutton}>
                                                </View>
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
                                                    {v.claim_item_desc}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1.5 }}>
                                                <Text style={styles.listText}>
                                                    {`${v.amount} 元`}
                                                </Text>
                                            </View>
                                        </View>
                                    </List.Item>
                                </List>
                            )
                        })
                    }

                    <View style={{ paddingLeft: 12, height: 20 }}>
                        <Text>报销备注：</Text>
                    </View>
                    <TextAreaLike
                        rows={5}
                        editable={false}
                        value={comment}
                    />
                </List>

                {
                    activeKey == 'PE' &&
                    <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                }

                {
                    comments && comments.length > 0 && <ApprovingHistory comments={comments}></ApprovingHistory>
                }
                <ImgViewer ref="img"/>
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
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
        width: 30,
        height: 30,
        paddingLeft: 0,
        paddingRight: 0
    },
    listText: {
        fontSize: 14,
        color: '#888'
    },
});

export default createForm()(Index);