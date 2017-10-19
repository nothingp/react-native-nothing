/**
 * 相关证书
 */

import React, {Component} from 'react';
import moment from 'moment';

import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    ScrollView,

} from 'react-native';


import { Flex,Icon} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

@inject('User')
@observer
export default class Index extends Component{
    static navigationOptions = ({ navigation }) => ({
        title:'证书',
    });
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //获取证书列表信息
        this.props.User.getCertList();
    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
                //置空选中的证书
                this.props.User.setCheckedEdu({});
                //页面跳转
                this.props.navigation.navigate('AddEduExp')
            }
        }
    }
    componentWillUnmount() {
        // this.props.navigator.toggleTabs({
        //     animated: false,
        //     to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        // });
    }
    render() {
        const {selfEduList} = this.props.User;
        console.log(selfEduList)
        //过滤审批以及未审批的证书列表
        let arr1 = [];
        let arr2 = [];
        selfEduList && selfEduList.map(info => {
            if(info.status != 'A'){
                arr2.push(info)
            }else{
                arr1.push(info)
            }
        });
        return(
            <ScrollView>
                {
                    arr1 && arr1.map((info, i) =>
                        <Flex style={styles.listItem} key={i}>
                            <Flex.Item style={styles.infoWrap}>
                                <Flex style={styles.listName}>
                                    <Text style={styles.listText} numberOfLines={1}>
                                        {info.cert_desc} | {info.license_cert_no}
                                    </Text>
                                </Flex>
                                <View style={styles.listPhone}>
                                    <Text style={styles.phoneText}>
                                        {info.valid_date?moment(parseInt(info.valid_date)).format('YYYY-MM-DD'):''} 到 {info.expiry_date?moment(parseInt(info.expiry_date)).format('YYYY-MM-DD'):''}
                                    </Text>
                                </View>
                            </Flex.Item>
                            <Flex.Item style={styles.editWrap}>
                                <TouchableOpacity onPress={() => {
                                    //选中当前选中的ID
                                    this.props.User.setCheckedEdu(info);
                                    //页面跳转
                                    this.props.navigation.navigate('AddEduExp')
                                }}>
                                    <Icon type={'\ue692'}  color={"#323232"}/>
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
                                    需审批的证书
                                </Text>
                            </Flex>
                            {
                                arr2.map((info, i) =>
                                    <Flex style={styles.listItem} key={i}>
                                        <Flex.Item style={styles.infoWrap}>
                                            <Flex style={styles.listName}>
                                                <Text style={styles.listText} numberOfLines={1}>
                                                    {info.cert_desc} | {info.license_cert_no}
                                                </Text>
                                            </Flex>
                                            <View style={styles.listPhone}>
                                                <Text style={styles.phoneText}>
                                                    {info.valid_date?moment(parseInt(info.valid_date)).format('YYYY-MM-DD'):''} 到 {info.expiry_date?moment(parseInt(info.expiry_date)).format('YYYY-MM-DD'):''}
                                                </Text>
                                            </View>
                                        </Flex.Item>
                                        <Flex.Item style={styles.editWrap}>
                                            <TouchableOpacity onPress={() => {
                                                //选中当前选中的ID
                                                this.props.User.setCheckedEdu(info);
                                                //页面跳转
                                                this.props.navigation.navigate('AddEduExp')
                                            }}>
                                                <Text style={{textAlign: 'right'}}>
                                                    <Icon type={'\ue692'}  color={"#323232"}/>
                                                </Text>
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
            </ScrollView>
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
        overflow: 'hidden',
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
        color: '#F99431',
    }
});