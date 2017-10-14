/**
 * 工作经历
 */

import React, {Component} from 'react';
import moment from 'moment';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Image

} from 'react-native';


const resultStatus = {
    'N': '新建',
    'P': '处理中',
    'R': '已拒绝',
    'A': '成功',
    'C': '取消'
}

import { Flex, WingBlank,Icon,Grid,Button,List, Modal,ActionSheet,InputItem} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

@inject('User')
@observer
export default class Index extends Component{
    constructor(props) {
        super(props);
        //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentWillMount() {
        //设置头部
        // this.props.navigator.setButtons({
        //     rightButtons: [{
        //         title: '新增', // for a textual button, provide the button title (label)
        //         id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //     }], // see "Adding buttons to the navigator" below for format (optional)
        //     animated: false // does the change have transition animation or does it happen immediately (optional)
        // });
        //获取工作列表信息
        this.props.User.getWorkList();
        //设置底部
        // this.props.navigator.toggleTabs({
        //     animated: false,
        //     to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        // });
    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
                //置空选中的工作经历
                this.props.User.setCheckedExp({});
                this.props.navigator.push({
                    screen: 'AddWorkExp',
                    title: '新增工作经历'
                })
            }
        }
    }
    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const {selfWorkList} = this.props.User;
        //过滤审批以及未审批的工作经历
        let arr1 = [];
        let arr2 = [];
        selfWorkList && selfWorkList.map(info => {
            if(info.status != 'A'){
                arr2.push(info)
            }else{
                arr1.push(info)
            }
        });
        return(
            <View>
                {
                    arr1 && arr1.map((info, i) =>
                        <Flex style={styles.listItem} key={i}>
                            <Flex.Item style={styles.infoWrap}>
                                <Flex style={styles.listName}>
                                    <Text style={styles.listText}>
                                        {info.pri_position} | {info.pri_comp}
                                    </Text>
                                </Flex>
                                <View style={styles.listPhone}>
                                    <Text style={styles.phoneText}>
                                        {info.bgn_date?moment(parseInt(info.bgn_date)).format('YYYY-MM-DD'):''} 到 {info.end_date?moment(parseInt(info.end_date)).format('YYYY-MM-DD'):''}
                                    </Text>
                                </View>
                            </Flex.Item>
                            <Flex.Item style={styles.editWrap}>
                                <TouchableOpacity onPress={() => {
                                    //选中当前选中的ID
                                    this.props.User.setCheckedExp(info);
                                    this.props.navigator.push({
                                        screen: 'AddWorkExp',
                                        title: '编辑工作经历'
                                    })
                                }}>
                                    <Icon type={'\ue692'}  color={"#ff6666"}/>
                                </TouchableOpacity>
                            </Flex.Item>
                        </Flex>
                    )
                }
                {
                    arr2 && arr2.length?
                        <View>
                            <Flex style={styles.examineTitle}>
                                <Text>
                                    需审批的工作经历
                                </Text>
                            </Flex>
                            {
                                arr2.map((info, i) =>
                                    <Flex style={styles.listItem} key={i}>
                                        <Flex.Item style={styles.infoWrap}>
                                            <Flex style={styles.listName}>
                                                <Text style={styles.listText}>
                                                    {info.pri_position} | {info.pri_comp}
                                                </Text>
                                            </Flex>
                                            <View style={styles.listPhone}>
                                                <Text style={styles.phoneText}>
                                                    {info.bgn_date?moment(parseInt(info.bgn_date)).format('YYYY-MM-DD'):''} 到 {info.end_date?moment(parseInt(info.end_date)).format('YYYY-MM-DD'):''}
                                                </Text>
                                            </View>
                                        </Flex.Item>
                                        <Flex.Item style={styles.editWrap}>
                                            <TouchableOpacity onPress={() => {
                                                //选中当前选中的ID
                                                this.props.User.setCheckedExp(info);
                                                this.props.navigator.push({
                                                    screen: 'AddWorkExp',
                                                    title: '编辑工作经历'
                                                })
                                            }}>
                                                <Icon type={'\ue692'}  color={"#ff6666"}/>
                                                <Text style={styles.statusText}>
                                                    {info.status_desc}
                                                </Text>
                                            </TouchableOpacity>
                                        </Flex.Item>
                                    </Flex>
                                )
                            }
                        </View>:
                        <View/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        height: 80,
        paddingLeft: 10,
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: '#e1e1e1',

    },
    listName: {
        height: 50,
    },
    listText: {
        fontSize: 16,
    },
    listPhone: {
        marginTop: -5,
        height: 30,
    },
    phoneText: {
        fontSize: 15,
        color: '#949494',
    },
    infoWrap: {
        flex: 3,
    },
    editWrap: {
        display: 'flex',
        alignItems: 'flex-end',
        marginRight: 20,
    },
    examineTitle: {
        paddingLeft: 10,
        height: 30,
        backgroundColor: '#e1e1e1',
    },
    statusText: {
        marginTop: 5,
        color: 'orange',
    }
});