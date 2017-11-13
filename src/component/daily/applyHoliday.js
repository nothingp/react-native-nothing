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
import { List,Picker, DatePicker, ActionSheet, Icon, InputItem, TextareaItem, WhiteSpace, Button, WingBlank} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import Base from '../../stores/Base'
import ShowConfirm from '../../component/ShowConfirm';
import ApprovingButton from '../personal/approvingButton';
import ImagePicker from 'react-native-image-picker';

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
        begin_time: '', //开始时间
        begin_time_half: '',
        end_time: '',
        end_time_half: '',
        user_defined_field_1: '',
        dur_days: '',
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
        this.setState({
            typeValue: v,
            descStr: obj && obj.alert_msg_desc ? obj.alert_msg_desc: '',
            userDefined: obj && obj.user_defined_field_1 ? obj.user_defined_field_1: ''
        });
    }
    //更改开始时间
    changeStart = (v) => {
        console.log(v)
    }
    //更改上下午
    changeStartHalf = (v) => {

    }
    componentWillMount() {
        //请求假期类型数据
        this.props.Common.getHolidayType();
        let { True, navigation } = this.props;
        True.selectTask = {function:'PP',function_dtl:'PD'};

    }
    renderStart = (halfTimeArr) => {
        // 如果enable_ta字段为N，则为上午和下午选择器；
        // 如果enable_ta字段为Y，则为填写具体的时间，如09:00。
        const { getFieldProps } = this.props.form;
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
                                value={this.state.begin_time}
                        >
                            <List.Item arrow="horizontal"/>
                        </Picker>:
                        <DatePicker mode="time"
                                    {
                                        ...getFieldProps(
                                            'begin_time_half',
                                            {
                                                initialValue: '',
                                            }
                                        )
                                    }
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
        const { getFieldProps } = this.props.form;
        const {enable_ta} = Base.userInfo;

        return(
            <View>
                <View style={styles.timeTitle}>
                    <Text style={styles.timeText}><RequireData require={true} text="结束时间:"/></Text>
                </View>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'end_time',
                                    {
                                        initialValue: new Date(),
                                    }
                                )
                            }
                            minDate={new Date(1900, 1, 1)}

                >
                    <List.Item arrow="horizontal"/>
                </DatePicker>
                {
                    enable_ta == 'N'?
                        <Picker data={halfTimeArr} cols={1}
                                {
                                    ...getFieldProps(
                                        'end_time_half',
                                        {
                                            initialValue: [],
                                        }
                                    )
                                }
                        >
                            <List.Item arrow="horizontal"/>
                        </Picker>:
                        <DatePicker mode="time"
                                    {
                                        ...getFieldProps(
                                            'end_time_half',
                                            {
                                                initialValue: '',
                                            }
                                        )
                                    }
                                    minDate={new Date(1900, 1, 1)}

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
                            {
                                ...getFieldProps(
                                    'end_time',
                                    {
                                        initialValue: new Date(),
                                    }
                                )
                            }
                            minDate={new Date(1900, 1, 1)}

                >
                    <List.Item arrow="horizontal"> {str} </List.Item>
                </DatePicker>
            </View>
        )
    }
    render() {
        const { getFieldProps } = this.props.form;

        const {holidayType, halfTimeArr} = this.props.Common;
        const {typeValue, imgInfo, descStr, userDefined} = this.state;

        const options = {
            title: 'Select Avatar'
        };

        return(
            <View style={{overflow: 'scroll', height:'100%'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <Picker data={holidayType} cols={1}
                            {
                                ...getFieldProps(
                                    'lv_type',
                                    {
                                        initialValue: [],
                                        rules: [{required: true}],
                                    }
                                )
                            }
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

                    <InputItem
                    ><RequireData require={true} text="假期天数:"/></InputItem>
                    <View style={styles.timeTitle}>
                        <Text style={styles.timeText}>请假事由:</Text>
                    </View>
                    <TextareaItem
                        {
                            ...getFieldProps('remark', {
                                initialValue: '',
                            })
                        }
                        placeholder="请输入请假事由"
                        rows={5}
                        count={100}
                        style={{marginLeft: -15, fontSize: 16}}
                    />
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
                    {
                        userDefined?
                            this.renderUserDefined(userDefined):
                            null
                    }
                    <ApprovingButton/>
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
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