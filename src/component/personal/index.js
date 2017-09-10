import React, { Component } from 'react';
import {observable, action, runInAction,computed,autorun} from 'mobx';
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
import { startLoginScreen } from '../../screens/index';
import { Flex, WhiteSpace,Icon,Grid,Button,List, WingBlank, Modal,ActionSheet,Toast} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../i18n/i18n';
import { getLanguages } from 'react-native-i18n'
import BaseComponent from '../BaseComponent'
import navigator from '../../decorators/navigator'

const Item = List.Item;
const Brief = Item.Brief;
const operation = Modal.operation;

const Separator = () => (
    <Flex
        style={styles.separator}
    />
);

@inject('User','Common','Base')
@observer
@navigator
export default class Index extends BaseComponent {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentWillMount() {
        this.props.navigator.setButtons({
            rightButtons: [{
                title: '退出', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                buttonColor: '#fff',
               }], // see "Adding buttons to the navigator" below for format (optional)
            animated: false // does the change have transition animation or does it happen immediately (optional)
        });

        autorun(() => {
            if (this.props.Base.userInfo) {
                this.props.User.getPersonalInfo();
                this.props.Common.getBaseData();
            }
        })
    }

    onNavigatorEvent=(event)=>{ //
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.Base.logout();
            }
        }
    }
    render() {
        let userName, //用户名
            position, //是否为管理员
            workNum, //工号
            imgUrl = 'https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'; //个人头像地址
        const {personalInfo} = this.props.User;
        const {userInfo} = this.props.Base;


        if(userInfo){
            const {staff_no} = userInfo;
            workNum = staff_no + '';
        }

        if(personalInfo){
            imgUrl = personalInfo.user_photo;
            position = personalInfo.position;
            userName = personalInfo.name;
        }

        var options = {
            title: 'Select Avatar'
        };


        return (
            <View>
                <Separator/>
                <View style={styles.personInfo}>
                    <View style={styles.imageWrap}>
                        <TouchableOpacity onPress={() => {
                            const BUTTONS = ['相册', '拍照', '取消'];
                            ActionSheet.showActionSheetWithOptions({
                                    options: BUTTONS,
                                    cancelButtonIndex: BUTTONS.length - 1
                                },(buttonIndex) => {
                                    if(buttonIndex==0){
                                        ImagePicker.launchImageLibrary(options, (response)  => {
                                            this.props.User.updateUserPhoto(response);
                                        });
                                    }else if(buttonIndex==1){
                                        ImagePicker.launchCamera(options, (response)  => {
                                            this.props.User.updateUserPhoto(response);
                                        });
                                    }

                            });
                        }}>
                        <Image style={styles.image} source={{uri: imgUrl}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContent}>
                        <List>
                            <Item
                                multipleLine
                                extra={<Brief>个人资料</Brief>}
                                arrow="horizontal"
                                onClick={() => this.props.navigator.push({
                                    screen: 'SelfInfo',
                                    title: '个人信息'
                                })}
                            >
                                <Text style={styles.personName}>{userName? userName: ''}</Text>
                                <Brief style={styles.smallFont}>{position? position: ''}</Brief>
                                <Brief style={styles.personNum}>工号: {workNum? workNum: ''}</Brief>
                            </Item>
                        </List>
                    </View>
                </View>
                <Separator/>
                <List>
                    <Item
                        thumb={<Icon type={'\ue686'}  />}
                        arrow="horizontal"
                        onClick={() => this.props.navigator.push({
                            screen: 'Address',
                            animated: false,
                            title: '地址'
                        })}
                    >地址</Item>
                    <Item thumb={<Icon style={styles.image} type={'\ue675'} />}
                          onClick={() => this.props.navigator.push({
                              screen: 'RelationShip',
                              animated: false,
                              title: '紧急联系人'
                          })}
                          arrow="horizontal">紧急联系人</Item>
                    <Item thumb={<Icon type={'\ue635'} />}
                          arrow="horizontal"
                          onClick={() => this.props.navigator.push({
                              screen: 'Card',
                              animated: false,
                              title: '银行卡信息'
                          })}
                    >银行账号</Item>

                </List>
                <Separator/>
                <List>
                    <Item
                        thumb={<Icon type={'\ue6a6'} />}
                        arrow="horizontal"
                        onClick={() => {}}
                    >工资单</Item>
                </List>
                <Separator/>
                <List>
                    <Item
                        thumb={<Icon type={'\ue6ba'} />}
                        arrow="horizontal"
                        onClick={() => {}}
                    >修改密码</Item>
                    <Item thumb={<Icon type={'\ue6da'} style={{color: '#dddddd'}}/>}
                          arrow="horizontal"
                          onClick={() => {
                              //更新基础数据
                              this.props.Common.getBaseData(true);
                          }}
                    >更新基数数据</Item>
                    <Item thumb={<Icon type={'\ue6da'} style={{color: '#dddddd'}}/>}
                          arrow="horizontal"
                          onClick={() => this.props.navigator.push({
                              screen: 'Version',
                              animated: false,
                              title: '更新版本'
                          })}
                    >更新版本123</Item>
                </List>
                <WhiteSpace/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    personInfo: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageWrap: {
        width: 70,
        paddingLeft: 10,
        paddingTop: 10,
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: .5,
        borderStyle: 'solid',
        borderColor: '#dddddd',
    },
    infoContent: {
        flex: 1,
    },
    personName: {
        paddingTop: 5,
        fontSize: 18,
    },
    separator: {
        height: 10,
        backgroundColor: '#f2f2f2'
    },
    smallFont: {
        fontSize: 12,
    },
    personNum: {
        paddingBottom: 5,
        fontSize: 12,
    },
    image: {
        width: 55,
        height: 55,
        paddingRight: 15,
        marginRight: 15,
    },
    iconColor: {
        color: 'red',
        fontSize: 50
    },
    textLeft: {
        fontSize: 18,
        paddingLeft: 10,
        color: '#333333',
    }
});