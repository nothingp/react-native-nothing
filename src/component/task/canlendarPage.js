import React, { Component } from 'react';
import moment from 'moment';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    PixelRatio,
    TouchableHighlight,
    ScrollView,
    TextInput,
    Navigator,
    StatusBar
} from 'react-native';

import {
    Flex,
    WhiteSpace,
    PickerView,
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
    Popover,
    DatePicker
} from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;

@inject('User', 'Common', 'True')
@observer
class Index extends Component {

    onChange = (selectObj) => {
        let { True } = this.props;
        True.taskSelectType = selectObj;
        True.activeKey = 'PE';
        Toast.loading('loading');
        True.taskListAction();
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            items: {}
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    render() {
        const { True } = this.props;
        const { taskSelectType } = True;
        const data = [
            {
                value: 'ALL',
                label: '所有',
            },
            {
                value: 'PP',
                label: '个人信息',
            },
            {
                value: 'LA',
                label: '假期',
            },
            {
                value: 'CA',
                label: '报销',
            },
            {
                value: 'TS',
                label: '工作时间表',
            },
            {
                value: 'LC',
                label: '可调休假',
            },
            {
                value: 'CL',
                label: '取消假期',
            },
        ];
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Calendar
                    // Initially visible month. Default = Date()
                    current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        console.log('selected day', day)
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {
                        console.log('month changed', month)
                    }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow/>)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                />

                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={'2017-05-16'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    //markingType={'interactive'}
                    //markedDates={{
                    //  '2017-05-08': [{textColor: '#666'}],
                    //  '2017-05-09': [{textColor: '#666'}],
                    //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
                    //  '2017-05-21': [{startingDay: true, color: 'blue'}],
                    //  '2017-05-22': [{endingDay: true, color: 'gray'}],
                    //  '2017-05-24': [{startingDay: true, color: 'gray'}],
                    //  '2017-05-25': [{color: 'gray'}],
                    //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
});


export default createForm()(Index);