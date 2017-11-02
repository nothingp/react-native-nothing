/**
 * 教育经历
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    ScrollView

} from 'react-native';


import { Flex,Icon,Button} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

@inject('User')
@observer
export default class Index extends Component{
    static navigationOptions = ({ navigation }) => ({
        title:'教育经历',
        headerRight: (
            <Button
                type="primary"
                style={styles.button}
                onPressIn={() => {
                    //选中当前选中的ID
                    navigation.navigate('EditEduExp', {type: 'add'})
                }}
            >添加</Button>
        ),
    });
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //获取教育列表信息
        this.props.User.getEduList();
    }
    render() {
        const {selfEduList} = this.props.User;
        //过滤审批以及未审批的教育经历
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
            <ScrollView style={{backgroundColor:'#fff'}}>
                {
                    arr1 && arr1.map((info, i) =>
                        <Flex style={styles.listItem} key={i}>
                            <Flex.Item style={styles.infoWrap}>
                                <Flex style={styles.listName}>
                                    <Text style={styles.listText} numberOfLines={1}>
                                        {info.edu_type_desc} | {info.institude_name}
                                    </Text>
                                </Flex>
                                <View style={styles.listPhone} numberOfLines={1}>
                                    <Text style={styles.phoneText}>
                                        {
                                            info.from_year && info.to_year?
                                                info.from_year.split('T')[0] + '到' + info.to_year.split('T')[0]:
                                                ''
                                        }
                                    </Text>
                                </View>
                            </Flex.Item>
                            <Flex.Item style={styles.editWrap}>
                                <TouchableOpacity onPress={() => {
                                    //选中当前选中的ID
                                    this.props.User.setCheckedEdu(info);
                                    //页面跳转
                                    this.props.navigation.navigate('EditEduExp', {type: 'edit'})
                                }}>
                                    <Text style={{textAlign: 'right'}}>
                                        <Icon type={'\ue692'}  color={"#323232"}/>
                                    </Text>
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
                                    需审批的教育经历
                                </Text>
                            </Flex>
                            {
                                arr2.map((info, i) =>
                                    <Flex style={styles.listItem} key={i}>
                                        <Flex.Item style={styles.infoWrap}>
                                            <Flex style={styles.listName}>
                                                <Text style={styles.listText} numberOfLines={1}>
                                                    {info.edu_type_desc} | {info.institude_name}
                                                </Text>
                                            </Flex>
                                            <View style={styles.listPhone}>
                                                <Text style={styles.phoneText} numberOfLines={1}>
                                                    {
                                                        info.from_year && info.to_year?
                                                            info.from_year.split('T')[0] + '到' + info.to_year.split('T')[0]:
                                                            ''
                                                    }
                                                </Text>
                                            </View>
                                        </Flex.Item>
                                        <Flex.Item style={styles.editWrap}>
                                            <TouchableOpacity onPress={() => {
                                                //选中当前选中的ID
                                                this.props.User.setCheckedEdu(info);
                                                //页面跳转
                                                this.props.navigation.navigate('EditEduExp', {type: 'edit'})
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
    },
    button: {
        backgroundColor:'#3ba662',
        borderColor: '#3ba662',
        height:40
    }
});