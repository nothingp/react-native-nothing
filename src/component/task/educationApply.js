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
    DatePicker,
    ImagePicker,
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import ApprovingButton from './approvingButton'
import ApprovingHistory from './approvingHistory'

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderAttachment, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {
    constructor(props) {
        super(props);

        /**
         初等教育：小学；
         中等教育：初级中学，高级中学（普通高级中学，职业高中，中等专业学校，技工学校）；
         高等教育：大学专科，大学本科 ，硕士研究生，博士研究生；
         [
         {"edu_type":"DOC","edu_type_desc":"Doctor"},
         {"edu_type":"MAS","edu_type_desc":"Master"},
         {"edu_type":"DEG","edu_type_desc":"Degree"},
         {"edu_type":"DIP","edu_type_desc":"Diploma"},
         {"edu_type":"HDI","edu_type_desc":"Higher Diploma"},
         {"edu_type":"SEC","edu_type_desc":"Secondary"},
         {"edu_type":"PRI","edu_type_desc":"Primary"}
         ]
         */
    }

    static navigationOptions = ({ navigation }) => ({
        title: '教育经历审批'
    });

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.educationDetailApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.educationDetail = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    changeEduType = (type) => {
        let txt = '';
        switch (type) {
            case 'Doctor':
                txt = '博士';
                break;
            case "Master":
                txt = '硕士';
                break;
            case "Degree":
                txt = '本科';
                break;
            case "Diploma":
                txt = '专科';
                break;
            case "Higher Diploma":
                txt = '高中';
                break;
            case "Secondary":
                txt = '初中';
                break;
            case "Primary":
                txt = '小学';
                break;

        }
        return txt;
    }

    render() {
        const { True, navigation } = this.props;
        const { educationDetail, activeKey } = True;

        const {
            to_year,
            old_to_year,
            edu_type_desc,
            old_edu_type_desc,
            old_from_year,
            institude_name,
            old_institude_name,
            course,
            old_course,
            from_year,
            country_desc,
            old_country_desc,
            old_cert_filename,
            cert_filename,
            remark,
            message,
            comment,
            comments,
            is_last_approve,

            name,
            user_photo,
            position,
        } = educationDetail || {};

        return (
            <ScrollView>
                <List>

                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }

                    {

                        renderNameItem(
                            from_year ? format(new Date(from_year).getTime(), 'yyyy-MM-dd') : '',
                            old_from_year ? format(new Date(old_from_year).getTime(), 'yyyy-MM-dd') : '',
                            '开始日期')
                    }

                    {
                        renderNameItem(
                            to_year ? format(new Date(to_year).getTime(), 'yyyy-MM-dd') : '',
                            old_to_year ? format(new Date(old_to_year).getTime(), 'yyyy-MM-dd') : '',
                            '结束日期')
                    }

                    {
                        renderNameItem(this.changeEduType(edu_type_desc), this.changeEduType(old_edu_type_desc), '教育类型')
                    }

                    {
                        renderNameItem(country_desc, old_country_desc, '所在地区')
                    }

                    {
                        renderNameItem(institude_name, old_institude_name, '学校/机构名称')
                    }

                    {
                        renderNameItem(course, old_course, '所学专业/课程')
                    }

                    {
                        renderNameItem(comment, '', '评论')
                    }

                    {
                        renderRemark(remark)
                    }

                    {
                        renderAttachment(cert_filename, old_cert_filename, this)
                    }

                    {
                        activeKey == 'PE' &&
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