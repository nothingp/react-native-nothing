import React, { Component } from 'react';
import moment from 'moment';
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

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    onChange = (selectObj) => {
        let { True } = this.props;
        True.taskSelectType = selectObj;
        True.activeKey = 'PE';
        Toast.loading('loading');
        True.taskListAction();
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

    render() {
        const { True } = this.props;
        const { taskSelectType } = True;
        const data = [
            {
                value: 'ALL',
                label: '所有',
            },
            {
                value: 'PP',
                label: '个人信息',
            },
            {
                value: 'LA',
                label: '假期',
            },
            {
                value: 'CA',
                label: '报销',
            },
            {
                value: 'TS',
                label: '工作时间表',
            },
            {
                value: 'LC',
                label: '可调休假',
            },
            {
                value: 'CL',
                label: '取消假期',
            },
        ];
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                            <List>
                                {
                                    data.map((v, i) => {
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
                        {taskSelectType.label}
                        <Icon type={'\ue61d'} color={'#fff'} size={'xs'}/>
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