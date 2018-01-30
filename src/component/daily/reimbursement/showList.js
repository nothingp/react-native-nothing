
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import {RequireData} from '../../personal/common/index';
import { List,Picker, DatePicker, Flex, Button} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import Base from '../../../stores/Base'
import {format} from '../../../common/Tool';
// import Flex from "antd-mobile/es/flex/Flex.d";

@inject('User', 'Common')
@observer
class Index extends Component{
    static navigationOptions = ({ navigation }) => {
        const { gl_seg_label } = navigation.state.params;
        return {
            title: gl_seg_label,
        }
    };

    constructor(props){
        super(props);

    }

    componentWillMount(){
        const { gl_type, gl_seg_label, i } = this.props.navigation.state.params;
        this.props.Common.claimsItemArr = [];
        this.props.Common.getClaimsJobNew(gl_type,i);
    }

    checked = (v)=> {

        const { i } = this.props.navigation.state.params;
        console.log(i)
        this.props.Common.getSelectClaimsItem(v,i);
        this.props.Common.claimsItemArr = [];
        // console.log(this.props.Common.claimsItemArrSelected[k]);
        this.props.navigation.goBack();
        // console.log([...this.props.Common.claimsDepartment])
    }

    render() {
        const { getFieldProps } = this.props.form;

        const {claimsType, claimsDetail, claimsJob, claimsDepartment, claimsGroup, claimsTeam, claimsPayment, currencyList, claimsItemArr} = this.props.Common;

        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];

        return (
            <ScrollView>
                {
                    claimsItemArr&&claimsItemArr.map((v,k) => {
                        return (
                            <View key={k}>
                                <List.Item
                                    onClick={() => this.checked(v)}
                                >
                                    {v.label}
                                </List.Item>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({

})

export default createForm()(Index);