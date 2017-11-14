import React, { Component } from 'react';
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
    List,
    Toast,
} from 'antd-mobile';
import { format } from '../../../util/tool';
import { inject, observer } from 'mobx-react/native';
import { gColors } from '../../../common/GlobalContants';

@inject('True')
@observer
export default class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '我的薪酬'
        }
    };

    constructor(props) {
        super(props);
        const currentYear = format(new Date().getTime(), 'yyyy');
        this.state = {
            currentYear,
        }
    }

    clickAddYear = (num) => {
        const year = (Number(this.state.currentYear) + num).toString();
        this.setState({
            currentYear: year
        })
        this.props.True.payslipApiAction(year);
    }

    renderTitle = () => {
        const { currentYear } = this.state;
        return (
            <Flex style={styles.titleWrap}>
                <Flex.Item></Flex.Item>
                <Flex.Item style={styles.centerContent}>
                    <Flex>
                        <Flex.Item>
                            <TouchableOpacity onPress={
                                () => {
                                    this.clickAddYear(-1)
                                }}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    <Icon type={'\ue620'} color={'#A9B7B6'} size={'xxs'}/>
                                </Text>
                            </TouchableOpacity>
                        </Flex.Item>
                        <Flex.Item>
                            <Text>
                                {currentYear}
                            </Text>
                        </Flex.Item>
                        <Flex.Item>
                            <TouchableOpacity
                                onPress={() => {
                                    this.clickAddYear(1)
                                }}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    <Icon type={'\ue61f'} color={'#A9B7B6'} size={'xxs'}/>
                                </Text>
                            </TouchableOpacity>
                        </Flex.Item>
                    </Flex>
                </Flex.Item>
                <Flex.Item></Flex.Item>
            </Flex>
        )
    }

    componentWillMount() {
        const { True } = this.props;
        True.payslipApiAction(this.state.currentYear);
    }

    onClick = (v) => {
        let { True, navigation } = this.props;
        True.pdfUrlData = v;
        Toast.loading('loading');
        console.log('True.pdfUrlData', True.pdfUrlData);
        navigation.navigate('PdfWebView', { title: v.pay_period });
    }

    render() {
        const { True, navigation } = this.props;
        const { payslipData } = True;
        return (
            <ScrollView>
                {
                    this.renderTitle()
                }
                <List>
                    {
                        payslipData.map((v, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    arrow="horizontal"
                                    onClick={
                                        () => {
                                            this.onClick(v)
                                        }
                                    }
                                >
                                    <Text style={{ paddingBottom: 10, paddingTop: 10 }}>
                                        {v.pay_period}
                                        (
                                        {format(v.period_bgn_date, 'yyyy-MM-dd')}
                                        至
                                        {format(v.period_end_date, 'yyyy-MM-dd')}
                                        )
                                    </Text>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    centerContent: {
        flex: 2
    },
    titleWrap: {
        height: 40,
        backgroundColor: '#E3E3E3'
    },
});