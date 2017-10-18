/**
 * 银行卡信息
 */

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

import { Flex, Radio, Checkbox, WingBlank, Icon,Grid,Button,List,NoticeBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

@inject('User')
@observer
export default class Index extends Component{
    static navigationOptions = ({ navigation }) => ({
        title:'支付账户',
    });
    constructor(props) {
        super(props);
    }
    componentWillMount() {

        //请求紧急号码信息
        this.props.User.getBankAccount();

    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditCard',
                    title: '编辑银行卡信息'
                })
            }
        }
    }
    render() {
        const {bankCard} = this.props.User;
        let bankName = '', //银行名称
            branchBank = '', //分行名称
            cardNum = '', //账号
            owner = '', //持卡人
            status = '';
        if(bankCard) {
            bankName = bankCard.bank_desc;
            branchBank = bankCard.prc_branch;
            cardNum = bankCard.bank_account_id;
            owner = bankCard.payee_name;
            status = bankCard.status;
        }
        return(
            <View>
                {
                    status == 'N' || status == 'P' ?
                        <NoticeBar>
                            您的信息已经提交成功，等待审核中。
                        </NoticeBar>:
                        status == 'R'?
                            <NoticeBar>
                                您的信息已被拒绝，请重新完善信息。
                            </NoticeBar>:
                            null
                }
                <List>
                    <InputItem value={bankName? bankName: ''} editable={false}><Text style={styles.listName}>银行：</Text></InputItem>
                    <InputItem value={branchBank? branchBank: ''} editable={false}><Text style={styles.listName}>分行名称：</Text></InputItem>
                    <InputItem value={cardNum? cardNum: ''} editable={false}><Text style={styles.listName}>账户号码：</Text></InputItem>
                    <InputItem value={owner? owner: ''} editable={false}><Text style={styles.listName}>持卡人：</Text></InputItem>
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listName: {
        marginRight: 100,
        width: 150,
    },
});