/**
 * 紧急联系人
 */

import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Image

} from 'react-native';


import { Flex, WhiteSpace,Icon,Grid,Button,List, WingBlank, Modal,ActionSheet,InputItem} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';

@inject('User')
@observer

export default class Index extends Component{
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
        //请求紧急号码信息
        this.props.User.getRelationShip();
    }
    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditAddress',
                    title: '编辑地址'
                })
            }
        }
    }
    render() {
        const {relationShipInfo} = this.props.User;
        let name = '',
            phone = '';
        if(relationShipInfo) {
            name = relationShipInfo.chinese_name
            phone = relationShipInfo.contact_no;
        }
        return(
            <View>
                <List>
                    <InputItem value={name? name: ''} editable={false}><Text style={styles.listName}>姓名：</Text></InputItem>
                    <InputItem value={phone? phone: ''} editable={false}><Text style={styles.listName}>电话号码：</Text></InputItem>
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listName: {
        marginRight: 100,
        width: 150,
    },
});