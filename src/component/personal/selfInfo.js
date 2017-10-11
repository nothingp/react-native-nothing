import React, { Component } from 'react';
import moment from 'moment';

import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    StatusBar
} from 'react-native';
import { Flex, NoticeBar, Checkbox, WingBlank, Icon,Grid,Button,List,NavBar,InputItem,Picker,TextareaItem, DatePicker } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';
import navigator from '../../decorators/navigator'

import {Item, NoticeBarMessage} from './common/index';

export const resultStatus = {
    'N': '新建',
    'P': '处理中',
    'R': '已拒绝',
    'A': '成功',

}

@navigator
@inject('User')
@observer
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent=(event)=>{
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'EditSelfInfo',
                    title: '编辑个人信息'
                })
            }else if (event.id == 'cancel') { // this is the same id field from the static navigatorButtons definition
                //进行取消
                this.props.User.cancelChangeInfo();
            }
        }
    }

    componentWillMount() {
        //请求个人的详细信息
        this.props.User.getPersonDetail();
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    componentWillUnmount() {
        this.props.navigator.toggleTabs({
            animated: false,
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        });
    }
    render() {
        console.log(this.props);
        const userDetail = this.props.User.userDetail;
        let prc_former_name = '',
            sex,
            prc_nationality_desc = '',
            dob = '',
            district = '', //籍贯
            prc_np_province_desc,
            prc_np_city_desc,
            prc_political_status_desc = '', //政治面貌
            marital_status_desc = '', //婚姻情况
            prc_education_desc = '', //最高学历
            prc_major = '', //所学专业
            prc_grade_gettime = '', //毕业时间
            mobile_no = '',
            office_no = '',
            prc_qq = '',
            home_no = '',
            comp_email = '',
            pers_email = '',
            status = '';
        if(userDetail){
            prc_former_name = userDetail.prc_former_name;
            sex = userDetail.sex;
            prc_nationality_desc = userDetail.prc_nationality_desc;
            dob = userDetail.dob?userDetail.dob.split('T')[0]: '';
            prc_np_province_desc = userDetail.prc_np_province_desc;
            prc_np_city_desc = userDetail.prc_np_city_desc;
            if(prc_np_province_desc && prc_np_city_desc){
                district = prc_np_province_desc + prc_np_city_desc
            }
            prc_political_status_desc = userDetail.prc_political_status_desc;
            marital_status_desc = userDetail.marital_status_desc;
            prc_education_desc = userDetail.prc_education_desc;
            prc_grade_gettime = userDetail.prc_grade_gettime?moment(parseInt(userDetail.prc_grade_gettime)).format("YYYY-MM-DD"):'';
            prc_major = userDetail.prc_major;
            mobile_no = userDetail.mobile_no;
            office_no = userDetail.office_no;
            prc_qq = userDetail.prc_qq;
            home_no = userDetail.home_no;
            comp_email = userDetail.comp_email;
            pers_email = userDetail.pers_email;
            status = userDetail.status;
        }
        //判断当前的信息状态，如果为等待审核状态则不允许修改
        console.log(status)
        if(status == 'N' || status == 'P'){
            this.props.navigator.setButtons({
                rightButtons: [{
                    title: '取消', // for a textual button, provide the button title (label)
                    id: 'cancel', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                    buttonColor: '#fff'
                }], // see "Adding buttons to the navigator" below for format (optional)
                animated: false // does the change have transition animation or does it happen immediately (optional)
            });
        }else{
            //设置头部
            this.props.navigator.setButtons({
                rightButtons: [{
                    title: '编辑', // for a textual button, provide the button title (label)
                    id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                    buttonColor: '#fff'
                }], // see "Adding buttons to the navigator" below for format (optional)
                animated: false // does the change have transition animation or does it happen immediately (optional)
            });
        }
        return (
            <ScrollView>
                <NoticeBarMessage status={status}/>

                <Item name="昵称：" text={prc_former_name}/>
                <Item name="性别：" text={sex? sex == 'M'? '男': '女': ''}/>
                <Item name="民族：" text={prc_nationality_desc}/>
                <Item name="生日：" text={dob}/>
                <Item name="籍贯：" text={district}/>
                <Item name="政治面貌：" text={prc_political_status_desc}/>
                <Item name="婚姻状况：" text={marital_status_desc}/>
                <Item name="最高学历：" text={prc_education_desc}/>
                <Item name="专业名称：" text={prc_major}/>
                <Item name="毕业时间：" text={prc_grade_gettime}/>
                <Item name="公司邮箱：" text={comp_email}/>
                <Item name="手机号码：" text={mobile_no}/>
                <Item name="家庭电话：" text={home_no}/>
                <Item name="QQ：" text={prc_qq}/>
                <Item name="个人邮箱：" text={pers_email}/>
                <Item name="办公号码：" text={office_no}/>
            </ScrollView>

        )
    }
}