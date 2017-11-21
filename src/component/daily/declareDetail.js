/**
 * 可调休申报详情页
 */

import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { inject, observer } from 'mobx-react/native';
import {Item} from './common/index';
import TitleButton from './common/declareDetailButton';
import {format} from '../../common/Tool';
import RateTitle from './common/rateTitle';

@inject('User')
@observer
export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:'申报详情',
        headerRight: (
            <TitleButton navigation={navigation}/>
        ),
    });

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //请求可申报详情信息
        this.props.User.getLeaveawardDetail();
    }
    render() {
        const {selectAdjDetail} = this.props.User;
        console.log(selectAdjDetail)
        let lv_claims_type_desc = '',
            as_of_date = '',
            lv_adj_value = '';

        if(selectAdjDetail){
            lv_claims_type_desc = selectAdjDetail.lv_claims_desc? selectAdjDetail.lv_claims_desc:selectAdjDetail.lv_claims_type_desc;
            as_of_date = format(parseInt(selectAdjDetail.as_of_date), 'yyyy-MM-dd');
            lv_adj_value = selectAdjDetail.lv_adj_value;
        }
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
                <RateTitle/>
                <Item name="可调休假申报项：" text={lv_claims_type_desc}/>
                <Item name="生效日期：" text={as_of_date}/>
                <Item name="假期调整：" text={lv_adj_value}/>
            </ScrollView>

        )
    }
}
