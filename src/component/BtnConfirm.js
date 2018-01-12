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
import BaseComponent from './BaseComponent'
import { gColors } from '../common/GlobalContants'

const Item = List.Item;
const Brief = Item.Brief;

export default class Index extends BaseComponent {//todo 不能写注释在这里；不然无法继承

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    setModalVisible = (visible, cb) => {
        this.setState({ visible });
        cb && cb();
    }

    btnTxt = '退出';

    title = '提交';

    massage = '提交的内容是。。。。';

    okTxt = '确定';

    okFn = () => {
        console.log('ok',);
    }

    cancelTxt = '取消';

    cancelFn = () => {
        console.log('cancel',);
    }

    render() {
        let {
            btnTxt,
            title,
            massage,
            okTxt,
            okFn,
            cancelTxt,
            cancelFn
        } = this;
        return (
            <View>
                <Modal
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        console.log('modal')
                    }}
                >
                    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                height: 180,
                                width: '80%',
                                position: 'relative'
                            }}>
                                <WhiteSpace/>
                                <Flex>
                                    <Flex.Item style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 5,
                                        marginBottom: 20
                                    }}>
                                        <Text style={{ fontSize: 18 }}> {title}</Text>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace/>
                                <Flex>
                                    <Flex.Item style={{
                                        height: 30,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text> {massage}</Text>
                                    </Flex.Item>
                                </Flex>
                                <WhiteSpace/>

                                <Flex style={{ position: 'absolute', bottom: 0, left: 0 }}>
                                    <Flex.Item style={{ borderTopWidth: 1, borderTopColor: '#ddd' }}>
                                        <Button style={styles.cancelbutton}
                                                onPressIn={() =>
                                                    this.setModalVisible(!this.state.visible, cancelFn)
                                                }>
                                            <Text style={{ fontSize: 16 }}>{cancelTxt}</Text>
                                        </Button>
                                    </Flex.Item>
                                    <Flex.Item style={{ borderTopWidth: 1, borderTopColor: '#3ba662' }}>
                                        <Button style={styles.okbutton}
                                                onPressIn={() =>
                                                    this.setModalVisible(!this.state.visible, okFn)
                                                }>
                                            <Text style={{ color: '#fff', fontSize: 16 }}>{okTxt}</Text>
                                        </Button>
                                    </Flex.Item>
                                </Flex>

                                <WhiteSpace/>
                            </View>
                        </View>

                    </View>
                </Modal>
                <View>
                    <Button type="primary"
                            style={styles.button}
                            onPressIn={() =>
                                this.setModalVisible(true)
                            }>
                        <Text>{btnTxt}</Text>
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
    button: {
        backgroundColor: gColors.brandPrimary,
        borderColor: gColors.brandPrimary,
        height: 40
    },
    cancelbutton: {
        backgroundColor: '#fff',
        borderWidth: 0,
        height: 40,
        borderRadius: 0,
        borderBottomLeftRadius: 5,
    },
    okbutton: {
        backgroundColor: gColors.brandPrimary,
        borderColor: 'transparent',
        borderWidth: 0,
        height: 40,
        borderRadius: 0,
        borderBottomRightRadius: 5,
    }
});