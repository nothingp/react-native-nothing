import React, { Component } from 'react';
import {
    View,
    StyleSheet
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
            <View style={styles.image}>
                <InputItem
                >姓名</InputItem>
                <InputItem
                >手机号码</InputItem>
                <InputItem
                    {...getFieldProps('preice2')}
                    placeholder="请输入"
                >证件类型</InputItem>
                <InputItem
                    {...getFieldProps('preice3')}
                    placeholder="请输入"
                >证件号码</InputItem>
                <InputItem
                    {...getFieldProps('preice4')}
                    placeholder="请输入"
                >联系地址</InputItem>
                <InputItem
                    {...getFieldProps('preice5')}
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

const styles = StyleSheet.create({
    image: {
        backgroundColor:'green'
    },
    button: {
        width: 110,
        height: 110,
        borderRadius: 90
    },
    list: {
        height:15
    }
});

export default createForm()(Index);

