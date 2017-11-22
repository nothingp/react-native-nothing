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
import { renderNameItem, renderAttachment, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '证书审批'
    });

    componentWillMount() {
        const { True, User } = this.props;
        User.getPersonalInfo();
        True.certificateDetailApiAction();
    }

    componentWillUnmount() {
        const { True, User } = this.props;
        True.certificateDetail = {};

        if (True.selectTask.isMsg) {
            User.alertsList();
        } else {
            True.taskListAction();
        }
    }

    render() {
        const { True, navigation } = this.props;
        const { certificateDetail, activeKey } = True;

        const {
            cert_desc,
            old_cert_desc,
            license_cert_no,
            old_license_cert_no,
            expiry_date,
            old_expiry_date,
            old_attach_path,
            attach_path,
            valid_date,
            old_valid_date,
            remark,
            message,
            cert_remark,
            old_cert_remark,
            comments,
            is_last_approve,

            user_photo,
            name,
            position
        } = certificateDetail;

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }

                    {
                        renderNameItem(cert_desc, old_cert_desc, '证书类型')
                    }

                    {
                        renderNameItem(license_cert_no, old_license_cert_no, '证书编号')
                    }

                    {
                        renderNameItem(
                            valid_date ? format(valid_date, 'yyyy-MM-dd') : '',
                            old_valid_date ? format(old_valid_date, 'yyyy-MM-dd') : '',
                            '生效日期'
                        )
                    }

                    {
                        renderNameItem(
                            expiry_date ? format(expiry_date, 'yyyy-MM-dd') : '',
                            old_expiry_date ? format(old_expiry_date, 'yyyy-MM-dd') : '',
                            '过期日期'
                        )
                    }

                    {
                        renderNameItem(cert_remark, old_cert_remark, '证书备注')
                    }

                    {
                        renderRemark(remark)
                    }

                    {
                        renderAttachment(attach_path, old_attach_path, this)
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

export default createForm()(Index);