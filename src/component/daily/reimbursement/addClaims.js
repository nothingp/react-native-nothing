import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';

import { RequireData } from '../../personal/common/index';
import {
    List,
    Picker,
    DatePicker,
    Flex,
    InputItem,
    Button,
    Icon,
    ActionSheet,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { createForm } from 'rc-form';
import ImagePicker from 'react-native-image-picker';
import Base from '../../../stores/Base'
import { fileUploadApi } from '../../../services/baseService'
import { format } from '../../../common/Tool';

// import Flex from "antd-mobile/es/flex/Flex.d";

@inject('User', 'Common', 'True', 'Base')
@observer
class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '报销项增加',
        }
    };
    state = {
        typeValue: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            imgInfo: '',
            doctor_certificate: ''
        }
    }

    changeType = (v) => {
        const { claimsType } = this.props.Common;
        // console.log(v);
        // console.log(claimsType[v].label)
        //1， 如果某个假期类型对应的alert_msg_desc字段不为空的话，选择该假期的时候需要在假期类型下面显示这个字段的内容；为空的话，则不需要显示。

        // 2，如果某个假期类型对应的user_defined_field_1不为空的话，需要在”附件“字段后面添加一个字段，字段名称为user_defined_field_1字段的值，字段的控件类型为时间选择器，格式如2017-02-01；如果为空的话，则不需要显示。
        this.setState({
            typeValue: 1
        })


    }

    componentWillMount() {
        //请求假期类型数据
        this.props.Common.getClaimsType();
        // console.log()
        this.props.Common.getCurrencyData();

    }

    loadJob = (gl_type, i) => {
        const { claimsJob } = this.props.Common
        this.props.Common.getClaimsJob(gl_type, i);
    }

    changeRightValue = (a, b) => {
        // console.log((b+'').subString(a.length+3));
        // console.log(a)
        // console.log(b.replace(a+' - ',''));
        return b.replace(a + ' - ', '');
    }

    goShowList = (gl_type, gl_seg_label, i) => {
        this.props.navigation.navigate('ShowList', { gl_type: gl_type, gl_seg_label: gl_seg_label, i: i })
    }

    onSubmit = async () => {
        const { form, Base } = this.props;
        const { imgInfo } = this.state;

        // //上传图片
        if (imgInfo) {
            const { session_id, company_code, empn_no, enable_ta, staff_no } = Base.userInfo;
            await fileUploadApi({
                user_id: staff_no,
                session_id,
                pic: imgInfo.data,
                file_folder: 'Claim',
                pic_suffix: 'png'
            });
        }
        const {
            claimsType,
            claimsDetail,
            claimsJob,
            claimsDepartment,
            claimsGroup,
            claimsTeam,
            claimsPayment,
            currencyList,
            claimsImg
        } = this.props.Common;

        form.validateFields(async (err, values) => {
            console.log(values);

            const claimitemsv2 = {
                "claim_dtl_id": "",
                "claim_item": "",
                "as_of_date": "",
                "unit": "人民币",
                "unit_code": "RMB",
                "amount": '',
                "receipt": claimsImg && claimsImg || '',
                "gl_seg1": claimsDepartment.value || claimsDetail.gl_seg1_default_code,
                "gl_seg2": claimsGroup.value || claimsDetail.gl_seg2_default_code,
                "gl_seg3": claimsTeam.value || claimsDetail.gl_seg3_default_code,
                "gl_seg4": claimsJob.value || claimsDetail.gl_seg4_default_code,
                "gl_seg5": claimsPayment.value || claimsDetail.gl_seg5_default_code,
                "remark": ''
            };

            if (!err) {
                const {
                    claimsType,
                    sdate,
                    money,
                    // currency,
                    // department,
                    // group,
                    // team,
                    // job,
                    // payment,
                } = values;
                claimitemsv2.claim_item = claimsType[0];
                claimitemsv2.as_of_date = format(new Date(sdate).getTime(), 'yyyy-MM-dd');
                claimitemsv2.amount = money;

                // claimitems
                // console.log(claimitemsv2)
                this.props.True.addclaimsItemAction(claimitemsv2);
                this.props.navigation.navigate('ClaimsDetail', { info: { status: 'create' } });
            } else {
                alert('error')
            }
        })
    }

    renderUploadFile = (imgInfo, doctor_certificate) => {
        const options = {
            title: 'Select Avatar'
        };

        return (
            <List renderHeader={() => '附件'}>
                <TouchableOpacity onPress={() => {
                    const BUTTONS = ['相册', '拍照', '取消'];
                    ActionSheet.showActionSheetWithOptions({
                        options: BUTTONS,
                        cancelButtonIndex: BUTTONS.length - 1
                    }, (buttonIndex) => {
                        if (buttonIndex == 0) {
                            ImagePicker.launchImageLibrary(options, (response) => {
                                this.setState({
                                    imgInfo: response
                                })
                            });
                        } else if (buttonIndex == 1) {
                            ImagePicker.launchCamera(options, (response) => {
                                this.setState({
                                    imgInfo: response
                                })
                            });
                        }

                    });
                }}>
                    {
                        imgInfo || doctor_certificate ?
                            <Image style={styles.image}
                                   source={{ uri: imgInfo.uri ? imgInfo.uri : doctor_certificate }}/> :
                            <View style={styles.image}>
                                <Text style={styles.text}>
                                    <Icon type={'\ue910'} size="xl" color="#D2D2D2"/>
                                </Text>
                            </View>

                    }
                </TouchableOpacity>
            </List>
        )
    }


    render() {
        const { getFieldProps } = this.props.form;
        const { imgInfo, doctor_certificate } = this.state;

        const { claimsType, claimsDetail, claimsJob, claimsDepartment, claimsGroup, claimsTeam, claimsPayment, currencyList } = this.props.Common;
        const { typeValue } = this.state;
        // console.log(claimsDetail)
        // console.log({...claimsDepartment});

        return (
            <View style={{ backgroundColor: '#fff' }}>
                <ScrollView>
                    <List>
                        <Picker data={claimsType} cols={1}
                                {
                                    ...getFieldProps(
                                        'claimsType',
                                        {
                                            // initialValue: [],
                                            rules: [{
                                                required: true,
                                            }],
                                        }
                                    )
                                }

                        >
                            <List.Item arrow="horizontal"><RequireData require={true} text="报销项:"/></List.Item>
                        </Picker>
                    </List>

                    <List>
                        <DatePicker mode="date"
                                    {
                                        ...getFieldProps(
                                            'sdate',
                                            {
                                                initialValue: '',
                                                rules: [{ required: true }],

                                            }
                                        )
                                    }
                                    minDate={new Date(1900, 1, 1)}
                        >
                            <List.Item arrow="horizontal"><RequireData require={true} text="生效日期:"/></List.Item>
                        </DatePicker>
                    </List>

                    <List>
                        <Flex>
                            <Flex.Item style={styles.inputFlex}>
                                <InputItem
                                    {
                                        ...getFieldProps(
                                            'money',
                                            {
                                                initialValue: '',
                                                rules: [{
                                                    required: true,
                                                }],

                                            }
                                        )
                                    }
                                    type="number"
                                ><RequireData require={true} text="金额:"/></InputItem>
                            </Flex.Item>
                            <Flex.Item>
                                {/*<Picker data={currencyList} cols={1}*/}
                                {/*{*/}
                                {/*...getFieldProps(*/}
                                {/*'currency',*/}
                                {/*{*/}
                                {/*initialValue: ['人民币'],*/}
                                {/*rules: [{*/}
                                {/*required: true,*/}
                                {/*}],*/}
                                {/*}*/}
                                {/*)*/}
                                {/*}*/}
                                {/*>*/}
                                {/*<List.Item arrow="horizontal"><RequireData require={false} text=""/></List.Item>*/}
                                {/*</Picker>*/}
                                <List style={styles.listLeftBorder}>
                                    <List.Item
                                        extra={`人民币`}
                                    >
                                    </List.Item>
                                </List>
                            </Flex.Item>
                        </Flex>
                    </List>
                    {
                        claimsDetail.gl_seg1_label &&
                        <List>
                            <List.Item
                                arrow="horizontal"
                                extra={claimsDepartment.label || claimsDetail.gl_seg1_default_desc}
                                onClick={() => {
                                    this.goShowList(claimsDetail.gl_seg1_type, claimsDetail.gl_seg1_label, 1)
                                }}
                            >
                                {claimsDetail.gl_seg1_label}
                            </List.Item>
                        </List>
                    }
                    {
                        claimsDetail.gl_seg2_label &&
                        <List>
                            <List.Item
                                arrow="horizontal"
                                extra={claimsGroup.label || claimsDetail.gl_seg1_default_desc}
                                onClick={() => {
                                    this.goShowList(claimsDetail.gl_seg2_type, claimsDetail.gl_seg2_label, 2)
                                }}
                            >
                                {claimsDetail.gl_seg2_label}
                            </List.Item>
                        </List>
                    }
                    {
                        claimsDetail.gl_seg3_label &&
                        <List>
                            <List.Item
                                arrow="horizontal"
                                extra={claimsTeam.label || claimsDetail.gl_seg3_default_desc}
                                onClick={() => {
                                    this.goShowList(claimsDetail.gl_seg3_type, claimsDetail.gl_seg3_label, 3)
                                }}
                            >
                                {claimsDetail.gl_seg3_label}
                            </List.Item>
                        </List>
                    }
                    {
                        claimsDetail.gl_seg4_label &&
                        <List>
                            <List.Item
                                arrow="horizontal"
                                extra={claimsJob.label || claimsDetail.gl_seg4_default_desc}
                                onClick={() => {
                                    this.goShowList(claimsDetail.gl_seg4_type, claimsDetail.gl_seg4_label, 4)
                                }}
                            >
                                {claimsDetail.gl_seg4_label}
                            </List.Item>
                        </List>
                    }
                    {
                        claimsDetail.gl_seg5_label &&
                        <List>
                            <List.Item
                                arrow="horizontal"
                                extra={claimsPayment.label || claimsDetail.gl_seg5_default_desc}
                                onClick={() => {
                                    this.goShowList(claimsDetail.gl_seg5_type, claimsDetail.gl_seg5_label, 5)
                                }}
                            >
                                {claimsDetail.gl_seg5_label}
                            </List.Item>
                        </List>
                    }
                    {
                        this.renderUploadFile(imgInfo, doctor_certificate)
                    }
                </ScrollView>

                <Button
                    type="primary"
                    style={styles.button}
                    // onPressIn={() => this.props.navigation.navigate('EditSelfInfo', {status:'create'})}
                    onClick={() => {
                        this.onSubmit()
                    }}
                    // onPress={()=>{alert(1)}}
                >
                    确定
                </Button>
                {/*<View style={{backgroundColor: '#fff'}}>*/}
                {/*<WhiteSpace size="sm"/>*/}
                {/*<WingBlank>*/}
                {/*<Button type="primary" onClick={this.onSubmit}>提交</Button>*/}
                {/*</WingBlank>*/}
                {/*<WhiteSpace size="sm"/>*/}
                {/*</View>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timeTitle: {
        height: 40,
        backgroundColor: '#E3E3E3'
    },
    timeText: {
        lineHeight: 40,
        marginLeft: 15,
    },
    inputFlex: {
        backgroundColor: '#fff',
        borderRightColor: '#ccc',
    },
    button: {
        height: 50,
        borderRadius: 3,
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#58cb8c',
        borderColor: 'transparent'
    },
    listLeftBorder: {
        borderLeftWidth: 1 / PixelRatio.get(),
        borderColor: '#e1e1e1',
        borderTopWidth: 0,
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 15,
        // marginTop: 10,
        // marginBottom: 10,
    },
    text: {
        fontSize: 50,
        lineHeight: 80,
        marginLeft: 10
    },
    descView: {
        height: 40,
        marginLeft: 15,
    },
    descText: {
        lineHeight: 40,
    }
})

export default createForm()(Index);