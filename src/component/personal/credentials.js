/**
 * 查看证件
 **/

import React, {PureComponent} from 'react';
import { inject, observer } from 'mobx-react/native';

import {
    View,
} from 'react-native';

import {Item, NoticeBarMessage} from './common/index';

@inject('User')
@observer
export default class Index extends PureComponent{
    static navigationOptions = ({ navigation }) => ({
        title:'证件',
    });
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.User.getIdentity();
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
            <View style={{backgroundColor:'#fff'}}>
                <NoticeBarMessage status={status}/>
                <Item name="身份证：" text={idNo}/>
                <Item name="社保电脑号：" text={cossNo}/>
                <Item name="住房公积金号：" text={housingFundNo}/>
            </View>
        )
    }
}