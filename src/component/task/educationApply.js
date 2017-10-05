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

    changeEduType = (type) => {
        let { True } = this.props;
        let { educationTypeData } = True;
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

    onSubmit = () => {
        const { form, True, navigator } = this.props;
        const { status, key } = True.educationDetailData || {};

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
                    'ED',
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
        let { educationDetailData } = True;
        let { activeKey } = educationDetailData || {};
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

    renderCommentsList = (comments, is_last_approve, activeKey) => {
        if (activeKey == 'PE' && is_last_approve != 1) {
            return;
        }
        return <List renderHeader={() => '审批记录'}>
            {
                comments && comments.map((v, i) => {
                    return (
                        <View key={i}>
                            <WingBlank size="lg">
                                <Flex justify="between">
                                    <Flex.Item>
                                        <Text style={styles.title}>
                                            {`${v.approver} (${v.emp_id})`}
                                        </Text>
                                    </Flex.Item>
                                    <Flex.Item>
                                        {
                                            v.status == 'A' ?
                                                <Text style={{ color: '#5ade00', textAlign: 'right' }}>
                                                    同意
                                                </Text>
                                                :
                                                <Text style={{ color: '#f00', textAlign: 'right' }}>
                                                    不同意
                                                </Text>
                                        }
                                    </Flex.Item>
                                </Flex>

                                <WhiteSpace size="lg"/>

                                <Flex justify="between">
                                    <Flex.Item>
                                        <Text>
                                            {v.comment}
                                        </Text>
                                    </Flex.Item>

                                    <Flex.Item>
                                        <Text style={{ textAlign: 'right' }}>
                                            {v.approve_date && format(v.approve_date, 'yyyy-MM-dd')}
                                        </Text>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace size="lg"/>
                            </WingBlank>

                        </View>

                    )
                })
            }
        </List>
    }

    render() {
        let { True, form, User,navigator } = this.props;
        const { getFieldProps } = form;
        const { approverList } = User;
        const { educationDetailData } = True;

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
        } = educationDetailData || {};

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
                            {name}
                        </Text>
                        <Brief style={styles.brief}>{message}</Brief>
                    </List.Item>

                    {
                        this.renderNameItem(from_year, old_from_year, '开始日期')
                    }
                    {
                        this.renderNameItem(to_year, old_to_year, '结束日期')
                    }
                    {
                        edu_type_desc &&
                        this.renderNameItem(this.changeEduType(edu_type_desc), this.changeEduType(old_edu_type_desc), '教育类型')
                    }
                    {
                        country_desc &&
                        this.renderNameItem(country_desc, old_country_desc, '所在地区')
                    }
                    {
                        institude_name &&
                        this.renderNameItem(institude_name, old_institude_name, '学校/机构名称')
                    }
                    {
                        course &&
                        this.renderNameItem(course, old_course, '所学专业/课程')
                    }

                    <List.Item arrow="empty">
                        <Text style={styles.title}>
                            {`${'备注'} : ${remark}`}
                        </Text>
                    </List.Item>

                    {
                        cert_filename &&
                        <List.Item
                            arrow="empty"
                            extra={
                                this.renderIcon(cert_filename, old_cert_filename)
                            }
                        >
                            <Text style={styles.title}>
                                {`${'附件'} : ${comment}`}
                            </Text>
                            {/*<ImagePicker*/}
                            {/*files={[{*/}
                            {/*url: cert_filename,*/}
                            {/*id: '1',*/}
                            {/*}]}*/}
                            {/*selectable={false}*/}
                            {/*/>*/}
                            <Image style={styles.image} source={{ uri: cert_filename }}/>
                        </List.Item>
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
    image: {
        height: 100,
        width: 100,
    },
});

export default createForm()(Index);