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
import ApprovingButton from './approvingButton'
import ApprovingHistory from './approvingHistory'


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

        let { personaldataDetailData } = props.True;
        personaldataDetailData = personaldataDetailData ? personaldataDetailData : {};

        this.state = {
            ...personaldataDetailData,
            dob: personaldataDetailData.dob ?
                format(new Date(personaldataDetailData.dob).getTime(), 'yyyy-MM-dd') : '',
            old_dob: personaldataDetailData.old_dob ?
                format(new Date(personaldataDetailData.old_dob).getTime(), 'yyyy-MM-dd') : '',
        }
    }

    onSubmit = (status) => {
        const { form, True, navigator } = this.props;
        const { selectTask } = True;

        //status, func_id, func_dtl, key, remark, approver_id

        form.validateFields(async (err, values) => {
            console.log('err', err, values);

            if (!err) {//将对应的时间进行格式化
                const {
                    remark,
                    approver_id
                } = values;
                Toast.loading('loading');
                await True.taskSubmitApiAction(
                    status, selectTask.func_id,selectTask.func_dtl,selectTask.key,
                    remark, approver_id && approver_id[0],
                    () => {
                        navigator.push({
                            screen: 'Task',
                            title: '任务'
                        })
                    });

            }
        });
    }

    // componentWillMount() {//请求审核人列表
    //     // let { User, True } = this.props;
    //     // let { personaldataDetailData } = True;
    //     // let { activeKey } = personaldataDetailData || {};
    //     // if (activeKey == 'PE') {
    //     //     User.getApprover();
    //     // }
    // }

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

    transGender = (sex) => {
        let gender = '';
        switch (sex) {
            case 'M':
                gender = '男';
                break;
            case 'F':
                gender = '女';
                break;
            default:
        }
        return gender;
    }

    render() {
        let { True, form, User, } = this.props;
        const { getFieldProps } = form;
        const { selectTaskApprovers } = True;
        // const { personaldataDetailData } = True;
        // this.renderAllObj(personaldataDetailData);

        const {
            prc_former_name,
            old_prc_former_name,
            sex,
            old_sex,
            dob,
            old_dob,
            prc_np_province_city_desc,
            old_prc_np_province_city_desc,
            prc_nationality_desc,
            old_prc_nationality_desc,
            old_prc_political_status_desc,
            prc_political_status_desc,
            remark,
            message,
            comments,
            is_last_approve,
            activeKey,
            img
        } = this.state;
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
                            {prc_former_name}
                        </Text>
                        <Brief style={styles.brief}>{message}</Brief>
                    </List.Item>

                    {
                        this.renderNameItem(prc_former_name, old_prc_former_name, '别名')
                    }
                    {
                        this.renderNameItem(this.transGender(sex), this.transGender(old_sex), '性别')
                    }
                    {
                        this.renderNameItem(dob, old_dob, '生日')
                    }
                    {
                        this.renderNameItem(prc_np_province_city_desc, old_prc_np_province_city_desc, '籍贯')
                    }
                    {
                        this.renderNameItem(prc_nationality_desc, old_prc_nationality_desc, '民族')
                    }
                    {
                        this.renderNameItem(prc_political_status_desc, old_prc_political_status_desc, '政治面貌')
                    }
                    {
                        this.renderNameItem('其他字段值等', '其他字段', '其他字段')
                    }

                    {
                        activeKey == 'PE' && is_last_approve != 1 && <ApprovingButton></ApprovingButton>
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