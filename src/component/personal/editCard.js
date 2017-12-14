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
    Image,
    TouchableOpacity
} from 'react-native';

import { WingBlank, WhiteSpace, Toast,Icon,Button,List,InputItem,Picker,TextareaItem, ActionSheet } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import ImagePicker from 'react-native-image-picker';
import {RequireData} from './common/index';
import ApprovingButton from './approvingButton';
import ShowConfirm from '../../component/ShowConfirm';
import ImgSelect from '../../component/ImgSelect';

@inject('User', 'Common','True')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:'编辑支付账户',
    });
    constructor(props) {
        super(props);
        let {bank_code,
            prc_branch,
            bank_account_id,
            payee_name,
            attachment,
            remarks} = this.props.User.bankCard || {}

        let imgArr = [];
        const doctorArr = attachment?attachment.split(','):[];
        doctorArr && doctorArr.map(info => {
            if(info != ''){
                imgArr.push({
                    uri: info,
                })
            }
        })
        this.state = {
            bank_code,
            prc_branch,
            bank_account_id,
            payee_name,
            remarks,
            imgArr
        }
        this.onSubmit = () => {
            const {imgArr} = this.state;
            const { form,True } = this.props;
            const {selectTask, selectApprover} = True;
            form.validateFields(async (err, values) => {
                const approver_id=selectApprover.value;
                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        bank_code,
                        prc_branch,
                        bank_account_id,
                        payee_name,
                        remark
                    } = values;
                    if(bank_code.length == 0){
                        Toast.info('请选择银行');
                        return
                    }
                    if(!approver_id){
                        Toast.info('请选择审批人');
                        return
                    }
                    //将图片上传，获取到图片路径
                    const obj = {
                        bank_code: bank_code[0],
                        prc_branch,
                        bank_account_id,
                        payee_name,
                        imgArr,
                        remark,
                        approver_id
                    }
                    const successFn = () => {
                        this.props.navigation.goBack()
                    }

                    this.refs.confirm.show(
                        {
                            title: '提交',
                            massage: '确定提交银行卡信息吗？',
                            okFn: () => {
                                this.props.User.saveCardInfo(obj, successFn);
                            },
                        }
                    );
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
                }

            });
        }

    }
    //选择图片
    onSelectImg = (imgArr) => {
        this.setState({
            imgArr,
        })
    }
    componentWillMount() {
        let { True, navigation } = this.props;
        True.selectTask = {function:'PP',function_dtl:'BA'};
        //请求审核人列表
        //this.props.User.getApprover();
        //获取银行列表
        this.props.Common.getBankList();
    }
    render() {
        const { getFieldProps } = this.props.form;
        const {bankList} = this.props.Common;
        const {bank_code, prc_branch, bank_account_id, payee_name, remarks, imgArr} = this.state;

        return (
            <View style={{overflow: 'scroll', height: '100%'}}>
                <ScrollView  style={{backgroundColor:'#fff'}}>
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
                        <List.Item arrow="horizontal"><RequireData require={true} text="银行:"/></List.Item>
                    </Picker>
                    <InputItem
                        {
                            ...getFieldProps(
                                'prc_branch',
                                {
                                    initialValue: prc_branch,
                                }
                            )
                        }
                    ><RequireData require={false} text="分行名称:"/></InputItem>
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
                    ><RequireData require={true} text="卡号:"/></InputItem>
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
                    ><RequireData require={true} text="持卡人:"/></InputItem>
                    <ImgSelect imgArr={imgArr} onSelect={this.onSelectImg}/>

                    <ApprovingButton/>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: remarks,
                            })
                        }
                        placeholder="备注"
                        rows={5}
                        count={100}
                    />
                </ScrollView>
                <View style={{backgroundColor: '#fff'}}>
                    <WhiteSpace size="sm"/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </WingBlank>
                    <WhiteSpace size="sm"/>
                </View>

                <ShowConfirm ref="confirm"/>
            </View>
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
        fontSize: 50,
        lineHeight: 80,
        marginLeft: 10
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