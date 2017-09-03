// @flow

import { observable, action, runInAction } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import { loginApi, alertsListApi, resetPwdApi, personalDataApi, basisDataApi, personalInfoApi, addressInfoApi, relationShipApi,
        bankAccountApi
    } from '../services/baseService'
//页面提醒
import { Toast } from 'antd-mobile';
import { create, persist } from 'mobx-persist'

//页面跳转
import { startTabsScreen } from '../screens';
class Store {
    @observable userInfo = null

    @observable userDetail = ''; //保存用户详细信息

    @observable baseDetail = ''; //保存基础数据

    @observable personalInfo = ''; //保存用户名字， 头像， 职位

    @observable addressInfo = ''; //保存用户地址信息

    @observable relationShipInfo = ''; //保存紧急联系人信息

    @observable bankCard = ''; //保存银行卡信息

    @observable districtList = []; //保存省份，市信息 （格式化对应的数据）

    @observable nationalityList = []; //保存民族信息

    @observable politicalList = []; //保存政治面貌

    @observable maritalList = []; //保存婚姻情况

    @observable educationList = []; //保存教育情况

    @action
    login = async (username, password) => {
        const data = await loginApi(username, password);
        runInAction(() => {
            //数据请求完成进行页面跳转
            console.log('123123123', data);
            if(data.resultdata){
                //登录成功进行页面跳转
                startTabsScreen();
            }
            this.userInfo = data.resultdata
        });
    }

    @action
    logout = async () => {
        runInAction(() => {
            this.userInfo=null;
            this.userDetail='';
        });
    }

    @action
    alertsList = async () => {
        const data = await alertsListApi(this.userInfo.staff_no, this.userInfo.session_id);
        runInAction(() => {
            console.log('data', data);
            this.alertsList = data.resultdata
        });
    }

    @action
    resetPwd = async () => {
        const {user_id, session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;
        const data = await personalDataApi({user_id, session_id, company_code, empn_no, enable_ta, staff_no});
        runInAction(() => {
            console.log('data', data);
            this.resetPwd = data.resultdata
        });
    }

    @action
        //获取用户详细个人信息
    getPersonDetail = async () => {
        const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;
        const data = await personalDataApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});
        runInAction(() => {
            console.log('用户详细信息', data)
            this.userDetail = data.resultdata
        });
    }

    @action
    //请求基础数据
    getBaseData = async (flag) => {
        try{
            let resData,
                districtList = [],
                nationalityList = [], //民族信息
                politicalList = [], //保存政治面貌
                maritalList = [], //保存婚姻情况
                educationList = []; //保存教育情况

            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;
            //默认不强制请求数据
            if(flag){
                //强制更新数据
                Toast.loading('loading', 0);
                const data = await basisDataApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});
                resData = data.resultdata;
                console.log('基础数据', resData);
                if(resData){
                    Toast.hide();
                    Toast.success('更新基数数据成功！');

                }
            }else{
                //判断是否存在数据
                if(!this.baseDetail){
                    const data = await basisDataApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});
                    resData = data.resultdata;
                }
            }

            //如果请求完数据
            if(resData){
                //处理数据
                const {city, province, nationality, political, marital, education} = resData;
                //籍贯
                province && province.map(info => {
                    let innerArr = [];
                    city.map(inner => {
                        if(info.province_code == inner.province_code){
                            innerArr.push({
                                value: inner.city_code,
                                label: inner.city_name_cn,
                                children: []
                            })
                        }
                    })
                    districtList.push({
                        value: info.province_code,
                        label: info.province_name_cn,
                        children: innerArr
                    })
                })

                //民族信息
                nationality && nationality.map(info => {
                    nationalityList.push({
                        value: info.nationality_code,
                        label: info.nationality_name_cn,
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
            }
            runInAction(() => {
                this.politicalList = politicalList;
                this.maritalList = maritalList;
                this.educationList = educationList;
                this.nationalityList = nationalityList;
                this.districtList = districtList;
                this.baseDetail = resData;
            })
        } catch(error){

        }
    }

    @action
    //请求名字 头像 职位
    getPersonalInfo = async () => {
        try{
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;

            const data = await personalInfoApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});

            runInAction(() => {
                this.personalInfo = data.resultdata;
            })
        }catch (err){

        }
    }

    @action
        //请求用户地址信息
    getAddressInfo = async () => {
        try{
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;

            const data = await addressInfoApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});

            runInAction(() => {
                this.addressInfo = data.resultdata;
            })

        } catch (err){
        }
    }

    @action
    //请求紧急联系人信息
    getRelationShip = async () => {
        try{
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;

            const data = await relationShipApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});

            runInAction(() => {
                this.relationShipInfo = data.resultdata;
            })
        } catch(err) {

        }
    }

    @action
    //请求支付账户信息（银行卡信息
    getBankAccount = async () => {
        try{
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;

            const data = await bankAccountApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});

            runInAction(() => {
                console.log(data);
                this.bankCard = data.resultdata;
            })
        } catch(err) {

        }
    }
}

export default new Store();