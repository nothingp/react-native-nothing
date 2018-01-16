import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    PixelRatio,
    TouchableHighlight,
    ScrollView,
    TextInput,
    Navigator,
    StatusBar
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    PickerView,
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
    Popover,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import { format } from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    onChange = (selectObj) => {
        const { True } = this.props;
        const { staff_no } = True.leaveLeaveinfoDetail;

        True.recentLeaveType = selectObj;
        Toast.loading('加载中');
        True.leaveRecentLeaveApiAction(selectObj.value, staff_no);
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getMonthData = () => {
        const nowTime = new Date().getTime();
        const sixMonth = format((nowTime - 6 * 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        const threeMonth = format((nowTime - 3 * 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        const oneMonth = format((nowTime - 1 * 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        const halfMonth = format((nowTime - 0.5 * 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');

        const data = [
            {
                value: sixMonth,
                label: '近6个月',
            },
            {
                value: threeMonth,
                label: '近3个月',
            },
            {
                value: oneMonth,
                label: '近1个月',
            },
            {
                value: halfMonth,
                label: '近半月',
            },
        ];
        return data;
    }

    render() {
        const { True } = this.props;
        const { recentLeaveType } = True;

        return (
            <View>
                <Modal
                    //animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('close')
                    }}
                >
                    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                            <List>
                                {
                                    this.getMonthData().map((v, i) => {
                                        return (
                                            <Item key={i}
                                                  onClick={() => {
                                                      this.onChange(v);
                                                      this.setModalVisible(!this.state.modalVisible)
                                                  }}>
                                                {v.label}
                                            </Item>
                                        )
                                    })
                                }
                            </List>
                        </View>
                    </View>
                </Modal>
                <View>
                    <Button type="primary"
                            style={styles.button}
                            onPressIn={() =>
                                this.setModalVisible(true)
                            }>
                        <Text style={{ fontSize: 14 }}>{recentLeaveType.label}</Text>
                        <Icon type={'\ue61d'} color={'#fff'} size={'xxs'}/>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3ba662',
        borderColor: '#3ba662',
        height: 40
    }
});


export default createForm()(Index);
