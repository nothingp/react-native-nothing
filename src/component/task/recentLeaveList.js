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
        const nowTime = new Date().getTime();
        const threeMonth = format((nowTime - 3 * 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        True.recentLeaveType = {
            value: threeMonth,
            label: '近3个月',
        };
        Toast.loading('loading');
        True.leaveRecentLeaveApiAction(threeMonth);
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

        return (
            <ScrollView style={{
                height: '100%',
                backgroundColor: '#fff'
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
                                    共3条记录，请了4天假期。
                                </Text>
                            </List.Item>

                            {
                                leaveRecentLeaveData && leaveRecentLeaveData.map((v, i) => {
                                    return (
                                        <List.Item
                                            key={i}
                                            multipleLine
                                            arrow="empty"
                                        >
                                            <Text>
                                                年假（2天）
                                            </Text>
                                            <Brief>
                                                <Text>
                                                    2017-02-21上午 到 2017-02-22下午
                                                </Text>
                                            </Brief>
                                        </List.Item>
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
        backgroundColor: '#fff'
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


