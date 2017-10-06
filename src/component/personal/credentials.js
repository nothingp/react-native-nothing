/**
 * 查看证件
 **/

import React, {PureComponent} from 'react';
import {Flex, List, NoticeBar} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

import {
    View,
    StyleSheet,
    Text,
    PixelRatio
} from 'react-native';

import {Item} from './common/index';
import navigator from '../../decorators/navigator'

@navigator
@inject('User')
@observer
export default class Index extends PureComponent{
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentWillMount() {
        //设置头部
        this.props.navigator.setButtons({
            rightButtons: [{
                title: '编辑', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }], // see "Adding buttons to the navigator" below for format (optional)
            animated: false // does the change have transition animation or does it happen immediately (optional)
        });
        //设置底部
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
        //获取个人证件信息
        this.props.User.getIdentity();
    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditCred',
                    title: '编辑证件信息'
                })
            }
        }
    }
    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        const {selfIdentity} = this.props.User;

        let idNo = ''; //
        let cossNo = ''; //
        let housingFundNo = ''; //
        let status = '';

        if(selfIdentity){
            const {id_no, coss_no, housing_fund_no} = selfIdentity;
            idNo = id_no;
            cossNo = coss_no;
            housingFundNo = housing_fund_no;
            status = selfIdentity.status
        }

        return(
            <View>
                {
                    status == 'N' || status == 'P' ?
                        <NoticeBar>
                            您的信息已经提交成功，等待审核中。
                        </NoticeBar>:
                        status == 'R'?
                            <NoticeBar>
                                您的信息已被拒绝，请重新完善信息。
                            </NoticeBar>:
                            null
                }
                <Item name="身份证：" text={idNo}/>
                <Item name="社保电脑号：" text={cossNo}/>
                <Item name="住房公积金号：" text={housingFundNo}/>
            </View>
        )
    }
}