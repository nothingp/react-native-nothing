// @flow

import { observable, action, runInAction } from 'mobx';
import loading from '../decorators/loading';
import log from '../decorators/log';
import { loginApi, alertsListApi, resetPwdApi, personalDataApi, basisDataApi, personalInfoApi, addressInfoApi, relationShipApi} from '../services/baseService'
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
            this.userDetail = data.resultdata
        });
    }

    @action
    //请求基础数据
    getBaseData = async (flag) => {
        try{
            const {session_id, company_code, empn_no, enable_ta, staff_no} = this.userInfo;
            //默认不强制请求数据
            if(flag){
                //强制更新数据
                Toast.loading('loading', 0);
                const resData = await basisDataApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});
                console.log('基础数据', resData);
                if(resData.resultdata){
                    this.baseDetail = resData.resultdata;
                    Toast.hide();
                    Toast.success('更新基数数据成功！')
                }
            }else{
                //判断是否存在数据
                if(!this.baseDetail){
                    console.log('基础数据', resData);
                    const resData = await basisDataApi({user_id:staff_no, session_id, company_code, empn_no, enable_ta, staff_no});
                    this.baseDetail = resData.resultdata;
                }
            }
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
}

export default new Store();