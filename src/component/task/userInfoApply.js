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
import ApprovingButton from './approvingButton'
import ApprovingHistory from './approvingHistory'

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, transGender, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '个人信息审批'
    });

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.personaldataDetailApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.personaldataDetailData = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    render() {
        const { navigation, True } = this.props;

        const { personaldataDetailData } = True;

        const {
            prc_former_name,
            old_prc_former_name,
            sex,
            old_sex,
            prc_grade,
            old_prc_grade,
            prc_major,
            old_prc_major,
            prc_education_desc,
            old_prc_education_desc,
            comp_email,
            old_comp_email,
            marital_status_desc,
            old_marital_status_desc,
            home_no,
            old_home_no,
            office_no,
            old_office_no,
            mobile_no,
            old_mobile_no,
            pers_email,
            old_pers_email,
            prc_grade_gettime,
            old_prc_grade_gettime,
            prc_employment_gettime,
            old_prc_employment_gettime,
            prc_health_condition,
            old_prc_health_condition,
            prc_qq,
            old_prc_qq,
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

            name,
            user_photo,
            position,

        } = personaldataDetailData;

        const dob = personaldataDetailData.dob && new Date(personaldataDetailData.dob).getTime() ?
            format(new Date(personaldataDetailData.dob).getTime(), 'yyyy-MM-dd') : '';

        const old_dob = personaldataDetailData.old_dob && new Date(personaldataDetailData.old_dob).getTime() ?
            format(new Date(personaldataDetailData.old_dob).getTime(), 'yyyy-MM-dd') : '';

        return (
            <ScrollView>
                <List>

                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }

                    {
                        renderNameItem(prc_former_name, old_prc_former_name, '昵称')
                    }

                    {
                        renderNameItem(transGender(sex), transGender(old_sex), '性别')
                    }

                    {
                        renderNameItem(dob, old_dob, '生日')
                    }

                    {
                        renderNameItem(prc_np_province_city_desc, old_prc_np_province_city_desc, '籍贯')
                    }
                    {
                        renderNameItem(prc_nationality_desc, old_prc_nationality_desc, '民族')
                    }
                    {
                        renderNameItem(prc_political_status_desc, old_prc_political_status_desc, '政治面貌')
                    }
                    {
                        // renderNameItem(prc_health_condition, old_prc_health_condition, '健康状况')
                    }
                    {
                        renderNameItem(marital_status_desc, old_marital_status_desc, '婚姻状况')
                    }
                    {
                        renderNameItem(prc_major, old_prc_major, '专业名称')
                    }
                    {
                        renderNameItem(prc_education_desc, old_prc_education_desc, '最高学历')
                    }
                    {
                        renderNameItem(
                            prc_grade_gettime ? format(prc_grade_gettime, 'yyyy-MM-dd') : '',
                            old_prc_grade_gettime ? format(old_prc_grade_gettime, 'yyyy-MM-dd') : '',
                            '毕业时间'
                        )
                    }

                    {
                        renderNameItem(
                            prc_employment_gettime ? format(prc_employment_gettime, 'yyyy-MM-dd') : '',
                            old_prc_employment_gettime ? format(old_prc_employment_gettime, 'yyyy-MM-dd') : '',
                            '入职时间'
                        )
                    }

                    {
                        // renderNameItem(prc_grade, old_prc_grade, '职称等级')
                    }

                    {
                        renderNameItem(comp_email, old_comp_email, '公司邮箱')
                    }
                    {
                        renderNameItem(pers_email, old_pers_email, '个人邮箱')
                    }
                    {
                        renderNameItem(mobile_no, old_mobile_no, '手机号码')
                    }
                    {
                        renderNameItem(office_no, old_office_no, '办公电话')
                    }
                    {
                        // renderNameItem(home_no, old_home_no, '住宅电话')
                    }
                    {
                        renderNameItem(prc_qq, old_prc_qq, 'QQ')
                    }

                    {
                        renderRemark(remark)
                    }

                    {
                        True.activeKey == 'PE' &&
                        <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}/>
                    }

                    {
                        comments && comments.length > 0 && <ApprovingHistory comments={comments}/>
                    }
                </List>
            </ScrollView>

        )
    }
}

export default createForm()(Index);