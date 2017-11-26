/**
 * 取消假期
 */
import React, {Component} from 'react';

import {
    View,
    Text,
} from 'react-native';
import {Result, Icon, List, Flex, TextareaItem, Button, Toast} from 'antd-mobile';
import ApprovingButton from '../personal/approvingButton';
import { inject, observer } from 'mobx-react/native';

@inject('User', 'True')
@observer
export default class Index extends Component{
    static navigationOptions = ({ navigation }) => {
        return({
            title:'取消假期',
        })
    };
    state = {
        remark: '', //备注
    }
    submitFn = () => {
        //取消假期
        const {remark} = this.state;
        const { selectApprover} = this.props.True;
        //判断对应的必填字段是否填写
        const approver_id = selectApprover.value;
        if(!approver_id){
            Toast.info('请选择审批人');
            return
        }
        const status = this.props.User.cancelPassHoliday({remark, approver_id})
        if(status){
            this.props.navigation.goBack()
        }
    }
    changeRemark = (v) => {
        //更改备注
        this.setState({
            remark: v
        })
    }
    componentWillMount() {
        //获取审批人
        const {selectLvDetail} = this.props.User
        const {lv_type} = selectLvDetail || {};
        const { True } = this.props;
        True.selectTask = {function:'LA',function_dtl:lv_type};
    }
    render() {
        const {remark} = this.state;

        return(
            <View style={{height: '100%', backgroundColor: '#fff'}}>
                <Result
                    img={<Icon type={'\ue62c'} size={60} color="#F87C36"/>}
                    title={<Text style={{fontSize: 16}}>您确定取消申请假期吗</Text>}
                />
                <ApprovingButton headStr="请选择审批人"/>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        placeholder="请输入备注"
                        value={remark}
                        onChange={this.changeRemark}
                        rows={5}
                        count={100}
                    />
                </List>
                <Flex style={{ position: 'absolute', bottom: 0, left: 0 }}>
                    <Flex.Item>
                        <Button style={{backgroundColor: '#fff',
                            borderColor: 'transparent',
                            borderTopColor: '#ddd',
                            borderBottomColor: '#ddd',
                            height: 40,
                            borderRadius: 0}}
                                onPressIn={() =>
                                    this.props.navigation.goBack()
                                }>
                            <Text style={{ fontSize: 16 }}>取消</Text>
                        </Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button style={{backgroundColor: '#3ba662',
                            borderColor: 'transparent',
                            borderTopColor: '#3ba662',
                            height: 40,
                            borderRadius: 0}}
                                onPressIn={() =>
                                    this.submitFn()
                                }>
                            <Text style={{ color: '#fff', fontSize: 16 }}>确定</Text>
                        </Button>
                    </Flex.Item>
                </Flex>
            </View>
        )
    }
}