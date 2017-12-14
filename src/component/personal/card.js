/**
 * 银行卡信息
 */

import React, { Component } from 'react';

import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {List} from 'antd-mobile';

import { inject, observer } from 'mobx-react/native';
import {Item, NoticeBarMessage, ImgList} from './common';
import TitleButton from './common/cardTittleButton';

@inject('User')
@observer
export default class Index extends Component{
    static navigationOptions = ({ navigation }) => ({
        title:'支付账户',
        headerRight: (
            <TitleButton navigation={navigation}/>
        ),
    });
    constructor(props) {
        super(props);
    }
    componentWillMount() {

        //请求紧急号码信息
        this.props.User.getBankAccount();

    }
    render() {
        const {bankCard} = this.props.User;
        let bankName = '', //银行名称
            branchBank = '', //分行名称
            cardNum = '', //账号
            owner = '', //持卡人
            status = '',
            attachment = '';
        if(bankCard) {
            bankName = bankCard.bank_desc;
            branchBank = bankCard.prc_branch;
            cardNum = bankCard.bank_account_id;
            owner = bankCard.payee_name;
            status = bankCard.status;
            attachment = bankCard.attachment;
        }
        return(
            <ScrollView style={{backgroundColor:'#fff'}}>
                <NoticeBarMessage status={status}/>
                <Item name="银行：" text={bankName}/>
                <Item name="分行名称：" text={branchBank}/>
                <Item name="账户号码：" text={cardNum}/>
                <Item name="持卡人：" text={owner}/>
                {
                    attachment?
                        ImgList(attachment):
                        null
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#878787',
        lineHeight: 30,
        marginLeft: 10
    },
})