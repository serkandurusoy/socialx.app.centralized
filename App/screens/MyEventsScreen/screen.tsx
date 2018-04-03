import moment from 'moment';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Colors, Fonts, Sizes} from '../../theme/';
import style from './style';

interface IMyEventsScreenComponentProps {}

interface IMyEventsScreenComponentState {
	selectedDate: Date;
	currentMonth: string;
}

interface IDayObject {
	day: number;
	month: number;
	year: number;
	timestamp: number;
	dateString: string;
}

const AGENDA_THEME = {
	"todayTextColor": Colors.postFullName,
	"dayTextColor": Colors.postFullName,
	"selectedDayBackgroundColor": Colors.pink,
	"agendaKnobColor": Colors.pink,
	'stylesheet.agenda.main': {
		weekday: {
			...Fonts.centuryGothic,
			fontSize: Sizes.smartHorizontalScale(12),
			color: Colors.postText,
		},
	},
};

const CURRENT_MONTH_FORMAT = 'MMMM YYYY';

const AGENDA_ITEMS = {
	'2018-04-03': [{text: 'item 1 - any js object'}],
	'2018-04-05': [{text: 'item 2 - any js object'}],
	'2018-05-07': [],
	'2018-03-25': [{text: 'item 3 - any js object'}, {text: 'any js object'}],
};

export default class MyEventsScreenComponent extends Component<
	IMyEventsScreenComponentProps,
	IMyEventsScreenComponentState
> {
	public state = {
		selectedDate: new Date(),
		currentMonth: moment().format(CURRENT_MONTH_FORMAT),
	};

	public render() {
		// const selectedDateWithFormat = moment(this.state.selectedDate).format('YYYY-MM-DD');
		return (
			<View style={style.container}>
				<Text style={style.currentMonthTitle}>{this.state.currentMonth}</Text>
				<Agenda
					selected={this.state.selectedDate}
					loadItemsForMonth={this.loadItemsForMonth}
					renderItem={this.renderItem}
					rowHasChanged={this.rowHasChanged}
					items={AGENDA_ITEMS}
					renderDay={() => <View />} // don't render the day in the events list!
					// agenda theme
					theme={AGENDA_THEME}
					// agenda container style
					style={style.agenda}
				/>
			</View>
		);
	}

	private renderItem = (item, firstItemInDay) => {
		// console.log('renderItem', item, firstItemInDay);
		return <View style={style.agendaItem} />;
	}

	private rowHasChanged = (r1, r2) => {
		// console.log('rowHasChanged', r1, r2);
		return true;
	}

	private loadItemsForMonth = (month: IDayObject) => {
		// console.log('loadItemsForMonth', month);
		this.setState({
			currentMonth: moment(month.timestamp).format(CURRENT_MONTH_FORMAT),
		});
	}
}
