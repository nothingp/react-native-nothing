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
import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        const { form, True, navigator } = this.props;
        const { status, key } = True.emergencycontactDetail || {};

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
                    'PP',
                    'EC',
                    key,
                    remark,
                    approver_id && approver_id[0],
                    async () => {
                        await True.taskListAction();
                        navigator.push({
                            screen: 'Task',
                            title: '任务'
                        })
                    });

            }
        });
    }

    componentWillMount() {//请求审核人列表
        let { User, True } = this.props;
        let { emergencycontactDetail } = True;
        let { activeKey } = emergencycontactDetail || {};
        if (activeKey == 'PE') {
            User.getApprover();
        }
    }

    renderIcon = (txt, old_txt) => {
        let same = false;
        let diff = false;
        let add = false;

        if (!old_txt && txt) {
            add = true;
            return (
                <Icon type={'\ue630'} color={'#5ade00'}/>
            )
        }
        else if (old_txt && txt && old_txt != txt) {
            diff = true;
            return (
                <Text onPress={() => {
                    Toast.success('修改前：' + old_txt);
                }}>
                    <Icon type={'\ue631'} color={'#f59700'}/>
                </Text>

            )

        }
        else if (old_txt == txt) {
            same = true;
            return ''
        }
        return ''
    }

    renderNameItem = (txt, old_txt, name) => {
        return (
            <List.Item
                arrow="empty"
                extra={
                    this.renderIcon(txt, old_txt)
                }
            >
                <Text style={styles.title}>
                    {`${name} : ${txt}`}
                </Text>
            </List.Item>
        )
    }

    render() {
        let { True, form, User,navigator } = this.props;
        const { getFieldProps } = form;
        const { approverList } = User;
        const { emergencycontactDetail } = True;

        const {
            chinese_name,
            old_chinese_name,
            old_relate_type_desc,
            relate_type_desc,
            contact_no,
            old_contact_no,
            prc_age,
            old_prc_age,
            prc_work_unit,
            old_prc_work_unit,
            remark,
            message,
            comments,
            is_last_approve,
            activeKey,
            img
        } = emergencycontactDetail || {};

        return (
            <ScrollView>
                <List>
                    <List.Item
                        arrow="empty"
                        thumb={
                            img || <Icon type={'\ue6a8'}/>
                        }
                        multipleLine
                    >
                        <Text style={styles.title}>
                            {chinese_name}
                        </Text>
                        <Brief style={styles.brief}>{message}</Brief>
                    </List.Item>

                    {
                        this.renderNameItem(relate_type_desc, old_relate_type_desc, '关系')
                    }
                    {
                        this.renderNameItem(chinese_name, old_chinese_name, '姓名')
                    }
                    {
                        this.renderNameItem(contact_no, old_contact_no, '电话')
                    }
                    {
                        this.renderNameItem(prc_age, old_prc_age, '年龄')
                    }
                    {
                        prc_work_unit && this.renderNameItem(prc_work_unit, old_prc_work_unit, '工作单位及职务')
                    }

                    {
                        activeKey == 'PE' && <ApprovingButton navigator={navigator} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        activeKey == 'PD' && <ApprovingHistory comments={comments}></ApprovingHistory>
                    }
                </List>
            </ScrollView>

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