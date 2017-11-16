
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Checkbox,
} from 'react-native';

import {RequireData} from '../../personal/common/index';
import { List,Picker, DatePicker, Flex, InputItem, Button} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import Base from '../../../stores/Base'
import {format} from '../../../common/Tool';
// import Flex from "antd-mobile/es/flex/Flex.d";

const CheckboxItem = Checkbox.CheckboxItem;

@inject('User', 'Common')
@observer
class Index extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'department',
        headerRight: (
            <Button>
                <Text>OK</Text>
            </Button>
        ),
    });

    constructor(props){
        super(props);

    }

    componentWillMount(){
        const { gl_type, i } = this.props.navigation.state.params;
        this.props.Common.getClaimsJobNew(gl_type,i);
    }

    checked = (i)=> {
        this.props.Common.getSelectClaimsItem(i);
    }

    render() {
        const { getFieldProps } = this.props.form;

        const {claimsType, claimsDetail, claimsJob, claimsDepartment, claimsGroup, claimsTeam, claimsPayment, currencyList} = this.props.Common;

        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];

        return (
            <ScrollView>
                {
                    data&&data.map((v,i) => {
                        return (
                            <View key={i}>
                                <CheckboxItem key={v.value} onChange={() => {
                                    this.checked(i)
                                }}>
                                    {v.label}
                                </CheckboxItem>
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