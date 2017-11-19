/**
 * 头部进度组件
 **/

import React, {Component} from 'react';

import {
    View,
    StyleSheet
} from 'react-native';
import {
    Icon
} from 'antd-mobile';

export default class Index extends Component{
    renderTitle() {
        <View>
            <View>
                <Icon/>
            </View>
            <View>

            </View>
        </View>
    }
    render() {
        const {status} = this.props;

        return(
            <View>
                {
                    status == 'N'?
                        <NoticeBar>
                            您的信息已提交成功，等待审批中。
                        </NoticeBar>:
                        status == 'P'?
                            <NoticeBar>
                                您的信息正在审批中。
                            </NoticeBar>:
                            status == 'R'?
                                <NoticeBar>
                                    您的信息已审批不通过。
                                </NoticeBar>:
                                status == 'A'?
                                    <NoticeBar>
                                        您的信息已审批通过。
                                    </NoticeBar>:
                                    null
                }
            </View>
        )
    }
}

const styles = StyleSheet({
    titleWrap: {
        display: 'flex',
    },
    tlIcon: {
        width: 50,
        textAlign: 'center'
    }
})