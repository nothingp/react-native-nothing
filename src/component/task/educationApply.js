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
        let { True, navigation } = this.props;
        const { educationDetail } = True;

        const {
            name,
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
            activeKey,
            img
        } = educationDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(img, name, message)
                    }

                    {
                        from_year &&
                        renderNameItem(
                            format(new Date(from_year).getTime(), 'yyyy-MM-dd'),
                            old_from_year && format(new Date(old_from_year).getTime(), 'yyyy-MM-dd'),
                            '开始日期')
                    }

                    {
                        to_year &&
                        renderNameItem(
                            format(new Date(to_year).getTime(), 'yyyy-MM-dd'),
                            old_to_year && format(new Date(old_to_year).getTime(), 'yyyy-MM-dd'),
                            '结束日期')
                    }

                    {
                        edu_type_desc &&
                        renderNameItem(this.changeEduType(edu_type_desc), this.changeEduType(old_edu_type_desc), '教育类型')
                    }

                    {
                        country_desc &&
                        renderNameItem(country_desc, old_country_desc, '所在地区')
                    }

                    {
                        institude_name &&
                        renderNameItem(institude_name, old_institude_name, '学校/机构名称')
                    }

                    {
                        course &&
                        renderNameItem(course, old_course, '所学专业/课程')
                    }

                    {
                        comment && renderRemark(comment)
                    }

                    {
                        remark && renderRemark(remark)
                    }

                    {
                        cert_filename &&
                        renderAttachment(cert_filename, old_cert_filename)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigation={navigation} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length>0  && <ApprovingHistory comments={comments}></ApprovingHistory>
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
    image: {
        height: 100,
        width: 100,
    },
});

export default createForm()(Index);