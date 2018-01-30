/**
 * 假期申报界面
 **/

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    List,
    Picker,
    DatePicker,
    WhiteSpace,
    WingBlank,
    Button,
    TextareaItem,
    Toast
} from 'antd-mobile';
import {RequireData} from '../personal/common/index';
import ApprovingButton from '../personal/approvingButton';
import { inject, observer } from 'mobx-react/native';
import {format} from '../../common/Tool';
import ShowConfirm from '../../component/ShowConfirm';
import InputItem from '../InputItem';

@inject('User', 'Common', 'True')
@observer
export default class Index extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title:'休假申报',
        }
    };
    constructor(props) {
        super(props);
        //判断编辑还是新增
        const {type} = this.props.navigation.state.params;

        let as_of_date = new Date(),
            lv_claims_code = '',
            lv_adj_value = '',
            remark = '';

        if(type == 'edit'){
            const {selectAdjDetail} = this.props.User;
            console.log(selectAdjDetail)

            lv_claims_code = [selectAdjDetail.lv_claims_code];
            as_of_date = new Date(parseInt(selectAdjDetail.as_of_date));
            lv_adj_value = selectAdjDetail.lv_adj_value;
            remark = selectAdjDetail.remark;
        }

        this.state = {
            lv_claims_code, //选择的可调休申报值
            as_of_date, //生效日期
            lv_adj_value, //调休时间
            remark, //备注
        }
    }
    //更改生效日期时间
    changeAsOfDate = (v) => {
        this.setState({
            as_of_date: v
        })
    }
    //更改可调假申报项
    changeLvClaims = (v) => {
        this.setState({
            lv_claims_code: v
        })
    }
    //更改备注
    changeRemark = (v) => {
        this.setState({
            remark: v
        })
    }
    //更改假期天数
    changeLvAdjValue = (v) => {
        this.setState({
            lv_adj_value: v
        })
    }
    //提交可申报休假信息
    onSubmit = () => {
        //type edit编辑 add新增
        const {type} = this.props.navigation.state.params;

        const { selectApprover} = this.props.True;
        const {lv_claims_code, as_of_date, lv_adj_value, remark} = this.state;
        //判断必填项是否填写
        const approver_id = selectApprover.value;

        if(lv_claims_code.length == 0){
            Toast.info('请选择可调休假申报项');
            return
        }
        if(!as_of_date){
            Toast.info('请选择生效日期');
            return
        }
        if(!lv_adj_value){
            Toast.info('请填写假期调整天数');
            return
        }
        if(!approver_id){
            Toast.info('请选择审批人');
            return
        }
        const obj = {
            lv_claims_code: lv_claims_code[0],
            as_of_date: format(new Date(as_of_date).getTime(), 'yyyy-MM-dd'),
            lv_adj_value,
            remark,
            approver_id,
            type
        }
        console.log(obj)
        //判断必填项是否填写
        const successFn = () => {
            this.props.navigation.goBack()
        }

        this.refs.confirm.show(
            {
                title: '提交',
                massage: '您确定提交休假申报信息吗？',
                okFn: () => {
                    this.props.User.postLeaveawardApply(obj, successFn);
                },
            }
        );
    }
    componentWillMount() {
        //获取
        let { True } = this.props;
        this.props.Common.getLeaveawardType();
        True.selectTask = {function:'LC',function_dtl:''};
    }
    //更改
    render() {
        const {leaveawardType} = this.props.Common;

        const {lv_claims_code, as_of_date, lv_adj_value, remark} = this.state;

        return(
            <View style={{height: '100%', backgroundColor: '#fff'}}>
                <List>
                    <Picker extra="请选择"
                            cols = {1}
                            data={leaveawardType}
                            onOk={this.changeLvClaims}
                            value={lv_claims_code}
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="可调休假申报项:"/></List.Item>
                    </Picker>
                    <DatePicker mode="date"
                                minDate={new Date(1900, 1, 1)}
                                onChange={this.changeAsOfDate}
                                value={as_of_date}
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="生效日期:"/></List.Item>
                    </DatePicker>
                    <InputItem
                        value={lv_adj_value}
                        onChange={this.changeLvAdjValue}
                    ><RequireData require={true} text="调整天数:"/></InputItem>
                </List>

                <ApprovingButton/>

                <View>
                    <View style={styles.timeTitle}>

                        <Text style={styles.timeText}>备注</Text>
                    </View>
                    <TextareaItem
                        onChange={this.changeRemark}
                        placeholder={remark?remark:"请输入备注"}
                        rows={5}
                        count={100}
                        style={{marginLeft: -15, fontSize: 16}}
                        value={remark}
                    />
                </View>

                <WhiteSpace size="lg"/>

                <ShowConfirm ref="confirm"/>

                <View style={{backgroundColor: '#fff'}}>
                    <WhiteSpace size="sm"/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </WingBlank>
                    <WhiteSpace size="sm"/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    timeTitle: {
        height: 40,
        backgroundColor: '#f2f2f2'
    },
    timeText: {
        lineHeight: 40,
        marginLeft: 15,
    },
})