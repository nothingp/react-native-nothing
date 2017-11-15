
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
import {format} from '../../../common/Tool';
import { inject, observer } from 'mobx-react/native';
import { gColors } from '../../../common/GlobalContants';

@inject('User')
@observer
export default class Index extends PureComponent{
    static navigationOptions = ({ navigation }) => {
        return {
            title:'我的报销',
            headerRight: (
                <Button
                    type="primary"
                    style={styles.button}
                    onPressIn={() => {
                        navigation.navigate('AddClaims');//"公告"
                    }}
                >报销</Button>
            ),
        }
    };
    constructor(props) {
        super(props);
        const time = new Date().getTime()
        this.state = {
            time, //保存时间戳
            ifShowAll: false,
        }
    }
    clickAddMonth = (num) => {
        const {time} = this.state;
        const formatTime = new Date(time)
        num = parseInt(num)
        const endTime = formatTime.setMonth(formatTime.getMonth()+num);
        //进行数据请求切换
        const month = format(endTime, 'yyyy-MM')
        this.props.User.getClaimsList(month)
        //请求用户数据
        this.setState({
            time: endTime
        })
    }
    clickToggleShow() {
        //显示隐藏全部已通过信息
        this.setState({
            ifShowAll: !this.state.ifShowAll,
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
                </Flex.Item>
            </Flex>
        )
    }
    renderLeaveItem = (data) => {
        const {ifShowAll} = this.state;
        // if(!ifShowAll){
        //     data = data.slice(0, 3);
        // }
        let isShowButton = data&&data.length>3?true:false;

        let data3 = data.slice(0, 3);
        data = ifShowAll?data:data3;
        return(
            <ScrollView>
                {
                    data && data.map((info, i) => {
                        return(
                            <View key={i} style={styles.infoWrap2}>
                                <Flex style={styles.listName}>
                                    <Flex.Item>
                                        {
                                            info.hasticket?
                                                <Button style={styles.mybutton}>
                                                    <Text style={styles.mytext}>收据</Text>
                                                </Button>
                                                :null
                                        }
                                    </Flex.Item>
                                    <Flex.Item>
                                        <Text style={styles.listText}>{info.data}</Text>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <Text>{info.type}</Text>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <Text style={styles.listText}>{`${info.money}元`}</Text>
                                    </Flex.Item>
                                </Flex>
                            </View>
                        )
                    })
                }
                {
                    // data && data.length > 3 ?
                    isShowButton?
                        <View style={styles.toggleBtn}>
                            <TouchableOpacity style={styles.touchPlace} onPress={() => {
                                this.clickToggleShow()
                            }}>
                                <Text  style={styles.btnText}>
                                    {
                                        ifShowAll?
                                            <Icon type={'\uE61E'} color={'#A9B7B6'} size={'md'}/>:
                                            <Icon type={'\uE61D'} color={'#A9B7B6'} size={'md'}/>
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>:
                        null
                }
            </ScrollView>
        )
    }
    renderTabsList = (data) => {
        //渲染请假列表
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
                            <Flex style={styles.listItem}>
                                <Flex.Item style={styles.infoWrap}>
                                    <Flex style={styles.listName}>
                                        <Text style={styles.listText} numberOfLines={1}>
                                            {info.lv_type_desc + '(' + info.dur_days + '天）'}
                                        </Text>
                                    </Flex>
                                    <View style={styles.listPhone}>
                                        <Text style={styles.phoneText} numberOfLines={1}>
                                            {formatBeginTime + beginStr + '到' + formatEndTime + endStr}
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
                    })
                }
            </ScrollView>
        )
    }
    renderNoData = (str) => {
        //暂无数据
        return(
            <View style={styles.noDataWrap}>
                <Text  style={styles.noDataIcon}>
                    <Icon type={'\uE6A8'} color={'#33CC99'} size={'lg'}/>
                </Text>
                <Text style={styles.textInfo}>
                    {str}
                </Text>
            </View>
        )
    }
    componentWillMount() {
        const time = new Date().getTime()
        //进行数据请求
        const month = format(time, 'yyyy-MM')
        this.props.User.getClaimsList(month)
    }
    render() {
        const {time} = this.state;
        const {passClaimsList, submitClaimsList, approveClaimsList, rejectClaimsList, cancelClaimsList, saveClaimsList} = this.props.User;
        const tabs = [
            { title: '保存', sub: 'PC' },
            { title: '已提交', sub: 'PE' },
            { title: '审批中', sub: 'PD' },
            { title: '审批不通过', sub: 'PD' },
            { title: '取消', sub: 'PD' },
        ];

        const data1 = [
            {hasticket:1,data:'2017-12-12',type:'餐费',money:'140.00'},
            {hasticket:1,data:'2017-2-12',type:'交通费',money:'30.00'},
            {hasticket:0,data:'2017-10-12',type:'通讯费',money:'60.00'},
            {hasticket:1,data:'2017-11-12',type:'餐费',money:'90.00'},
            {hasticket:0,data:'2017-10-12',type:'报销费',money:'990.00'},
            {hasticket:1,data:'2017-12-12',type:'餐费',money:'7770.00'}
        ];

        return(
            <ScrollView>
                {
                    this.renderTitle(time)
                }
                {
                    // passClaimsList && passClaimsList.length?
                    data1?
                        this.renderLeaveItem(data1):
                        this.renderNoData('暂无报销审批通过信息')
                }
                <Tabs
                    tabs={tabs}
                    swipeable={false}
                    //animated={false} //TODO 取消动画居然会影响activetab切换
                    tabBarActiveTextColor={gColors.brandPrimary}
                    tabBarUnderlineStyle={{ backgroundColor: gColors.brandPrimary }}
                >
                    {
                        saveClaimsList && saveClaimsList.length?
                            this.renderTabsList(submitClaimsList):
                            this.renderNoData('暂无保存的报销信息')
                    }
                    {
                        submitClaimsList && submitClaimsList.length?
                            this.renderTabsList(submitClaimsList):
                            this.renderNoData('暂无提交的报销信息')
                    }
                    {
                        approveClaimsList && approveClaimsList.length?
                            this.renderTabsList(approveClaimsList):
                            this.renderNoData('暂无审批中的报销信息')
                    }
                    {
                        rejectClaimsList && rejectClaimsList.length?
                            this.renderTabsList(rejectClaimsList):
                            this.renderNoData('暂无审批不通过的报销信息')
                    }
                    {
                        cancelClaimsList && cancelClaimsList.length?
                            this.renderTabsList(cancelClaimsList):
                            this.renderNoData('暂无取消的报销信息')
                    }
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
        backgroundColor: '#fff'
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
        height: 50,
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
        color:'#999'
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
    },
    noDataWrap: {
        height: 200,
        backgroundColor: '#fff'
    },
    noDataIcon: {
        height: 150,
        lineHeight: 180,
        textAlign: 'center'
    },
    textInfo: {
        textAlign: 'center'
    },
    mybutton: {
        width:50,
        height:25,
        borderColor:'#5200ff',
        paddingLeft:0,
        paddingRight:0
    },
    mytext: {
        fontSize:16,
        color:'#5200ff'
    }
});