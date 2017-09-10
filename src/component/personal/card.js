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

import { Flex, Radio, Checkbox, WingBlank, Icon,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

@inject('User')
@observer
export default class Index extends Component{
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentWillMount() {
        //设置头部
        this.props.navigator.setButtons({
            rightButtons: [{
                title: '编辑', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }], // see "Adding buttons to the navigator" below for format (optional)
            animated: false // does the change have transition animation or does it happen immediately (optional)
        });
        //请求紧急号码信息
        this.props.User.getBankAccount();
    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditCard',
                    title: '编辑地址'
                })
            }
        }
    }
    render() {
        const {bankCard} = this.props.User;
        let bankName = '', //银行名称
            branchBank = '', //分行名称
            cardNum = '', //账号
            owner = ''; //持卡人
        if(bankCard) {
            bankName = bankCard.bank_desc;
            branchBank = bankCard.prc_branch;
            cardNum = bankCard.bank_account_id;
            owner = bankCard.payee_name;
        }
        return(
            <View>
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