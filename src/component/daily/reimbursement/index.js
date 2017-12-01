import React, { PureComponent } from 'react';
import { autorun } from 'mobx';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    PixelRatio,
} from 'react-native';
import {
    Button,
    Icon,
    Flex,
    Tabs,
    List
} from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import { format } from '../../../common/Tool';
import { inject, observer } from 'mobx-react/native';
import { gColors } from '../../../common/GlobalContants';
import ClaimsBtn from './common/ClaimsBtn';
import ImgViewer from '../../../component/ImgViewer';

@inject('User', 'True', "Base")
@observer
export default class Index extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '我的报销',
            headerRight: (
                <ClaimsBtn navigation={navigation}/>
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
        const { time } = this.state;
        const formatTime = new Date(time)
        num = parseInt(num)
        const endTime = formatTime.setMonth(formatTime.getMonth() + num);
        //进行数据请求切换
        const month = format(endTime, 'yyyy-MM')
        this.props.User.getClaimsList(month)
        //请求用户数据
        this.setState({
            time: endTime
        })
    }

    renderTitle = (time) => {
        const timeStr = time ? format(time, 'yyyy-MM') : format(new Date().getTime(), 'yyyy-MM');
        return (
            <Flex style={styles.titleWrap}>
                <Flex.Item>
                </Flex.Item>
                <Flex.Item style={styles.centerContent}>
                    <Flex>
                        <Flex.Item style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => {
                                this.clickAddMonth(-1)
                            }}>
                                <Text style={{ textAlign: 'center' }}>
                                    <Icon type={'\ue620'} color={'#A9B7B6'} size={'md'}/>
                                </Text>
                            </TouchableOpacity>
                        </Flex.Item>
                        <Flex.Item style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                {timeStr}
                            </Text>
                        </Flex.Item>
                        <Flex.Item style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => {
                                this.clickAddMonth(1)
                            }}>
                                <Text style={{ textAlign: 'center' }}>
                                    <Icon type={'\ue61f'} color={'#A9B7B6'} size={'md'}/>
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
        const { ifShowAll } = this.state;
        let data3 = data.slice(0, 3);
        data = ifShowAll ? data : data3;
        return (
            <ScrollView>
                {
                    data && data.map((info, i) => {
                        return (
                            <View key={i} style={styles.infoWrap2}>
                                <View style={[styles.listBackground]}>
                                    <Button
                                        onClick={() => {
                                            this.goDetail(info, 'A')
                                        }}
                                        style={styles.titleButton}
                                    >
                                        <Text style={{ color: '#888', fontSize: 14 }}>
                                            {`${format(parseInt(info.submission_date), 'yyyy-MM-dd')} 共(${info.amount || 0}元)`}
                                        </Text>
                                    </Button>
                                </View>
                                {
                                    info.claimitems && info.claimitems.map((v, k) => {
                                            return (
                                                <List.Item
                                                    extra={
                                                        <Button
                                                            style={styles.mybutton}
                                                            activeStyle={styles.mybutton}
                                                            onPressIn={
                                                                () => {
                                                                    this.refs.img.show(v.receipt)
                                                                }
                                                            }
                                                        >
                                                            {
                                                                v.receipt ?
                                                                    <Icon type={'\ue676'} color={'#00f'} size={'sm'}/>
                                                                    : null
                                                            }
                                                        </Button>
                                                    }
                                                    onClick={() => {
                                                        this.itemGoDetail(v)
                                                    }}
                                                    key={k}
                                                >
                                                    <View style={
                                                        {
                                                            width: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }
                                                    }>
                                                        <View style={{ flex: 1.5 }}>
                                                            <Text style={styles.listText}>
                                                                {format(parseInt(v.as_of_date), 'yyyy-MM-dd')}
                                                            </Text>
                                                        </View>
                                                        <View style={{ flex: 1.5 }}>
                                                            <Text style={styles.listText}>
                                                                {this.getItemType(v.claim_item)}
                                                            </Text>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ fontSize: 14, color: '#888' }}>
                                                                {`${v.amount} 元`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </List.Item>
                                            )
                                        }
                                    )
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }

    //列表头部点击跳转
    goDetail = (info) => {
        this.props.True.claimsDetailDataAction(info);
        this.props.navigation.navigate('ClaimsDetail', { info });
    }

    // 列表项点击跳转
    itemGoDetail = (v) => {
        let { True, navigation } = this.props;
        True.claimitem = v;
        navigation.navigate('ClaimsItemDetail');
    }

    renderTabsList = (data) => {
        //渲染各项报销列表
        return (
            <ScrollView>
                {
                    data && data.map((info, i) => {
                        return (
                            <View key={i} style={styles.infoWrap2}>
                                <View style={[styles.listBackground]}>
                                    <Button
                                        onClick={() => {
                                            this.goDetail(info)
                                        }}
                                        style={styles.titleButton}
                                    >
                                        <Text style={{ color: '#888', fontSize: 14 }}>
                                            {`${format(parseInt(info.submission_date), 'yyyy-MM-dd')} 共(${info.amount || 0}元)`}
                                        </Text>
                                    </Button>
                                </View>
                                {
                                    info.claimitems && info.claimitems.map((v, k) => {
                                            return (
                                                <List.Item
                                                    extra={
                                                        <Button
                                                            style={styles.mybutton}
                                                            activeStyle={styles.mybutton}
                                                            onPressIn={
                                                                () => {
                                                                    this.refs.img.show(v.receipt)
                                                                }
                                                            }
                                                        >
                                                            {
                                                                v.receipt ?
                                                                    <Icon type={'\ue676'} color={'#00f'} size={'sm'}/>
                                                                    : null
                                                            }
                                                        </Button>
                                                    }
                                                    onClick={() => {
                                                        this.itemGoDetail(v)
                                                    }}
                                                    key={k}
                                                >
                                                    <View style={
                                                        {
                                                            width: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }
                                                    }>
                                                        <View style={{ flex: 1.5 }}>
                                                            <Text style={styles.listText}>
                                                                {format(parseInt(v.as_of_date), 'yyyy-MM-dd')}
                                                            </Text>
                                                        </View>
                                                        <View style={{ flex: 1.5 }}>
                                                            <Text style={styles.listText}>
                                                                {this.getItemType(v.claim_item)}
                                                            </Text>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ fontSize: 14, color: '#888' }}>
                                                                {`${v.amount} 元`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </List.Item>
                                            )
                                        }
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

    //报销类型转换
    getItemType = (type) => {
        let { claimsClaimitemsData } = this.props.True;
        const { claim_item } = claimsClaimitemsData;
        let item = '';
        claim_item && claim_item.map((v, i) => {
            if (v.item_code == type) {
                item = v.item_name;
            }
        })
        return item;
    }

    componentWillMount() {
        autorun(() => {
            if (!this.props.Base.userInfo) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' })
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        })

        const time = new Date().getTime()
        //进行数据请求
        const month = format(time, 'yyyy-MM')
        this.props.User.getClaimsList(month);
        this.props.True.claimsClaimitemsApiAction();
    }

    render() {
        const { time } = this.state;
        const {
            passClaimsList,
            submitClaimsList,
            approveClaimsList,
            rejectClaimsList,
            cancelClaimsList,
            saveClaimsList
        } = this.props.User;
        const tabs = [
            { title: '保存', sub: 'PC' },
            { title: '已提交', sub: 'PE' },
            { title: '审批中', sub: 'PD' },
            { title: '不通过', sub: 'PD' },
            { title: '取消', sub: 'PD' },
        ];

        return (
            <View style={{ backgroundColor: "#fff", height: '100%' }}>
                <View>
                    {
                        this.renderTitle(time)
                    }
                </View>
                <View style={{ height: '100%' }}>
                    <View style={{ height: '40%' }}>
                        {
                            passClaimsList && passClaimsList.length ?
                                this.renderLeaveItem(passClaimsList) :
                                this.renderNoData('暂无报销审批通过信息')
                        }
                    </View>
                    <View style={{ height: '60%' }}>
                        <Tabs
                            tabs={tabs}
                            swipeable={false}
                            tabBarActiveTextColor={gColors.brandPrimary}
                            tabBarUnderlineStyle={{ backgroundColor: gColors.brandPrimary }}
                        >
                            {
                                saveClaimsList && saveClaimsList.length ?
                                    this.renderTabsList(saveClaimsList) :
                                    this.renderNoData('暂无保存的报销信息')
                            }
                            {
                                submitClaimsList && submitClaimsList.length ?
                                    this.renderTabsList(submitClaimsList) :
                                    this.renderNoData('暂无提交的报销信息')
                            }
                            {
                                approveClaimsList && approveClaimsList.length ?
                                    this.renderTabsList(approveClaimsList) :
                                    this.renderNoData('暂无审批中的报销信息')
                            }
                            {
                                rejectClaimsList && rejectClaimsList.length ?
                                    this.renderTabsList(rejectClaimsList) :
                                    this.renderNoData('暂无审批不通过的报销信息')
                            }
                            {
                                cancelClaimsList && cancelClaimsList.length ?
                                    this.renderTabsList(cancelClaimsList) :
                                    this.renderNoData('暂无取消的报销信息')
                            }
                        </Tabs>
                    </View>
                </View>
                <ImgViewer ref="img"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerContent: {
        flex: 2,
    },
    titleWrap: {
        height: 40,
        backgroundColor: '#E3E3E3'
    },
    infoWrap2: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#e1e1e1',
        backgroundColor: '#fff',
        marginTop: 10
    },
    listBackground: {
        backgroundColor: "#E3E3E3",
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    listText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888'
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
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
        width: 30,
        paddingLeft: 0,
        paddingRight: 0
    },
    titleButton: {
        backgroundColor: '#E3E3E3',
        borderWidth: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start'
    }
});