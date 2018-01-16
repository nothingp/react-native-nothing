import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    Image,
    ActivityIndicator
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Grid,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';

import { gColors } from '../../common/GlobalContants';
import RecentLeaveModal from './recentLeaveModal';
import { renderHeadIconItem } from './common/index';
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = {
        title: '近期假期查看',
        headerRight: (
            <RecentLeaveModal/>
        ),
    }

    componentWillMount() {
        const { True, User } = this.props;
        const { staff_no } = True.leaveLeaveinfoDetail;
        const nowTime = new Date().getTime();
        const threeMonth = format((nowTime - 3 * 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        True.recentLeaveType = {
            value: threeMonth,
            label: '近3个月',
        };
        Toast.loading('加载中');
        True.leaveRecentLeaveApiAction(threeMonth, staff_no);
    }

    renderNoData = (str) => {
        //暂无数据
        return (
            <View style={styles.noDataWrap}>
                <Text style={styles.noDataIcon}>
                    <Icon type={'\uE6A8'} color={'#33CC99'} size={'lg'}/>
                </Text>
                <Text style={styles.textInfo}>
                    {str}
                </Text>
            </View>
        )
    }

    render() {
        const { True } = this.props;
        const { leaveRecentLeaveData = [], leaveLeaveinfoDetail } = True;
        const {
            name,
            user_photo,
            position,
        } = leaveLeaveinfoDetail;

        let sumDays = 0;
        leaveRecentLeaveData.map((v, i) => {
            sumDays += Number(v.dur_days);
        })

        return (
            <ScrollView style={{
                height: '100%',
                backgroundColor: '#eee'
            }}>

                <List>
                    {
                        renderHeadIconItem(user_photo, name, position, this)
                    }
                </List>

                <WhiteSpace size="lg"/>

                {
                    leaveRecentLeaveData.length == 0 ?
                        this.renderNoData('近期暂无任何假期记录')
                        :
                        <List>
                            <List.Item
                                arrow="empty"
                            >
                                <Text>
                                    共{leaveRecentLeaveData.length}条记录，请了{sumDays.toFixed(2)}天假期。
                                </Text>
                            </List.Item>

                            {
                                leaveRecentLeaveData.map((v, i) => {

                                    return (
                                        <List key={i}>
                                            <List.Item
                                                multipleLine
                                                arrow="empty"
                                            >
                                                <Text>
                                                    {v.lv_type_desc}({v.dur_days})天
                                                </Text>
                                                <Brief>
                                                    <Text>
                                                        {v.begin_time ? format(v.begin_time, 'yyyy-MM-dd') : ''}
                                                        {v.begin_time_half == 'AM' ? '上午' : '下午'} 到 {' '}
                                                        {v.end_time ? format(v.end_time, 'yyyy-MM-dd') : ''}
                                                        {v.end_time_half == 'AM' ? '上午' : '下午'}
                                                    </Text>
                                                </Brief>
                                            </List.Item></List>
                                    )
                                })
                            }
                        </List>
                }

            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    noDataWrap: {
        height: '100%',
        backgroundColor: '#fff',
        marginBottom: 60,
    },
    noDataIcon: {
        height: 150,
        paddingTop: 60,
        textAlign: 'center'
    },
    textInfo: {
        textAlign: 'center'
    },
});

export default createForm()(Index);


