
import React, {PureComponent} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import {
    Button,
    Icon,
    Flex,
    Tabs,
} from 'antd-mobile';
import {format} from '../../common/Tool';
import { inject, observer } from 'mobx-react/native';
import { gColors } from '../../common/GlobalContants';

@inject('True')
@observer
export default class Index extends PureComponent{
    static navigationOptions = ({ navigation }) => {
        return {
            title:'我的假期',
            headerRight: (
                <Button
                    type="primary"
                    style={styles.button}
                    onPressIn={() => {
                        navigation.navigate('Notice');//"公告"
                    }}
                >申请</Button>
            ),
        }
    };
    constructor(props) {
        super(props);
        const time = new Date().getTime()
        this.state = {
            time, //保存时间戳
        }
    }
    clickAddMonth = (num) => {
        const {time} = this.state;
        const formatTime = new Date(time)
        num = parseInt(num)
        const endTime = formatTime.setMonth(formatTime.getMonth()+num);
        //进行数据请求切换
        const month = format(endTime, 'yyyy-MM')
        this.props.True.getLeaveList(month)
        //请求用户数据
        this.setState({
            time: endTime
        })
    }
    renderTitle = (time) => {
        const timeStr = time? format(time, 'yyyy-MM'):format(new Date().getTime(), 'yyyy-MM')
        return(
            <Flex style={styles.titleWrap}>
                <Flex.Item></Flex.Item>
                <Flex.Item style={styles.centerContent}>
                    <Flex>
                        <Flex.Item>
                            <TouchableOpacity onPress={() => {
                                this.clickAddMonth(-1)
                            }}>
                                <Text  style={{textAlign: 'center'}}>
                                    <Icon type={'\ue620'} color={'#A9B7B6'} size={'xxs'}/>
                                </Text>
                            </TouchableOpacity>
                        </Flex.Item>
                        <Flex.Item>
                            <Text>
                                {timeStr}
                            </Text>
                        </Flex.Item>
                        <Flex.Item>
                            <TouchableOpacity onPress={() => {
                                this.clickAddMonth(1)
                            }}>
                                <Text  style={{textAlign: 'center'}}>
                                    <Icon type={'\ue61f'} color={'#A9B7B6'} size={'xxs'}/>
                                </Text>
                            </TouchableOpacity>
                        </Flex.Item>
                    </Flex>
                </Flex.Item>
                <Flex.Item>
                    <TouchableOpacity>
                        <Text>
                            日历模式
                        </Text>
                    </TouchableOpacity>
                </Flex.Item>
            </Flex>
        )
    }
    renderList = (data) => {
        return (
            <ScrollView>
                {
                    data.map((info, i) =>
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
                                <Text style={styles.statusText}>
                                    {info.status_desc}
                                </Text>
                            </Flex.Item>
                        </Flex>
                    )
                }
            </ScrollView>
        )
    }
    renderLeaveItem = (data) => {
        return(
            <ScrollView>
                {
                    data && data.map((info, i) => {
                        //处理开始时间结束时间
                        const formatBeginTime = info.begin_time ? format(parseInt(info.begin_time), 'yyyy-MM-dd') :'';
                        const formatEndTime = info.end_time ? format(parseInt(info.end_time), 'yyyy-MM-dd') :'';
                        const beginStr = info.begin_time_half == 'AM' ? '上午' : '下午';
                        const endStr = info.end_time_half == 'AM' ? '上午' : '下午';

                        return(
                            <View style={styles.infoWrap2} key={i}>
                                <Flex style={styles.listName}>
                                    <Text style={styles.listText} numberOfLines={1}>
                                        {info.lv_type_desc + '(' + info.dur_days + '天）'}
                                    </Text>
                                </Flex>
                                <View style={styles.listPhone} numberOfLines={1}>
                                    <Text style={styles.phoneText}>
                                        {formatBeginTime + beginStr + '到' + formatEndTime + endStr}
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }
    renderNoData = () => {
        //暂无数据
        return(
            <View>

            </View>
        )
    }
    componentWillMount() {
        const time = new Date().getTime()
        //进行数据请求
        const month = format(time, 'yyyy-MM')
        this.props.True.getLeaveList(month)
    }
    render() {
        const {time} = this.state;
        const {allLeaveList, submitLeaveList, approveLeaveList, rejectLeaveList, cancelLeaveList} = this.props.True;
        const tabs = [
            { title: '已提交', sub: 'PE' },
            { title: '审批中', sub: 'PD' },
            { title: '审批不通过', sub: 'PD' },
            { title: '取消', sub: 'PD' },
        ];
        return(
            <ScrollView>
                {
                    this.renderTitle(time)
                }
                {
                    this.renderLeaveItem(allLeaveList)
                }
                <View style={styles.toggleBtn}>
                    <TouchableOpacity style={styles.touchPlace}>
                        <Text  style={styles.btnText}>
                            <Icon type={'\uE61D'} color={'#A9B7B6'} size={'md'}/>
                        </Text>
                    </TouchableOpacity>
                </View>
                <Tabs
                    tabs={tabs}
                    onTabClick={this.onProcessedTap}
                    swipeable={false}
                    //animated={false} //TODO 取消动画居然会影响activetab切换
                    tabBarActiveTextColor={gColors.brandPrimary}
                    tabBarUnderlineStyle={{ backgroundColor: gColors.brandPrimary }}
                >
                    {this.renderList([])}
                    {this.renderList([])}
                </Tabs>
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
    infoWrap: {
        flex: 3,
    },
    button: {
        backgroundColor:'#3ba662',
        borderColor: '#3ba662',
        height:40
    },
    centerContent: {
        flex: 2
    },
    editWrap: {
        display: 'flex',
        alignItems: 'flex-end',
        marginRight: 20,
    },
    titleWrap: {
        height: 40,
        backgroundColor: '#E3E3E3'
    },
    statusText: {
        marginTop: 5,
        color: '#F99431',
    },

    infoWrap2: {
        height: 80,
        paddingLeft: 10,
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: '#e1e1e1',
        backgroundColor: '#fff'
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
    toggleBtn: {
        height: 30,
        backgroundColor: '#E3E3E3',
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: '#e1e1e1',
    },
    btnText: {
        marginTop: 5,
        textAlign: 'center',
    },
    touchPlace: {
        width: '100%',
        height: '100%',
    }
});