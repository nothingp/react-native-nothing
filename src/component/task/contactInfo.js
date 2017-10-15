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
//import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'
import ApprovingButton from './approvingButton';
import ApprovingHistory from './approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderHeadIconItem } from './common/index';

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    // componentWillMount() {
    //     this.props.navigator.toggleTabs({
    //         animated: false,
    //         to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
    //     });
    // }
    //
    // componentWillUnmount() {
    //     this.props.navigator.toggleTabs({
    //         animated: false,
    //         to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
    //     });
    // }

    render() {
        let { True, navigator } = this.props;
        const { emergencycontactDetail } = True;

        let {
            name,
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
                    {
                        renderHeadIconItem(img, name, message)
                    }

                    {
                        relate_type_desc &&
                        renderNameItem(relate_type_desc, old_relate_type_desc, '关系')
                    }
                    {
                        chinese_name &&
                        renderNameItem(chinese_name, old_chinese_name, '姓名')
                    }
                    {
                        contact_no &&
                        renderNameItem(contact_no, old_contact_no, '电话')
                    }
                    {
                        prc_age &&
                        renderNameItem(prc_age, old_prc_age, '年龄')
                    }
                    {
                        prc_work_unit && renderNameItem(prc_work_unit, old_prc_work_unit, '工作单位及职务')
                    }

                    {
                        renderRemark(remark)
                    }

                    {
                        activeKey == 'PE' &&
                        <ApprovingButton navigator={navigator} is_last_approve={is_last_approve}></ApprovingButton>
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