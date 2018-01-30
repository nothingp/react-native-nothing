import React, {Component} from 'react';
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
import {NavigationActions} from 'react-navigation';

import {
    Flex,
    Accordion,
    WhiteSpace,
    Toast,
    WingBlank,
    Icon,
    Tabs,
    Grid,
    Button,
    List,
    NavBar,
    Picker,
    Badge,
    Radio,
    TextareaItem,
    DatePicker,
    CheckboxItem
} from 'antd-mobile';
import {observable, action, runInAction, computed, autorun} from 'mobx';
import {inject, observer} from 'mobx-react/native';
import {withNavigation} from 'react-navigation';
import {createForm} from 'rc-form';
import {gColors} from '../../common/GlobalContants';

//引入第三方库
import {format} from '../../util/tool';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;
const RadioItem = Radio.RadioItem;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    state = {
        showApprovers: false
    }

    constructor(props) {
        super(props);
        // const { True } = props;
        // const { selectTaskApprovers } = True;
        // this.state = {
        //     value: selectTaskApprovers && selectTaskApprovers.length > 0 ? selectTaskApprovers[0].value : '',
        //     label: selectTaskApprovers && selectTaskApprovers.length > 0 && selectTaskApprovers[0].value ?//防止[]时是‘-’
        //         selectTaskApprovers[0].label : '',
        // };
    }

    onChange = (value, label) => {
        this.props.True.selectApproverAction({
            value,
            label
        })

        this.setState ({
            showApprovers: false
        })
    }

    selectApprover = () => {
        const {showApprovers}=this.state;
        this.setState ({
            showApprovers: !showApprovers
        })
    }

    render() {
        const {True, form, is_last_approve, navigation, noHead, headStr} = this.props;
        const {getFieldProps} = form;
        const {selectTaskApprovers, selectApprover} = True;
        const {value, label} = selectApprover;
        const {showApprovers} = this.state;
        const str = headStr?headStr:'';

        return (
            <List renderHeader={noHead?'': () => str}>
                {
                    is_last_approve != 1 &&
                    <List>
                        <List.Item arrow="down" extra={label} onClick={this.selectApprover}>审批人：</List.Item>
                        {
                            showApprovers && label &&
                            selectTaskApprovers && selectTaskApprovers.map(i => (
                                <RadioItem key={i.value} checked={value === i.value}
                                           onChange={() => this.onChange(i.value, i.label)}>
                                    {i.label}
                                </RadioItem>
                            ))
                        }
                        {showApprovers && <List.Item arrow="horizontal" onClick={
                            async () => {
                                await True.managerApiAction();
                                navigation.navigate('ApprovedManList');
                                this.setState ({
                                    showApprovers: false
                                })
                            }}
                        >
                            其他审批人
                        </List.Item>
                        }
                    </List>
                }
            </List>
        )
    }
}

export default withNavigation(createForm()(Index));