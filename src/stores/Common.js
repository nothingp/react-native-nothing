// @flow

import {observable, action, runInAction} from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import {
    basisDataApi,
    relationShipTypeApi,
    getBankListApi,
    getEducationTypeListApi,
    getCertTypeListApi,
} from '../services/baseService'
//页面提醒
import {Toast} from 'antd-mobile';
import {create, persist} from 'mobx-persist'
import Base from './Base'


class Common {

    @observable baseDetail = ''; //保存基础数据

    @observable districtList = []; //保存省份，市信息 （格式化对应的数据）

    @observable addressList = []; //保存省份，市信息, 镇信息 （格式化对应的数据）

    @observable nationalityList = []; //保存民族信息

    @observable politicalList = []; //保存政治面貌

    @observable maritalList = []; //保存婚姻情况

    @observable educationList = []; //保存教育情况

    @observable relationShipList = []; //保存联系人关系情况

    @observable bankList = []; //银行列表

    @observable countryList = []; //国家列表

    @observable educationType = []; //获取教育类型

    @observable certTypeList = []; //证书类型列表

    @observable sexArr = [
        {
            label: '男',
            value: 'M',
        },
        {
            label: '女',
            value: 'F',
        },
    ]; //性别数组

    @action//请求基础数据
    getBaseData = async (flag) => {
        try {
            let resData,
                districtList = [],
                addressList = [], //保存地址到镇（省， 市， 镇）
                nationalityList = [], //民族信息
                politicalList = [], //保存政治面貌
                maritalList = [], //保存婚姻情况
                educationList = [], //保存教育情况
                countryList = []; //保存国家列表信息

            const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
            //默认不强制请求数据
            if (flag) {
                //强制更新数据
                Toast.loading('loading', 0);
                const data = await basisDataApi({
                    user_id: staff_no,
                    session_id,
                    company_code,
                    empn_no,
                    enable_ta,
                    staff_no
                });
                resData = data.resultdata;
                console.log('基础数据', resData);
                if (resData) {
                    Toast.hide();
                    Toast.success('更新基数数据成功！');

                }
            } else {
                //判断是否存在数据
                if (!this.baseDetail) {
                    const data = await basisDataApi({
                        user_id: staff_no,
                        session_id,
                        company_code,
                        empn_no,
                        enable_ta,
                        staff_no
                    });
                    resData = data.resultdata;
                }
            }

            //如果请求完数据
            if (resData) {
                //处理数据
                const {city, province, nationality, political, marital, education, district, country} = resData;
                //籍贯
                province && province.map(info => {
                    let innerArr = [];
                    let innerArr2 = [];
                    city.map(inner => {
                        if (info.province_code == inner.province_code) {
                            innerArr.push({
                                value: inner.city_code,
                                label: inner.city_name_cn,
                                children: []
                            })
                            //遍历镇信息
                            let inInnerArr = [];
                            district.map(inner2 => {
                                if(inner.city_code == inner2.city_code){
                                    inInnerArr.push({
                                        value: inner2.district_code,
                                        label: inner2.district_name_cn,
                                        children: []
                                    })
                                }
                            });
                            innerArr2.push({
                                value: inner.city_code,
                                label: inner.city_name_cn,
                                children: inInnerArr
                            })
                        }
                    })
                    districtList.push({
                        value: info.province_code,
                        label: info.province_name_cn,
                        children: innerArr
                    })
                    addressList.push({
                        value: info.province_code,
                        label: info.province_name_cn,
                        children: innerArr2
                    })
                })

                //民族信息
                nationality && nationality.map(info => {
                    nationalityList.push({
                        value: info.nationality_code,
                        label: info.nationality_name_cn,
                        writable: true
                    })
                })

                //政治面貌信息
                political && political.map(info => {
                    politicalList.push({
                        value: info.marital_code,
                        label: info.marital_name_cn,
                    })
                })

                //婚姻信息
                marital && marital.map(info => {
                    maritalList.push({
                        value: info.marital_code,
                        label: info.marital_name_cn,
                    })
                })

                //教育信息
                education && education.map(info => {
                    educationList.push({
                        value: info.marital_code,
                        label: info.marital_name_cn,
                    })
                })

                //国家地区信息
                country && country.map(info => {
                    countryList.push({
                        value: info.country_code,
                        label: info.country_name_cn,
                    })
                })

            }
            runInAction(() => {
                this.politicalList = politicalList;
                this.maritalList = maritalList;
                this.educationList = educationList;
                this.nationalityList = nationalityList;
                this.districtList = districtList;
                this.addressList = addressList;
                this.countryList = countryList;
                this.baseDetail = resData;
            })
        } catch (error) {

        }
    }

    @action
        //获取联系人关系情况
    getRelationShip = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const dataList = await relationShipTypeApi({session_id, company_code, empn_no, enable_ta, staff_no});
        let arr = [];
        dataList.resultdata && dataList.resultdata.map(info => {
            arr.push({
                label: info.relate_type_desc,
                value: info.relate_type,
            })
        })
        runInAction(() => {
            this.relationShipList = arr;
        })
    }

    @action
    //获取银行列表
    getBankList = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getBankListApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map(info => {
                arr.push({
                    label: info.bank_desc,
                    value: info.bank_code,
                })
            })
            this.bankList = arr;
        }
    }

    @action
    //获取教育类型列表
    getEducationTypeList = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getEducationTypeListApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map(info => {
                arr.push({
                    label: info.edu_type_desc,
                    value: info.edu_type,
                })
            })
            this.educationType = arr;
        }
    }

    @action
        //获取证书类型列表
    getCertTypeList = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getCertTypeListApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map(info => {
                arr.push({
                    label: info.cert_desc,
                    value: info.cert_code,
                })
            })
            this.certTypeList = arr;
        }
    }
}

export default new Common();