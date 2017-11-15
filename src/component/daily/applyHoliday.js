/**
 * 申请假期
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';

import {RequireData} from '../personal/common/index';
import { List,Picker, DatePicker, ActionSheet, Icon, InputItem, TextareaItem, WhiteSpace, Button, WingBlank, Toast} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import Base from '../../stores/Base'
import ShowConfirm from '../../component/ShowConfirm';
import ApprovingButton from '../personal/approvingButton';
import ImagePicker from 'react-native-image-picker';
import {format} from '../../common/Tool';

@inject('User', 'Common', 'True')
@observer
class Index extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title:'假期申请',
        }
    };
    state = {
        typeValue: '',
        imgInfo: '',
        descStr: '',
        userDefined: '', //用户定义字段
        lv_type: '', //假期类型
        begin_time: new Date(), //开始时间
        begin_time_half: '',
        end_time:  new Date(),
        end_time_half: '',
        user_defined_field_1: '',
        dur_days: '',
        remark: '', //请假原因
    }
    //进行数据调教
    onSubmit = () => {
        const { selectApprover } = this.props.True;
        //判断对应的必填字段是否填写
        const approver_id = selectApprover.value;

        const {imgInfo, begin_time, begin_time_half, end_time, end_time_half, typeValue, user_defined_field_1, dur_days, remark} = this.state;
        if(typeValue.length == 0){
            Toast.info('请选择请假类型');
            return
        }
        if(begin_time.length == 0 || begin_time_half.length == 0){
            Toast.info('请选择开始时间');
            return
        }
        if(end_time.length == 0 || end_time.length == 0){
            Toast.info('请选择结束时间');
            return
        }
        if(dur_days == '' || dur_days == '0' || dur_days == '0.0'){
            Toast.info('请选择正确的开始时间以及结束时间');
            return
        }
        if(!approver_id){
            Toast.info('请选择审批人');
            return
        }
        const resubmit = 0;
        //todo 处理end_time_half begin_time_half
        const obj = {
            imgInfo,
            begin_time: format(new Date(begin_time).getTime(), 'yyyy-MM-dd'),
            begin_time_half: begin_time_half[0],
            end_time: format(new Date(end_time).getTime(), 'yyyy-MM-dd'),
            end_time_half: end_time_half[0],
            lv_type: typeValue[0],
            resubmit,
            user_defined_field_1,
            dur_days,
            remark,
            approver_id
        }
        //判断必填项是否填写
        const successFn = () => {
            this.props.navigation.goBack()
        }
        this.refs.confirm.show(
            {
                title: resubmit == '1'?'修改':'提交',
                massage: resubmit == '1'?'您确定修改请假信息吗？':'您确定提交请假信息吗？',
                okFn: () => {
                    this.props.User.postLvApply(obj, successFn);
                },
            }
        );
    }
    //判断请假时长
    justLvTime = async ({begin_time, begin_time_half, end_time, end_time_half, typeValue}) => {
        begin_time_half = begin_time_half[0];
        end_time_half = end_time_half[0];
        //判断开始时间
        //判断当前的开始时间是否小于
        if(begin_time && end_time){
            const beginTime = begin_time.getTime();
            const endTime = end_time.getTime();
            if(beginTime > endTime){
                Toast.info('开始时间不能小于结束时间')
                return false;
            }
            else if(beginTime == endTime){
                //判断选择的时间点
                if(begin_time_half && end_time_half){
                    if(begin_time_half == 'PM' && end_time_half == 'AM'){
                        Toast.info('开始时间不能小于结束时间')
                        return false;
                    }
                    else if(begin_time_half != 'AM' && begin_time_half != 'PM'){
                        //将时间处理为数字
                        const beginTimeHalf = begin_time_half.getTime();
                        const endTimeHalf = end_time_half.getTime();
                        if(beginTimeHalf >= endTimeHalf){
                            Toast.info('开始时间不能小于结束时间')
                            return false;
                        }
                    }
                }else{
                    return false;
                }
            }
        }
        //进行数据请求，请求请假时长
        if(typeValue){
            const obj = {
                begin_time: format(begin_time.getTime(), 'yyyy-MM-dd'),
                begin_time_half,
                end_time: format(end_time.getTime(), 'yyyy-MM-dd'),
                end_time_half,
                lv_type: typeValue[0]
            }
            const dur_days = await this.props.User.getDurdays(obj);
            //设置请假时长
            this.setState({
                dur_days
            })

        }
        return true;
    }
    //更改假期类型
    changeType = (v) => {
        const {holidayType} = this.props.Common;
        //1， 如果某个假期类型对应的alert_msg_desc字段不为空的话，选择该假期的时候需要在假期类型下面显示这个字段的内容；为空的话，则不需要显示。
        // 2，如果某个假期类型对应的user_defined_field_1不为空的话，需要在”附件“字段后面添加一个字段，字段名称为user_defined_field_1字段的值，字段的控件类型为时间选择器，格式如2017-02-01；如果为空的话，则不需要显示。
        //遍历数组，获取到对应的信息
        let obj = {};
        holidayType && holidayType.map(info => {
            if(info.value == v){
                obj = info;
            }
        })
        const {begin_time, begin_time_half, end_time, end_time_half} = this.state;
        //成功后的回调函数
        this.justLvTime({begin_time, begin_time_half, end_time, end_time_half,typeValue: v});

        this.setState({
            typeValue: v,
            descStr: obj && obj.alert_msg_desc ? obj.alert_msg_desc: '',
            userDefined: obj && obj.user_defined_field_1 ? obj.user_defined_field_1: ''
        });
    }
    //更改开始时间
    changeStart = (v) => {
        const {begin_time_half, end_time, end_time_half, typeValue} = this.state;
        //成功后的回调函数
        const flag = this.justLvTime({begin_time: v, begin_time_half, end_time, end_time_half, typeValue});
        if(flag){
            this.setState({
                begin_time: v
            })
        }
    }
    //更改开始上下午
    changeStartHalf = (v) => {
        const {begin_time, end_time, end_time_half, typeValue} = this.state;
        const flag = this.justLvTime({begin_time, begin_time_half: v, end_time, end_time_half, typeValue});
        if(flag){
            this.setState({
                begin_time_half: v
            })
        }
    }
    //更改结束时间
    changeEnd = (v) => {
        const {begin_time, begin_time_half, end_time_half, typeValue} = this.state;
        const flag = this.justLvTime({begin_time, begin_time_half, end_time: v, end_time_half, typeValue});
        if(flag){
            this.setState({
                end_time: v
            })
        }
    }
    //更改结束上下午
    changeEndHalf = (v) => {
        const {begin_time, begin_time_half, end_time, typeValue} = this.state;
        const flag = this.justLvTime({begin_time, begin_time_half, end_time, end_time_half: v, typeValue});
        if(flag){
            this.setState({
                end_time_half: v
            })
        }
    }
    //更改用户定义字段
    changeUserDefined = (v) => {
        this.setState({
            user_defined_field_1: v
        })
    }
    //更改请假理由
    changeRemark = (v) => {
        this.setState({
            remark: v
        })
    }
    componentWillMount() {
        //请求假期类型数据
        this.props.Common.getHolidayType();
        let { True } = this.props;
        True.selectTask = {function:'PP',function_dtl:'PD'};
    }
    renderStart = (halfTimeArr) => {
        // 如果enable_ta字段为N，则为上午和下午选择器；
        // 如果enable_ta字段为Y，则为填写具体的时间，如09:00。
        const {enable_ta} = Base.userInfo;
        return(
            <View>
                <View style={styles.timeTitle}>
                    <Text style={styles.timeText}><RequireData require={true} text="开始时间:"/></Text>
                </View>
                <DatePicker mode="date"
                            minDate={new Date(1900, 1, 1)}
                            onChange={this.changeStart}
                            value={this.state.begin_time}
                >
                    <List.Item arrow="horizontal"/>
                </DatePicker>
                {
                    enable_ta == 'N'?
                        <Picker data={halfTimeArr} cols={1}
                                onChange={this.changeStartHalf}
                                value={this.state.begin_time_half}
                        >
                            <List.Item arrow="horizontal"/>
                        </Picker>:
                        <DatePicker mode="time"
                                    onChange={this.changeStartHalf}
                                    value={this.state.begin_time_half}
                                    minDate={new Date(1900, 1, 1)}

                        >
                            <List.Item arrow="horizontal"/>
                        </DatePicker>
                }
            </View>
        )
    }
    renderEnd = (halfTimeArr) => {
        // 如果enable_ta字段为N，则为上午和下午选择器；
        // 如果enable_ta字段为Y，则为填写具体的时间，如09:00。
        const {enable_ta} = Base.userInfo;

        return(
            <View>
                <View style={styles.timeTitle}>
                    <Text style={styles.timeText}><RequireData require={true} text="结束时间:"/></Text>
                </View>
                <DatePicker mode="date"
                            onChange={this.changeEnd}
                            value={this.state.end_time}
                            minDate={new Date(1900, 1, 1)}
                >
                    <List.Item arrow="horizontal"/>
                </DatePicker>
                {
                    enable_ta == 'N'?
                        <Picker data={halfTimeArr} cols={1}
                                onChange={this.changeEndHalf}
                                value={this.state.end_time_half}
                        >
                            <List.Item arrow="horizontal"/>
                        </Picker>:
                        <DatePicker mode="time"
                                    minDate={new Date(1900, 1, 1)}
                                    onChange={this.changeEndHalf}
                                    value={this.state.end_time_half}

                        >
                            <List.Item arrow="horizontal"/>
                        </DatePicker>
                }
            </View>
        )
    }
    renderUserDefined = (str) => {
        return(
            <View>
                <DatePicker mode="date"
                            changeUserDefined = {this.changeUserDefined}
                            minDate={new Date(1900, 1, 1)}

                >
                    <List.Item arrow="horizontal"> {str} </List.Item>
                </DatePicker>
            </View>
        )
    }
    renderDurDays = (dur_days) => {
        return(
            <InputItem
                value={dur_days}
            ><RequireData require={true} text="假期天数:"/></InputItem>
        )
    }
    renderRemark = (remark) => {
        return(
            <View>
                <View style={styles.timeTitle}>

                    <Text style={styles.timeText}>请假事由:</Text>
                </View>
                <TextareaItem
                    onChange={this.changeRemark}
                    placeholder={remark?remark:"请输入请假事由"}
                    rows={5}
                    count={100}
                    style={{marginLeft: -15, fontSize: 16}}
                    value={remark}
                />
            </View>
        )
    }
    renderUploadFile = (imgInfo) => {
        const options = {
            title: 'Select Avatar'
        };

        return(
            <List renderHeader={() => '附件'}>
                <TouchableOpacity onPress={() => {
                    const BUTTONS = ['相册', '拍照', '取消'];
                    ActionSheet.showActionSheetWithOptions({
                        options: BUTTONS,
                        cancelButtonIndex: BUTTONS.length - 1
                    },(buttonIndex) => {
                        if(buttonIndex==0){
                            ImagePicker.launchImageLibrary(options, (response)  => {
                                this.setState({
                                    imgInfo: response
                                })
                            });
                        }else if(buttonIndex==1){
                            ImagePicker.launchCamera(options, (response)  => {
                                this.setState({
                                    imgInfo: response
                                })
                            });
                        }

                    });
                }}>
                    {
                        imgInfo?
                            <Image style={styles.image} source={{uri: imgInfo.uri ? imgInfo.uri:''}}/>:
                            <View style={styles.image}>
                                <Text style={styles.text}>
                                    <Icon type={'\ue910'} size="xl" color="#D2D2D2"/>
                                </Text>
                            </View>

                    }
                </TouchableOpacity>
            </List>
        )
    }
    renderSubmitBtn = () => {
        return(
            <View style={{backgroundColor: '#fff'}}>
                <WhiteSpace size="sm"/>
                <WingBlank>
                    <Button type="primary" onClick={this.onSubmit}>提交</Button>
                </WingBlank>
                <WhiteSpace size="sm"/>
            </View>
        )
    }
    render() {

        const {holidayType, halfTimeArr} = this.props.Common;
        const {typeValue, imgInfo, descStr, userDefined, dur_days, remark} = this.state;
        return(
            <View style={{overflow: 'scroll', height:'100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <Picker data={holidayType} cols={1}
                            onChange={this.changeType}
                            value={typeValue}
                    >
                        <List.Item arrow="horizontal"><RequireData require={true} text="假期类型:"/></List.Item>
                    </Picker>
                    {
                        descStr?
                            <View style={styles.descView}>
                                <Text style={styles.descText}>
                                    {descStr}
                                </Text>
                            </View>:
                            null

                    }
                    {
                        this.renderStart(halfTimeArr)
                    }
                    {
                        this.renderEnd(halfTimeArr)
                    }
                    {
                        this.renderDurDays(dur_days)
                    }
                    {
                        this.renderRemark(remark)
                    }
                    {
                        this.renderUploadFile(imgInfo)
                    }
                    {
                        userDefined?
                            this.renderUserDefined(userDefined):
                            null
                    }
                    <ApprovingButton/>
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                </ScrollView>

                <ShowConfirm ref="confirm"/>
                {
                    this.renderSubmitBtn()
                }
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
    descView: {
        height: 40,
        marginLeft: 15,
    },
    descText: {
        lineHeight: 40,
    }
})

export default createForm()(Index);