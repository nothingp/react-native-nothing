/**
 * 申请假期
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import {RequireData} from '../personal/common/index';
import { List,Picker, DatePicker} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import Base from '../../stores/Base'

@inject('User', 'Common')
@observer
class Index extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title:'假期申请',
        }
    };
    state = {
        typeValue: '',
    }
    changeType = (v) => {
        const {holidayType} = this.props.Common;
        //1， 如果某个假期类型对应的alert_msg_desc字段不为空的话，选择该假期的时候需要在假期类型下面显示这个字段的内容；为空的话，则不需要显示。

        // 2，如果某个假期类型对应的user_defined_field_1不为空的话，需要在”附件“字段后面添加一个字段，字段名称为user_defined_field_1字段的值，字段的控件类型为时间选择器，格式如2017-02-01；如果为空的话，则不需要显示。
        this.setState({
            typeValue: v
        })

    }
    componentWillMount() {
        //请求假期类型数据
        this.props.Common.getHolidayType();

    }
    renderStart = (halfTimeArr) => {
        // 如果enable_ta字段为N，则为上午和下午选择器；
        // 如果enable_ta字段为Y，则为填写具体的时间，如09:00。
        const { getFieldProps } = this.props.form;
        const {enable_ta} = Base.userInfo;

        return(
            <View>
                <View style={styles.timeTitle}>
                    <Text style={styles.timeText}>开始时间</Text>
                </View>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'begin_time',
                                    {
                                        initialValue: '',
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
                                        'begin_time_half',
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
                    <Text style={styles.timeText}>结束时间</Text>
                </View>
                <DatePicker mode="date"
                            {
                                ...getFieldProps(
                                    'end_time',
                                    {
                                        initialValue: '',
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

    render() {
        const { getFieldProps } = this.props.form;

        const {holidayType, halfTimeArr} = this.props.Common;
        const {typeValue} = this.state;

        return(
            <View>
                <Picker data={holidayType} cols={1}
                        {
                            ...getFieldProps(
                                'holidayType',
                                {
                                    initialValue: [],
                                }
                            )
                        }
                        onChange={this.changeType}
                        value={typeValue}
                >
                    <List.Item arrow="horizontal"><RequireData require={false} text="假期类型:"/></List.Item>
                </Picker>
                {
                    this.renderStart(halfTimeArr)
                }
                {
                    this.renderEnd(halfTimeArr)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timeTitle: {
        height: 40,
        backgroundColor: '#E3E3E3'
    },
    timeText: {
        lineHeight: 40,
        marginLeft: 15,
    }
})

export default createForm()(Index);