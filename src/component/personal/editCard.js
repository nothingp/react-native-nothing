/**
 * 查看地址页面
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
    Image,
    TouchableOpacity
} from 'react-native';

import { Flex, WingBlank, WhiteSpace, Toast,Icon,Button,List,NavBar,InputItem,Picker,TextareaItem, ActionSheet } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
//import { Navigation } from 'react-native-navigation';
import districtList from '../../const/district';
import ImagePicker from 'react-native-image-picker';

@inject('User', 'Common')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgInfo: '', //附件图片信息
        }
        this.onSubmit = () => {
            const { form } = this.props;

            form.validateFields(async (err, values) => {
                const {imgInfo} = this.state;

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        bank_code,
                        prc_branch,
                        bank_account_id,
                        payee_name,
                        remark,
                        approver_id
                    } = values;
                    //将图片上传，获取到图片路径
                    const obj = {
                        bank_code: bank_code[0],
                        prc_branch,
                        bank_account_id,
                        payee_name,
                        attachment: imgInfo.data,
                        remark,
                        approver_id
                    }
                    await this.props.User.saveCardInfo(obj);
                }
                else {
                    if (err.bank_code) {
                        Toast.info('请选择银行');
                    }
                    else if (err.bank_account_id) {
                        Toast.info('请填写卡号');
                    }
                    else if (err.payee_name) {
                        Toast.info('请填写持卡人');
                    }
                    else if (err.approver_id) {
                        Toast.info('请选择审批人');
                    }
                }

            });
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();
        //获取银行列表
        this.props.Common.getBankList();
        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {bankList} = this.props.Common;
        const {bankCard, approverList} = this.props.User;
        const {imgInfo} = this.state;

        var options = {
            title: 'Select Avatar'
        };
        let bank_code = '',
            prc_branch = '',
            bank_account_id = '',
            payee_name = '',
            attachment = '',
            remarks = ''; //备注信息

        if(bankCard){
            bank_code = bankCard.bank_code;
            prc_branch = bankCard.prc_branch;
            bank_account_id = bankCard.bank_account_id;
            payee_name = bankCard.payee_name;
            attachment = bankCard.attachment;
            remarks = bankCard.remarks;
        }
        return (
            <ScrollView>
                <Picker
                    extra="请选择"
                    {
                        ...getFieldProps(
                            'bank_code',
                            {
                                initialValue: bank_code? [bank_code]: [],
                                rules: [{required: true}],
                            }
                        )
                    }
                    cols={1}
                    data={bankList}
                >
                    <List.Item arrow="horizontal">银行：</List.Item>
                </Picker>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_branch',
                            {
                                initialValue: prc_branch,
                                rules: [{required: true}],
                            }
                        )
                    }
                >分行名称：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'bank_account_id',
                            {
                                initialValue: bank_account_id,
                                rules: [{required: true}],
                            }
                        )
                    }
                >卡号：</InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'payee_name',
                            {
                                initialValue: payee_name,
                                rules: [{required: true}],
                            }
                        )
                    }
                >持卡人：</InputItem>
                <Picker data={approverList} cols={1}
                        {
                            ...getFieldProps(
                                'approver_id',
                                {
                                    initialValue: [approverList.length?approverList[0].value: ''],
                                    rules: [{required: true}],
                                }
                            )
                        }>
                    <List.Item arrow="horizontal">审批人：</List.Item>
                </Picker>
                <List renderHeader={() => '附件'}>
                    <TouchableOpacity onPress={() => {
                        const BUTTONS = ['相册', '拍照', '取消'];
                        ActionSheet.showActionSheetWithOptions({
                            options: BUTTONS,
                            cancelButtonIndex: BUTTONS.length - 1
                        },(buttonIndex) => {
                            if(buttonIndex==0){
                                ImagePicker.launchImageLibrary(options, (response)  => {
                                    // this.props.User.updateUserPhoto(response);
                                    this.setState({
                                        imgInfo: response
                                    })
                                });
                            }else if(buttonIndex==1){
                                ImagePicker.launchCamera(options, (response)  => {
                                    // this.props.User.updateUserPhoto(response);
                                    this.setState({
                                        imgInfo: response
                                    })
                                });
                            }

                        });
                    }}>
                        {
                            imgInfo?
                                <Image style={styles.image} source={{uri: imgInfo.uri}}/>:
                                <View style={styles.image}>
                                    <Icon type={'\ue910'} style={{fontSize: 50}}/>
                                </View>

                        }
                    </TouchableOpacity>
                </List>

                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: remarks,
                            })
                        }
                        rows={5}
                        count={100}
                    />
                </List>
                <WhiteSpace size="xl"/>
                <WingBlank>
                    <Button type="primary" onClick={this.onSubmit}>保存</Button>
                </WingBlank>
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
    listName: {
        width: 70,
    },
    listTitle: {
        fontSize: 18
    },
    button: {
        borderColor: '#dddddd',
        borderStyle: 'solid',
        borderTopWidth: 1/PixelRatio.get(),
    },
    list: {
        height:15
    },
    radio: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        marginRight: 10,
        borderRadius: 10,
        fontSize: 10,
    },
});

export default createForm()(Index);