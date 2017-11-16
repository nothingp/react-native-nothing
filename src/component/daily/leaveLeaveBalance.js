import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    StatusBar
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
import ApprovingButton from '../task/approvingButton';
import ApprovingHistory from '../task/approvingHistory';

//引入第三方库
import { format } from '../../util/tool';
import { renderNameItem, renderRemark, renderHeadIconItem } from '../task/common/index';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '假期余额'
    });

    componentWillMount() {
        let { True } = this.props;
        True.leaveLeavebalanceApiAction();
    }

    render() {
        let { True, navigator } = this.props;
        const { leaveLeavebalanceData = [] } = True;

        return (
            <ScrollView>
                {
                    leaveLeavebalanceData.map(
                        (v, i) => {
                            return (
                                <View key={i}>
                                    <View>
                                        <List>
                                            <Item extra={`还剩${v.balance}天`}>
                                                {v.lv_type_desc}
                                            </Item>
                                        </List>
                                        <View style={styles.view}>
                                            <Text style={styles.text}>
                                                上年度剩余假期: {v.lv_opening}天
                                            </Text>
                                            <Text style={styles.text}>
                                                本年度有效假期: {v.lv_entitlement}天
                                            </Text>
                                            <Text style={styles.text}>
                                                已休假期: {v.lv_taken}天
                                            </Text>
                                        </View>
                                    </View>
                                    <WhiteSpace size="lg"/>
                                </View>

                            )
                        }
                    )
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
    },
    text: {
        paddingTop: 10,
        color: '#949494',
        paddingBottom: 10,
        fontSize: 16,
    },
});

export default createForm()(Index);