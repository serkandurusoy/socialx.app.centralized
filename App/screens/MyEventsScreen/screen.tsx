import moment from 'moment';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Sizes} from '../../theme/';
import style from './style';

interface IMyEventsScreenComponentProps {
	onAddNewEvent: (date: string) => void;
}

interface IMyEventsScreenComponentState {
	currentMonth: string;
	currentDate: string;
}

interface IDayObject {
	day: number;
	month: number;
	year: number;
	timestamp: number;
	dateString: string;
}

interface IEventData {
	title: string;
	color: string;
	startDate: Date;
	endDate: Date;
	allDay: boolean;
	startTime?: Date;
	endTime?: Date;
	location?: string;
	invitedFriends?: any[]; // TBD
	description?: string;
}

// prettier-ignore
const AGENDA_THEME = {
	'todayTextColor': Colors.postFullName,
	'dayTextColor': Colors.postFullName,
	'selectedDayBackgroundColor': Colors.pink,
	'agendaKnobColor': Colors.pink,
	'stylesheet.agenda.main': {
		weekday: {
			...Fonts.centuryGothic,
			fontSize: Sizes.smartHorizontalScale(12),
			color: Colors.postText,
		},
	},
	'stylesheet.agenda.list': {
		container: {
			flexDirection: 'column',
		},
	},
};

const CURRENT_MONTH_FORMAT = 'MMMM YYYY';
const DAY_FORMAT = 'MMM D, YYYY';
const AGENDA_ITEM_KEY_FORMAT = 'YYYY-MM-DD';

const SAMPLE_EVENTS: IEventData[] = [
	{
		title: 'Business Meeting',
		color: 'lime',
		startDate: new Date(2018, 3, 13),
		endDate: new Date(2018, 3, 14),
		allDay: false,
		startTime: new Date(2018, 3, 13, 10, 15),
		endTime: new Date(2018, 3, 14, 15, 30),
		location: 'Junior\'s Cafe',
	},
	{
		title: 'Marius birthday',
		color: 'magenta',
		startDate: new Date(2018, 3, 11),
		endDate: new Date(2018, 3, 11),
		allDay: true,
	},
	{
		title: '5FDP concert',
		color: 'cyan',
		startDate: new Date(2018, 3, 13),
		endDate: new Date(2018, 3, 13),
		allDay: false,
		startTime: new Date(2018, 3, 13, 20, 45),
		location: 'Central square',
	},
];

const getAgendaItems = (events: IEventData[]) => {
	const ret: any = {};
	events.forEach((event) => {
		const dateKey = moment(event.startDate).format(AGENDA_ITEM_KEY_FORMAT);
		const dayEvents: IEventData[] = ret.hasOwnProperty(dateKey) ? ret[dateKey] : [];
		dayEvents.push(event);
		ret[dateKey] = dayEvents;
	});
	return ret;
};

const getMarkedDates = (events: IEventData[]) => {
	const ret: any = {};
	events.forEach((event) => {
		const dateKey = moment(event.startDate).format(AGENDA_ITEM_KEY_FORMAT);
		const markedDate = ret.hasOwnProperty(dateKey) ? ret[dateKey] : {dots: []};
		markedDate.dots.push({color: event.color});
		ret[dateKey] = markedDate;
	});
	return ret;
};

const AGENDA_ITEMS = getAgendaItems(SAMPLE_EVENTS);

const MARKED_DATES = getMarkedDates(SAMPLE_EVENTS);

export default class MyEventsScreenComponent extends Component<
	IMyEventsScreenComponentProps,
	IMyEventsScreenComponentState
> {
	public state = {
		currentMonth: moment().format(CURRENT_MONTH_FORMAT),
		currentDate: moment().format(DAY_FORMAT),
	};

	private initialSelectedDate = new Date();

	public render() {
		return (
			<View style={style.container}>
				<Text style={style.currentMonthTitle}>{this.state.currentMonth}</Text>
				<Agenda
					selected={this.initialSelectedDate}
					loadItemsForMonth={this.loadItemsForMonth}
					renderItem={this.renderItem}
					rowHasChanged={this.rowHasChanged}
					items={AGENDA_ITEMS}
					renderDay={this.renderDayHandler}
					theme={AGENDA_THEME} // agenda theme
					firstDay={1}
					style={style.agenda} // agenda container style
					onDayPress={this.dayUpdatedHandler}
					markingType={'multi-dot'}
					markedDates={MARKED_DATES}
					renderEmptyData={this.renderDayWithNoEvents}
				/>
				<TouchableOpacity
					style={style.addButtonContainer}
					onPress={() => this.props.onAddNewEvent(this.state.currentDate)}
				>
					<Icon name={'ios-add'} size={Sizes.smartHorizontalScale(50)} color={Colors.white} />
				</TouchableOpacity>
			</View>
		);
	}

	private renderDayHandler = (day: IDayObject) => {
		// console.log('renderDayHandler', day);
		if (day !== undefined) {
			const dayString = moment(day.timestamp)
				.format(DAY_FORMAT)
				.toUpperCase();
			return (
				<View style={style.dayContainer}>
					<Text style={style.dayHeader}>{dayString}</Text>
				</View>
			);
		}
		return null;
	}

	private renderItem = (item, firstItemInDay) => {
		// console.log('renderItem', item, firstItemInDay);
		return (
			<View style={style.agendaItem}>
				<Text>{item.title}</Text>
			</View>
		);
	}

	private rowHasChanged = (r1, r2) => {
		// console.log('rowHasChanged', r1, r2);
		return true;
	}

	private loadItemsForMonth = (month: IDayObject) => {
		// console.log('loadItemsForMonth', month.dateString);
	}

	private dayUpdatedHandler = (day: IDayObject) => {
		this.setState({
			currentMonth: moment(day.timestamp).format(CURRENT_MONTH_FORMAT),
			currentDate: moment(day.timestamp)
				.format(DAY_FORMAT)
				.toUpperCase(),
		});
	}

	private renderDayWithNoEvents = () => {
		return (
			<View>
				<Text>{`No events for ${this.state.currentDate}`}</Text>
			</View>
		);
	}
}
