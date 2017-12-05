import React, { Component } from 'react';
import {format} from '../../common/Tool';

import {
    ScrollView,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';

import {Item, NoticeBarMessage} from './common';
import TitleButton from './common/selfInfoTitleButton';

@inject('User')
@observer
export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:'基本信息',
        headerRight: (
            <TitleButton navigation={navigation}/>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
        }
    }

    componentWillMount() {
        //请求个人的详细信息
        this.props.User.getPersonDetail();
    }
    render() {
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
            status = ''; //审批状态
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
            prc_grade_gettime = userDetail.prc_grade_gettime?format(new Date(parseInt(userDetail.prc_grade_gettime)).getTime(), "yyyy-MM-dd"):'';
            prc_major = userDetail.prc_major;
            mobile_no = userDetail.mobile_no;
            office_no = userDetail.office_no;
            prc_qq = userDetail.prc_qq;
            home_no = userDetail.home_no;
            comp_email = userDetail.comp_email;
            pers_email = userDetail.pers_email;
            status = userDetail.status;
        }
        return (
            <ScrollView style={{backgroundColor:'#fff'}}>
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
                {/*<Item name="家庭电话：" text={home_no}/>*/}
                <Item name="QQ：" text={prc_qq}/>
                <Item name="个人邮箱：" text={pers_email}/>
                <Item name="办公号码：" text={office_no}/>
            </ScrollView>

        )
    }
}