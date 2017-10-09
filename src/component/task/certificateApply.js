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
import { renderNameItem, renderAttachment, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    componentWillMount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }

    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }

    render() {
        let { True, navigator } = this.props;
        const { certificateDetail } = True;

        const {
            name,
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
            activeKey,
            img
        } = certificateDetail || {};

        return (
            <ScrollView>
                <List>
                    {
                        renderHeadIconItem(img, name, message)
                    }

                    {
                        cert_desc &&
                        renderNameItem(cert_desc, old_cert_desc, '证书类型')
                    }

                    {
                        license_cert_no &&
                        renderNameItem(license_cert_no, old_license_cert_no, '证书编号')
                    }

                    {
                        valid_date &&
                        renderNameItem(format(valid_date), old_valid_date && format(old_valid_date), '生效日期')
                    }

                    {
                        expiry_date &&
                        renderNameItem(format(expiry_date), old_expiry_date && format(old_expiry_date), '过期日期')
                    }

                    {
                        cert_remark && renderNameItem(cert_remark, old_cert_remark, '证书备注')
                    }

                    {
                        remark && renderRemark(remark)
                    }

                    {
                        attach_path &&
                        renderAttachment(attach_path, old_attach_path)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigator={navigator} is_last_approve={is_last_approve}></ApprovingButton>
                    }

                    {
                        comments && comments.length>0 && <ApprovingHistory comments={comments}></ApprovingHistory>
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