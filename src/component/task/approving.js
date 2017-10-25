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

    constructor(props) {
        super(props);

        let { personaldataDetailData } = props.True;
        personaldataDetailData = personaldataDetailData ? personaldataDetailData : {};

        this.state = {
            ...personaldataDetailData,
            dob: personaldataDetailData.dob && new Date(personaldataDetailData.dob).getTime() ?
                format(new Date(personaldataDetailData.dob).getTime(), 'yyyy-MM-dd') : '',
            old_dob: personaldataDetailData.old_dob && new Date(personaldataDetailData.old_dob).getTime() ?
                format(new Date(personaldataDetailData.old_dob).getTime(), 'yyyy-MM-dd') : '',
        }
    }

    render() {
        let { navigation } = this.props;

        const {
            name,
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

                    {
                        renderHeadIconItem(img, name, message)
                    }

                    {
                        prc_former_name &&
                        renderNameItem(prc_former_name, old_prc_former_name, '别名')
                    }
                    {
                        sex &&
                        renderNameItem(transGender(sex), transGender(old_sex), '性别')
                    }
                    {
                        dob &&
                        renderNameItem(dob, old_dob, '生日')
                    }
                    {
                        prc_np_province_city_desc &&
                        renderNameItem(prc_np_province_city_desc, old_prc_np_province_city_desc, '籍贯')
                    }
                    {
                        prc_nationality_desc &&
                        renderNameItem(prc_nationality_desc, old_prc_nationality_desc, '民族')
                    }
                    {
                        prc_political_status_desc &&
                        renderNameItem(prc_political_status_desc, old_prc_political_status_desc, '政治面貌')
                    }
                    {
                        prc_health_condition &&
                        renderNameItem(prc_health_condition, old_prc_health_condition, '健康状况')
                    }
                    {
                        marital_status_desc &&
                        renderNameItem(marital_status_desc, old_marital_status_desc, '婚姻状况')
                    }
                    {
                        prc_major &&
                        renderNameItem(prc_major, old_prc_major, '所学专业')
                    }
                    {
                        prc_education_desc &&
                        renderNameItem(prc_education_desc, old_prc_education_desc, '文化程度')
                    }
                    {
                        prc_grade_gettime &&
                        renderNameItem(
                            format(prc_grade_gettime, 'yyyy-MM-dd'),
                            old_prc_grade_gettime ? format(old_prc_grade_gettime, 'yyyy-MM-dd') : '',
                            '毕业时间')
                    }

                    {
                        prc_employment_gettime &&
                        renderNameItem(format(prc_employment_gettime, 'yyyy-MM-dd'),
                            old_prc_employment_gettime ? format(old_prc_employment_gettime, 'yyyy-MM-dd') : '', '入职时间')
                    }

                    {
                        prc_grade && renderNameItem(prc_grade, old_prc_grade, '职称等级')
                    }

                    {
                        comp_email &&
                        renderNameItem(comp_email, old_comp_email, '公司邮箱')
                    }
                    {
                        pers_email &&
                        renderNameItem(pers_email, old_pers_email, '个人邮箱')
                    }
                    {
                        mobile_no &&
                        renderNameItem(mobile_no, old_mobile_no, '手机号码')
                    }
                    {
                        office_no &&
                        renderNameItem(office_no, old_office_no, '办公电话')
                    }
                    {
                        home_no && renderNameItem(home_no, old_home_no, '住宅电话')
                    }
                    {
                        prc_qq &&
                        renderNameItem(prc_qq, old_prc_qq, 'QQ')
                    }

                    {
                        remark && renderRemark(remark)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length > 0 && <ApprovingHistory comments={comments}></ApprovingHistory>
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