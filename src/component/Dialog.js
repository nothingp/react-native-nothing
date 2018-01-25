import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';
import BaseComponent from './BaseComponent';

const { width, height } = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [270, 108];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

/**
 * Dialog组件
 * <Dialog ref="dialog" callback={this.callback.bind(this)}/>
 * 调用show方法，调起组件   this.refs.dialog.show("确定删除吗");
 */

export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            title: "",
            hide: true,
        };
    }

    render() {
        if (this.state.hide) {
            return (<View/>)
        } else {
            return (
                <View style={styles.container}>
                    <Animated.View style={styles.mask}>
                    </Animated.View>

                    <Animated.View
                        style={
                            [
                                styles.tip,
                                {
                                    transform: [
                                        {
                                            translateY: this.state.offset.interpolate(
                                                {
                                                    inputRange: [0, 1, 2],
                                                    outputRange: [0, middleTop, height]
                                                }
                                            ),
                                        }
                                    ]
                                }
                            ]
                        }
                    >

                        <View style={styles.tipTitleView}>
                            <Text style={styles.tipTitleText}>
                                {'提交'}
                            </Text>
                        </View>

                        <View style={styles.tipContentView}>
                            <Text style={styles.tipContentText}>
                                {this.state.title}
                            </Text>
                        </View>

                        <View style={styles.btnView}>
                            <TouchableHighlight
                                style={styles.cancelBtnView}
                                underlayColor='#f0f0f0'
                                onPress={this.cancelBtn}
                            >
                                <Text style={styles.cancelBtnText}>
                                    取消
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.okBtnView}
                                underlayColor='#f0f0f0'
                                onPress={this.okBtn}
                            >
                                <Text style={styles.okBtnText}>
                                    确定
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </Animated.View>
                </View>
            );
        }
    }

    //显示动画
    in = () => {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out = () => {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 2,
                }
            )
        ]).start();

        setTimeout(
            () => {
                this.setState({
                    hide: true
                });
                //还原到顶部
                Animated.timing(
                    this.state.offset,
                    {
                        easing: Easing.linear,
                        duration: 500,
                        toValue: 0,
                    }
                ).start();
            },
            500
        );
    }

    //取消
    cancelBtn = (event) => {
        if (!this.state.hide) {
            this.out();
        }
    }

    //选择
    okBtn = () => {
        if (!this.state.hide) {
            this.out();
            setTimeout(
                () => {
                    let { callback } = this.props;
                    callback.apply(null, []);
                },
                500
            );
        }
    }

    /**
     * 弹出控件
     * title: 标题
     */
    show = (title: string) => {
        if (this.state.hide) {
            this.setState({
                    title: title,
                    hide: false
                },
                this.in
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.8,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    tip: {
        width: aWidth,
        height: aHeight,
        left: middleLeft,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
    },
    tipTitleView: {
        marginTop: 20,
        width: aWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tipContentView: {
        width: aWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1 / 2,
        borderColor: '#999',
    },
    tipTitleText: {
        color: "#333333",
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    tipContentText: {
        color: "#333333",
        fontSize: 16,
        marginTop: 20,
        marginBottom: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    btnView: {
        flexDirection: 'row',
        height: 44,
    },
    cancelBtnView: {
        width: aWidth / 2,
        height: 44,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1 / 2,
        borderColor: '#e4e4e4',
    },
    cancelBtnText: {
        fontSize: 16,
        color: "#333",
        textAlignVertical: 'center',
        textAlign: "center",
    },
    okBtnView: {
        width: aWidth / 2,
        height: 44,
        //backgroundColor: '#3ba662',
        alignItems: 'center',
        justifyContent: 'center',
    },
    okBtnText: {
        fontSize: 16,
        color: "#fff",
        textAlignVertical: 'center',
        textAlign: "center",
    },
});
