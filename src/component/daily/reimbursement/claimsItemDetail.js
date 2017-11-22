import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    ScrollView,
    TextInput,
    Navigator,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Grid,
    Button,
    List,
    NavBar,
    InputItem,
    Picker,
    TextareaItem,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import ImgViewer from '../../../component/ImgViewer';

//引入第三方库
import { format } from '../../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
export default class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '报销项查看',
        }
    };

    componentWillUnmount() {
        const { True } = this.props;
        True.claimitem = {};
    }

    getItemType = (type) => {
        let { claimsClaimitemsData } = this.props.True;
        const { claim_item } = claimsClaimitemsData;
        let item = '';
        claim_item && claim_item.map((v, i) => {
            if (v.item_code == type) {
                item = v.item_name;
            }
        })
        return item;
    }

    render() {
        const { True, navigation } = this.props;
        const { claimitem } = True;

        const {
            claim_dtl_id,
            claim_item,
            as_of_date,
            unit,
            unit_code,
            amount,
            receipt,
            gl_seg1,
            gl_seg2,
            gl_seg3,
            gl_seg4,
            gl_seg5,
            remark,
        } = claimitem;

        return (
            <ScrollView>

                <List>

                    <List.Item arrow="empty">
                        <Text>
                            <Text>
                                报销项：
                            </Text>
                            <Text>
                                {this.getItemType(claim_item)}
                            </Text>
                        </Text>
                    </List.Item>

                    <List.Item arrow="empty">
                        <Text>
                            <Text>
                                生效日期：
                            </Text>
                            <Text>
                                {format(as_of_date, 'yyyy-MM-dd')}
                            </Text>
                        </Text>
                    </List.Item>

                    <List.Item arrow="empty">
                        <Text>
                            <Text>
                                金额：
                            </Text>
                            <Text>
                                {`${amount}(${unit})`}
                            </Text>
                        </Text>
                    </List.Item>

                    {
                        gl_seg1 ?
                            <List.Item arrow="empty">
                                <Text>
                                    <Text>
                                        部门：
                                    </Text>
                                    <Text>
                                        {gl_seg1}
                                    </Text>
                                </Text>
                            </List.Item>
                            : null
                    }
                    {
                        gl_seg2 ?
                            <List.Item arrow="empty">
                                <Text>
                                    <Text>
                                        项目组：
                                    </Text>
                                    <Text>
                                        {gl_seg2}
                                    </Text>
                                </Text>
                            </List.Item>
                            : null
                    }
                    {
                        gl_seg3 ?
                            <List.Item arrow="empty">
                                <Text>
                                    <Text>
                                        小组：
                                    </Text>
                                    <Text>
                                        {gl_seg3}
                                    </Text>
                                </Text>
                            </List.Item>
                            : null
                    }
                    {
                        gl_seg4 ?
                            <List.Item arrow="empty">
                                <Text>
                                    <Text>
                                        职位：
                                    </Text>
                                    <Text>
                                        {gl_seg4}
                                    </Text>
                                </Text>
                            </List.Item>
                            : null
                    }
                    {
                        gl_seg5 ?
                            <List.Item arrow="empty">
                                <Text>
                                    <Text>
                                        支付工薪项：
                                    </Text>
                                    <Text>
                                        {gl_seg5}
                                    </Text>
                                </Text>
                            </List.Item>
                            : null
                    }

                    <List.Item arrow="empty">
                        <Text>
                            收据：
                        </Text>
                        <WhiteSpace/>
                        {
                            receipt ?
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            this.refs.img.show(receipt)
                                        }
                                    }
                                >
                                    <Image style={styles.image} source={{ uri: receipt }}/>
                                </TouchableOpacity>
                                : null
                        }
                    </List.Item>

                    <List.Item arrow="empty">
                        <Text>
                            <Text>
                                备注：
                            </Text>
                            <Text>
                                {remark}
                            </Text>
                        </Text>
                    </List.Item>

                </List>
                <ImgViewer ref="img"/>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 80,
    },
});
