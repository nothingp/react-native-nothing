
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

@inject('User','True')
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
        const timeStr = time? format(time, 'yyyy-MM'):format(new Date().getTime(), 'yyyy-MM');
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
                        return (
                            <View key={i} style={styles.infoWrap2}>
                                <Flex style={[styles.listName, styles.listBackground]}>
                                    <Text onClick={ ()=>{this.goDetail(info, 'A')} }>
                                        {`${format(parseInt(info.submission_date), 'yyyy-MM-dd')}共(${info.amount}元)`}
                                    </Text>
                                </Flex>
                                {
                                    info.claimitems && info.claimitems.map((v, i) => {
                                        return (
                                            <Flex style={styles.listName}>
                                                <Flex.Item>
                                                    {
                                                        v.receipt?
                                                            <Button style={styles.mybutton}>
                                                                <Text style={styles.mytext}>收据</Text>
                                                            </Button>
                                                            :null
                                                    }
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text style={styles.listText}>{format(parseInt(v.as_of_date), 'yyyy-MM-dd')}</Text>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text>{this.getItemType(v.claim_item)}</Text>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text style={styles.listText}>{`${v.amount}元`}</Text>
                                                </Flex.Item>
                                            </Flex>
                                        )}
                                    )
                                }
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

    goDetail = (info) => {
        this.props.True.claimsDetailDataAction(info);
        this.props.navigation.navigate('ClaimsDetail', { info });
    }

    renderTabsList = (data) => {
        //渲染各项报销列表
        return(
            <ScrollView>
                {
                    data && data.map((info, i) => {
                        return (
                            <View key={i} style={styles.infoWrap2}>
                                <Flex style={[styles.listName, styles.listBackground]}>
                                    {/*<Flex.Item>*/}
                                        <Button onClick={ ()=>{this.goDetail(info)}} style={styles.titleButton}>
                                            <Text style={{textAlign:'left'}}>
                                                {`${format(parseInt(info.submission_date), 'yyyy-MM-dd')}共(${info.amount}元)`}
                                            </Text>
                                        </Button>
                                    {/*</Flex.Item>*/}
                                </Flex>
                                {
                                    info.claimitems && info.claimitems.map((v, k) => {
                                        return (
                                            <Flex style={styles.listName} key={k}>
                                                <Flex.Item>
                                                    {
                                                        v.receipt?
                                                            <Button style={styles.mybutton}>
                                                                <Text style={styles.mytext}>收据</Text>
                                                            </Button>
                                                            :null
                                                    }
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text style={styles.listText}>{format(parseInt(v.as_of_date), 'yyyy-MM-dd')}</Text>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text>{this.getItemType(v.claim_item)}</Text>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Text style={styles.listText}>{`${v.amount}元`}</Text>
                                                </Flex.Item>
                                            </Flex>
                                        )}
                                    )
                                }
                            </View>
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

    //报销类型转换
    getItemType = (type) => {
        let { claimsClaimitemsData } = this.props.True;
        const { claim_item } = claimsClaimitemsData;
        let item = '';
        console.log(claim_item);
        claim_item && claim_item.map((v, i) => {
            if (v.item_code == type) {
                item = v.item_name;
            }
        })
        console.log(item);
        return item;
    }

    componentWillMount() {
        const time = new Date().getTime()
        //进行数据请求
        const month = format(time, 'yyyy-MM')
        this.props.User.getClaimsList(month);
        this.props.True.claimsClaimitemsApiAction();
        // console.log([...this.props.User.saveClaimsList])
    }
    render() {
        const {time} = this.state;
        const {passClaimsList, submitClaimsList, approveClaimsList, rejectClaimsList, cancelClaimsList, saveClaimsList} = this.props.User;
        const tabs = [
            { title: '保存', sub: 'PC' },
            { title: '已提交', sub: 'PE' },
            { title: '审批中', sub: 'PD' },
            { title: '不通过', sub: 'PD' },
            { title: '取消', sub: 'PD' },
        ];

        const data1 = [
            // {hasticket:1,data:'2017-12-12',type:'餐费',money:'140.00'},
            // {hasticket:1,data:'2017-2-12',type:'交通费',money:'30.00'},
            // {hasticket:0,data:'2017-10-12',type:'通讯费',money:'60.00'},
            // {hasticket:1,data:'2017-11-12',type:'餐费',money:'90.00'},
            // {hasticket:0,data:'2017-10-12',type:'报销费',money:'990.00'},
            // {hasticket:1,data:'2017-12-12',type:'餐费',money:'7770.00'}
        ];

        return(
            <ScrollView>
                {
                    this.renderTitle(time)
                }
                {
                    passClaimsList && passClaimsList.length?
                    // data1&&data1.length?
                        this.renderLeaveItem(passClaimsList):
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
                        // data1&&data1.length?
                            this.renderTabsList(saveClaimsList):
                            // this.renderTabsList(data1,'S'):
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
        // height: 50,
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: '#e1e1e1',
        backgroundColor: '#fff'
    },
    listName: {
        height: 50,
        overflow: 'hidden',
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: '#e1e1e1',
        paddingLeft: 10
    },
    listBackground: {
        backgroundColor: "#E3E3E3",
        paddingLeft: 10,
        marginTop: 10,
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
        paddingTop: 60,
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
    },
    titleButton: {
        backgroundColor: '#E3E3E3',
        borderWidth: 0,
        // textAlign: 'left',
        // width: '100%'
    }
});