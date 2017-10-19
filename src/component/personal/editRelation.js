/**
 * 编辑联系人
 */

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { Flex, WingBlank, WhiteSpace, Toast,Button,List,InputItem,Picker,TextareaItem } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import TitleButton from './common/relationTitleButton';
import {RequireData} from './common/index';
import {NoticeBarMessage} from './common';

@inject('User', 'Common')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        const {type} = navigation.state.params;
        if(type && type == 'edit'){
            return {
                title:'编辑联系人',
                headerRight: (
                    <TitleButton navigation={navigation}/>
                ),
            }
        }else{
            return {
                title:'添加联系人',
            }
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
        //保存, 提交联系人信息
        this.onSave = async (str) => {

            const { form} = this.props;

            form.validateFields(async (err, values) => {

                if (!err) {
                    //将对应的时间进行格式化
                    const {
                        relate_type,
                        chinese_name,
                        contact_no,
                        prc_age,
                        prc_work_unit,
                        remark,
                        approver_id,
                    } = values;
                    //判断是保存还是修改
                    if(relate_type.length == 0){
                        Toast.info('请选择关系类型');
                        return
                    }
                    if(approver_id.length == 0){
                        Toast.info('请选择审批人');
                        return
                    }
                    const {type} = this.props.navigation.state;

                    if(type == 'edit'){
                        //判断是保存还是提交
                        const {relationship_tbl_id, relationship_tbl_approve_id} = this.props.User.selectPerson;

                        const obj = {
                            relationship_tbl_id,
                            relationship_tbl_approve_id,
                            relate_type: relate_type[0],
                            chinese_name,
                            contact_no,
                            prc_age,
                            prc_work_unit,
                            remark,
                            approver_id: approver_id[0],
                            is_save: str=='save'?1:0,
                        }
                        await this.props.User.saveRelationFn(obj);
                    }else{
                        const obj = {
                            relate_type: relate_type[0],
                            chinese_name,
                            contact_no,
                            prc_age,
                            prc_work_unit,
                            remark,
                            approver_id: approver_id[0],
                            is_save: str=='save'?1:0,
                        }
                        await this.props.User.addRelationFn(obj);
                    }
                }
                else {
                    if (err.relate_type) {
                        Toast.info('请选择关系类型');
                    }
                    else if (err.chinese_name) {
                        Toast.info('请填写联系人名字');
                    }
                    else if (err.approver_id) {
                        Toast.info('请填写审批人信息');
                    }
                }

            });
        }

    }
    componentWillMount() {
        //请求审核人列表
        this.props.User.getApprover();
        //请求联系人关系列表
        this.props.Common.getRelationShip();
        //如果编辑联系人，则请求该联系人的详细信息
        const {type} = this.props.navigation.state;

        if(type == 'edit'){
            const {selectPerson} = this.props.User;
            const {relationship_tbl_id, relationship_tbl_approve_id} = selectPerson;
            this.props.User.getSimplePersonInfo({relationship_tbl_id, relationship_tbl_approve_id});
        }

    }
    render() {
        const {type} = this.props.navigation.state;

        const { getFieldProps } = this.props.form;
        const {relationShipList} = this.props.Common;
        const {approverList, selectPerson} = this.props.User;
        let relate_type,
            chinese_name,
            contact_no,
            prc_age,
            prc_work_unit,
            remark,
            status = '';
        if(selectPerson && type == 'edit'){
            relate_type = selectPerson.relate_type;
            chinese_name = selectPerson.chinese_name;
            contact_no = selectPerson.contact_no;
            prc_age = selectPerson.prc_age;
            prc_work_unit = selectPerson.prc_work_unit;
            remark = selectPerson.remark;
            status = selectPerson.status;
        }

        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                <NoticeBarMessage status={status}/>
                <Picker
                    extra="请选择"
                    {
                        ...getFieldProps(
                            'relate_type',
                            {
                                initialValue: relate_type?[relate_type] : [],
                                rules: [{required: true}],
                            }
                        )
                    }
                    cols={1}
                    data={relationShipList}
                >
                    <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>关系:</Text></List.Item>
                </Picker>
                <InputItem
                    {
                        ...getFieldProps(
                            'chinese_name',
                            {
                                initialValue: chinese_name?chinese_name:'',
                                rules: [{required: true}],
                            }
                        )
                    }
                ><Text style={styles.brief}><RequireData/>名字:</Text></InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'contact_no',
                            {
                                initialValue: contact_no?contact_no:'',
                                rules: [{required: true}],
                            }
                        )
                    }
                ><Text style={styles.brief}>电话:</Text></InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_age',
                            {
                                initialValue: prc_age?prc_age:'',
                            }
                        )
                    }
                ><Text style={styles.brief}>年龄:</Text></InputItem>
                <InputItem
                    {
                        ...getFieldProps(
                            'prc_work_unit',
                            {
                                initialValue: prc_work_unit?prc_work_unit:'',
                            }
                        )
                    }
                ><Text style={styles.brief}>工作单位及职务:</Text></InputItem>
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
                    <List.Item arrow="horizontal"><Text style={styles.brief}><RequireData/>审批人:</Text></List.Item>
                </Picker>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: remark,
                            })
                        }
                        rows={5}
                        count={100}
                    />
                </List>
                <WhiteSpace size="xl"/>
                <Flex>
                    <Flex.Item>
                        <WingBlank>
                            <Button type="primary" onClick={this.onSave.bind(this, 'save')}>保存</Button>
                        </WingBlank>
                    </Flex.Item>
                    <Flex.Item>
                        <WingBlank>
                            <Button type="primary" onClick={this.onSave.bind(this, 'submit')}>提交</Button>
                        </WingBlank>
                    </Flex.Item>
                </Flex>
            </ScrollView>

        )
    }
}

export default createForm()(Index);

const styles = StyleSheet.create({
    brief: {
        fontSize: 14
    }
})