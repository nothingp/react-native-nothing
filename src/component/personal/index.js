import React, { Component } from 'react';
import { observable, action, runInAction, computed, autorun } from 'mobx';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    PixelRatio,
    TouchableOpacity,
    Image,
    ScrollView,
    InteractionManager

} from 'react-native';
import { Flex, WhiteSpace, Icon, Grid, Button, List, WingBlank, Modal, ActionSheet, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../i18n/i18n';
import { getLanguages } from 'react-native-i18n'
import BaseComponent from '../BaseComponent'
import LogoutButton from '../logout/button'

const Item = List.Item;
const Brief = Item.Brief;
const operation = Modal.operation;

const Separator = () => (
    <Flex
        style={styles.separator}
    />
);

@inject('User', 'Common', 'Base')
@observer
export default class Index extends BaseComponent {
    static navigationOptions = ({ navigation }) => ({
        title: '个人中心',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../resource/tabs/personal_01.png')}
                style={[{ tintColor: tintColor }]}
            />
        ),
        headerRight: (
            <LogoutButton navigation={navigation}/>
        ),
    });

    constructor(props) {
        super(props);
        //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        // this.props.navigator.setButtons({
        //     rightButtons: [{
        //         title: '退出', // for a textual button, provide the button title (label)
        //         id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //         buttonColor: '#fff',
        //        }], // see "Adding buttons to the navigator" below for format (optional)
        //     animated: false // does the change have transition animation or does it happen immediately (optional)
        // });

        autorun(() => {
            if (this.props.Base.userInfo) {
                this.props.User.getPersonalInfo();
                this.props.Common.getBaseData();
            }
        })
    }

    onNavigatorEvent = (event) => { //
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
            imgUrl, //个人头像地址
            defaultImgUrl = 'https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png';
        const { personalInfo } = this.props.User;
        const { userInfo } = this.props.Base;


        if (userInfo) {
            const { staff_no } = userInfo;
            workNum = staff_no + '';
        }

        if (personalInfo) {
            imgUrl = personalInfo.user_photo ? personalInfo.user_photo : defaultImgUrl;
            position = personalInfo.position;
            userName = personalInfo.name;
        }

        var options = {
            title: 'Select Avatar',
            quality: 0.05
        };


        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <Separator/>
                <View style={styles.personInfo}>
                    <View style={styles.imageWrap}>
                        <TouchableOpacity onPress={() => {
                            const BUTTONS = ['相册', '拍照', '取消'];
                            ActionSheet.showActionSheetWithOptions({
                                options: BUTTONS,
                                cancelButtonIndex: BUTTONS.length - 1
                            }, (buttonIndex) => {
                                if (buttonIndex == 0) {
                                    ImagePicker.launchImageLibrary(options, (response) => {
                                        this.props.User.updateUserPhoto(response);
                                    });
                                } else if (buttonIndex == 1) {
                                    ImagePicker.launchCamera(options, (response) => {
                                        this.props.User.updateUserPhoto(response);
                                    });
                                }

                            });
                        }}>
                            <Image style={styles.image} source={{ uri: imgUrl }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContent}>
                        <List>
                            <Item
                            >
                                <Text style={styles.personName}>{userName ? userName : ''}</Text>
                                <Brief style={styles.smallFont}>{position ? position : ''}</Brief>
                                <Brief style={styles.personNum}>工号: {workNum ? workNum : ''}</Brief>
                            </Item>
                        </List>
                    </View>
                </View>
                <Separator/>
                <List>
                    <Item
                        thumb={
                            <Text style={styles.iconText}>
                                <Icon type={'\ue66A'}/>
                            </Text>}
                        arrow="horizontal"
                        onClick={() =>
                            InteractionManager.runAfterInteractions(() => {
                                this.props.navigation.navigate('SelfInfo')
                            })
                        }
                    >基本信息</Item>
                    <Item
                        thumb={
                            <Text style={styles.iconText}>
                                <Icon type={'\ue686'}/>
                            </Text>}
                        arrow="horizontal"
                        onClick={() =>
                            InteractionManager.runAfterInteractions(() => {
                                this.props.navigation.navigate('Address')
                            })
                        }
                    >地址</Item>
                    <Item thumb={
                        <Text style={styles.iconText}>
                            <Icon type={'\ue675'}/>
                        </Text>
                    }
                          onClick={() => this.props.navigation.navigate('RelationShip')}
                          arrow="horizontal">联系人</Item>

                </List>
                <Separator/>
                <List>
                    <Item
                        thumb={
                            <Text style={styles.iconText}>
                                <Icon type={'\ue66F'}/>
                            </Text>
                        }
                        arrow="horizontal"
                        onClick={() => this.props.navigation.navigate('Credential')}
                    >证件</Item>
                    <Item thumb={
                        <Text style={styles.iconText}>
                            <Icon type={'\ue6A6'}/>
                        </Text>
                    }
                          arrow="horizontal"
                          onClick={() => this.props.navigation.navigate('Card')}
                    >支付账户</Item>

                </List>

                <Separator/>

                <List>
                    <Item
                        thumb={
                            <Text style={styles.iconText}>
                                <Icon type={'\ue665'}/>
                            </Text>
                        }
                        arrow="horizontal"
                        onClick={() => this.props.navigation.navigate('WorkExp')}
                    >工作经历</Item>
                    <Item thumb={
                        <Text style={styles.iconText}>
                            <Icon type={'\ue66F'}/>
                        </Text>
                    }
                          arrow="horizontal"
                          onClick={() => this.props.navigation.navigate('EduExperience')}
                    >教育经历</Item>
                    <Item thumb={
                        <Text style={styles.iconText}>
                            <Icon type={'\ue637'}/>
                        </Text>
                    }
                          arrow="horizontal"
                          onClick={() => this.props.navigation.navigate('Certificates')}
                    >证书</Item>
                </List>

                <Separator/>
                <List>
                    <Item
                        thumb={
                            <Text style={styles.iconText}>
                                <Icon type={'\ue6ba'}/>
                            </Text>
                        }
                        arrow="horizontal"
                        onClick={() => {
                        }}
                    >修改密码</Item>
                    <Item thumb={
                        <Text style={styles.iconText}>
                            <Icon type={'\ue672'}/>
                        </Text>
                    }
                          arrow="horizontal"
                          onClick={() => {
                              //更新基础数据
                              this.props.Common.getBaseData(true);
                          }}
                    >更新基数数据</Item>
                    <Item thumb={
                        <Text style={styles.iconText}>
                            <Icon type={'\ue6da'} size="xs"/>
                        </Text>
                    }
                          arrow="horizontal"
                          onClick={() => this.props.navigation.navigate('Version')}
                    >更新版本</Item>
                </List>
                <WhiteSpace/>
            </ScrollView>

        )
    }
}


const styles = StyleSheet.create({
    iconText: {
        marginRight: 8,
    },
    personInfo: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageWrap: {
        width: 70,
        paddingLeft: 10,
        paddingTop: 10,
        borderTopWidth: 1 / PixelRatio.get(),
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