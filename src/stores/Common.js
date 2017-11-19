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
    getLeaveListTypeApi,
    getClaimsTypeApi,
    fileUploadApi,
    getClaimsJobApi,
    getLeaveawardTypeApi
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

    @observable currencyList = []; //币种列表

    @observable educationType = []; //获取教育类型

    @observable certTypeList = []; //证书类型列表

    @observable holidayType = []; //假期类型

    @observable leaveawardType = []; //可调休申报项

    @observable claimsType = []; //报销类型

    @observable claimsDetail = {}; //增加报销部门等五项数据

    @observable claimsJob = {}; //报销项职位选项列表

    @observable claimsDepartment = {}; //报销项部门选项列表

    @observable claimsGroup = {}; //报销项小组选项列表

    @observable claimsTeam = {}; //报销项团队选项列表

    @observable claimsPayment = {}; //报销项支付选项列表

    @observable claimsItemArr = []; //存放所选报销项的数据

    @observable claimsImg = ''; //存放报销收据图片

    @observable claimsItemArrSelected = []; //当前报销项所选的一条数据

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

    @observable halfTimeArr = [
        {
            label: '上午',
            value: 'AM',
        },
        {
            label: '下午',
            value: 'PM',
        },
    ]
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
                countryList = [], //保存国家列表信息
                currencyList = []; //保存币种信息

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
                const {city, province, nationality, political, marital, education, district, country, currency} = resData;
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

                //币种信息
                currency && currency.map(info => {
                    currencyList.push({
                        value: info.currency_code,
                        label: info.currency_name_cn,
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
                this.currencyList = currencyList;
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

    @action
    //获取假期类型
    getHolidayType = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getLeaveListTypeApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map((info, i) => {
                arr.push({
                    label: info.lv_type_desc,
                    value: info.lv_type,
                    lv_type: info.lv_type,
                    user_defined_field_1: info.user_defined_field_1,
                    alert_msg_desc: info.alert_msg_desc,
                })
            })
            this.holidayType = arr;
        }
    }

    @action
        //获取报销项选项
    getClaimsType = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getClaimsTypeApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.claim_item.map((info, i) => {
                arr.push({
                    label: info.item_name,
                    value: info.item_code,
                    // item_code: info.item_code,
                })
            })
            this.claimsDetail = data.resultdata || {};
            this.claimsType = arr;
        }
    }

    @action
        //获取报销项职位字段选项
    getClaimsJob = async (gl_type,i) => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            gl_type
        }
        const data = await getClaimsJobApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map((info, i) => {
                arr.push({
                    label: info.desc,
                    value: info.code,
                })
            })
            switch(i)
            {
                case 1:
                    this.claimsDepartment = arr;
                    break;
                case 2:
                    this.claimsGroup = arr;
                    break;
                case 3:
                    this.claimsTeam = arr;
                    break;
                case 4:
                    this.claimsJob = arr;
                    break;
                case 5:
                    this.claimsPayment = arr;
                    break;
            }
        }
    }

    @action
        //获取报销项职位字段选项
    getClaimsJobNew = async (gl_type,i) => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no,
            gl_type
        }
        const data = await getClaimsJobApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map((info, i) => {
                arr.push({
                    label: info.desc,
                    value: info.code,
                })
            });

            runInAction(()=>{
                this.claimsItemArr = arr;
            })
        }
    }

    @action//请求基础数据中的币种数据
    getCurrencyData = async () => {
        try {
            let resData,
                districtList = [],
                addressList = [], //保存地址到镇（省， 市， 镇）
                nationalityList = [], //民族信息
                politicalList = [], //保存政治面貌
                maritalList = [], //保存婚姻情况
                educationList = [], //保存教育情况
                countryList = [], //保存国家列表信息
                currencyList = []; //保存币种信息

            const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;

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

            //如果请求完数据
            if (resData) {
                //处理数据
                const {currency} = resData;

                //币种信息
                currency && currency.map(info => {
                    currencyList.push({
                        value: info.currency_code,
                        label: info.currency_name_cn,
                    })
                })

            }
            runInAction(() => {
                this.currencyList = currencyList;
                this.baseDetail.push(currencyList);
            })
        } catch (error) {

        }
    }

    @action
    getSelectClaimsItem = (v,i)=> {
        // this.claimsItemArrSelected[i-1] = this.claimsItemArr[k];
        // this.claimsItemArrSelected

        switch(i)
        {
            case 1:
                this.claimsDepartment = v;
                break;
            case 2:
                this.claimsGroup = v;
                break;
            case 3:
                this.claimsTeam = v;
                break;
            case 4:
                this.claimsJob = v;
                break;
            case 5:
                this.claimsPayment = v;
                break;
        }
    }

    //报销上传图片
    @action
    imgUpload = async (imgInfo) => {
        const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        let doctor_certificate = ""; //附件路径
        // //判断是否有文件
            //图片文件上传
            Toast.loading('图片上传中...');
            const resData = await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic: imgInfo.data,
                file_folder: 'Claim',
                pic_suffix: 'png'
            });
            Toast.hide();
            if (resData && resData.result == 'OK') {
                runInAction(()=>{
                    this.claimsImg = resData.resultdata.url;
                })

                // return doctor_certificate;
            } else {
                Toast.fail(resData.resultdesc, 1);
                return;
            }
        // }
        // let data = merged(obj, reqData, { doctor_certificate })
        // //根据resubmit判断是编辑还是新增//默认0：新增 1：修改
        // if(reqData.resubmit == 1){
        //     const {lv_apply_tbl_id} = this.selectLvDetail;
        //     data = {
        //         ...data,
        //         lv_apply_tbl_id
        //     }
        // }

    }

    @action
        //获取可调休假申报类型
    getLeaveawardType = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = Base.userInfo;
        const obj = {
            session_id,
            company_code,
            empn_no,
            enable_ta,
            staff_no
        }
        const data = await getLeaveawardTypeApi(obj);
        if (data && data.result == 'OK') {
            //将对应的数据进行格式化
            let arr = [];
            data.resultdata && data.resultdata.map(info => {
                arr.push({
                    label: info.lv_claims_desc,
                    value: info.lv_claims_code,
                })
            })
            this.leaveawardType = arr;
        }
    }
}

export default new Common();