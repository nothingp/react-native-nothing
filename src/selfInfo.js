import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { Flex, WhiteSpace,Icon,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;

class Index extends Component {


    render() {
        const { getFieldProps } = this.props.form;
        const creditType=[{value:'11',label:'123'}];
        return (
            <View >
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >姓名</InputItem>
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >手机号码</InputItem>
                <Picker data={creditType} cols={1}  {...getFieldProps('preice')}>
                    <List.Item   placeholder="请输入"  arrow="horizontal">证件类型</List.Item>
                </Picker>
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >证件类型</InputItem>
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >证件号码</InputItem>
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >联系地址</InputItem>
                <InputItem
                    {...getFieldProps('preice')}
                    placeholder="请输入"
                >主题</InputItem>
                <Button type="primary"  onPressIn={()=>{this.props.navigator.push({
                            screen: 'Result',
                            title: '结果',
                        })}}>提交</Button>
            </View>

        )
    }
}

export default createForm()(Index);

