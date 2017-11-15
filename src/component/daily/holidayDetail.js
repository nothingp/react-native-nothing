/**
 * 查看地址页面
 */

import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { List,TextareaItem } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import {Item} from './common/index';
import TitleButton from './common/applyHolidayButton';
import {format} from '../../common/Tool';

@inject('User')
@observer
export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:'我的假期',
        headerRight: (
            <TitleButton navigation={navigation}/>
        ),
    });

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //请求个人的地址信息
        this.props.User.getHolidayDetail();
    }
    render() {
        const {selectLvDetail} = this.props.User
        let lv_type_desc = '',
            descStr = '',
            end_time_str = '',
            begin_time_str = '',
            dur_days = '',
            remark = '';
        if(selectLvDetail) {
            const fn = (str) => {
                //判断上午下午
                if(str == 'AM'){
                    return '上午';
                }
                else if(str == 'PM'){
                    return '下午';
                }
                else{
                    return selectLvDetail.begin_time_half;
                }
            }

            lv_type_desc = selectLvDetail.lv_type_desc;
            begin_time_str = format(parseInt(selectLvDetail.begin_time), 'yyyy-MM-dd') + fn(selectLvDetail.begin_time_half);
            end_time_str = format(parseInt(selectLvDetail.end_time), 'yyyy-MM-dd') + fn(selectLvDetail.end_time_half);
            dur_days = selectLvDetail.dur_days;
            remark = selectLvDetail.remark;
            // cardNum = bankCard.bank_account_id;
            // owner = bankCard.payee_name;
            // status = bankCard.status;
            // attachment = bankCard.attachment;
        }
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                <Item name="假期类型：" text={lv_type_desc}/>
                {
                    descStr?
                        <View style={styles.descView}>
                            <Text style={styles.descText}>
                                {descStr}
                            </Text>
                        </View>:
                        null

                }
                <Item name="开始时间：" text={begin_time_str}/>
                <Item name="结束时间：" text={end_time_str}/>
                <Item name="假期天数：" text={dur_days}/>

                <List renderHeader={() => '请假事由:'}>
                    <TextareaItem
                        value={remark}
                        editable={false}
                        rows={5}
                    />
                </List>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    descView: {
        height: 40,
        marginLeft: 15,
    },
    descText: {
        lineHeight: 40,
    }
})
