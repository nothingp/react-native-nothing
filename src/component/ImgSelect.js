/**
 * 多选择图片组件
 * 传入的数据格式
 * [{uri : ''}]
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {Icon, ActionSheet} from 'antd-mobile';
import BaseComponent from './BaseComponent';
import ImagePicker from 'react-native-image-picker';

export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            headText: '附件', //顶部title
            imgArr: [], //图片数组
        };
    }

    show = ({imgArr}) => {
        this.setState({
            visible: true,
            imgArr
        })
    }

    pushImg = (res) => {
        const {didCancel} = res;
        if(didCancel) return;
        console.log(res)
        let {imgArr} = this.state;
        imgArr.push(res);
        console.log(imgArr);
        this.setState({
            imgArr
        })
    }

    delImg = (index) => {
        let {imgArr} = this.state;
        imgArr.splice(index, 1);
        this.setState({
            imgArr
        })
    }

    render() {
        const {headText, imgArr} = this.state;
        const arr = Array.from(new Array(4 - imgArr.length));
        //
        const options = {
            title: 'Select Avatar'
        };
        return (
            <View>
                <View style={{height: 40, backgroundColor: '#f2f2f2'}}>
                    <Text style={{marginLeft: 15, lineHeight: 40}}>
                        {headText}
                    </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    {
                        imgArr && imgArr.map((info, i) => {
                            return(
                                <View key={i} style={{flex: 1, width: 100, height: 70, marginTop: 10, marginBottom: 10}}>
                                    <View style={{marginLeft: 5, marginRight: 5, position: 'relative'}}>
                                        <Image style={{width: '100%', height: '100%'}} source={{uri: info.uri}}/>
                                        <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => {
                                            this.delImg(i)
                                        }}>
                                            <Text style={{fontSize: 20}}>
                                                <Icon type={'\ue62e'} size="xl" color="#D2D2D2"/>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        arr && arr.map((info, i) => {
                            if(i == 0){
                                return(
                                    <TouchableOpacity onPress={() => {
                                        const BUTTONS = ['相册', '拍照', '取消'];
                                        ActionSheet.showActionSheetWithOptions({
                                            options: BUTTONS,
                                            cancelButtonIndex: BUTTONS.length - 1
                                        },(buttonIndex) => {
                                            if(buttonIndex==0){
                                                ImagePicker.launchImageLibrary(options, (response)  => {
                                                    this.pushImg(response)
                                                });
                                            }else if(buttonIndex==1){
                                                ImagePicker.launchCamera(options, (response)  => {
                                                    this.pushImg(response)
                                                });
                                            }

                                        });
                                    }}>
                                        <View key={i} style={{height: 70, marginTop: 10, marginBottom: 10}}>
                                            <Text style={{fontSize: 50, lineHeight: 60, marginLeft: 5, marginRight: 5}}>
                                                <Icon type={'\ue910'} size="xl" color="#D2D2D2"/>
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }else{
                                return(
                                    <View key={i} style={{flex: 1}}>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </View>
        )
    }
}