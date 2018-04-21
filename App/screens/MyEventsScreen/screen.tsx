import isEqual from 'lodash/isEqual';
import moment from 'moment';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import XDate from 'XDate';
import {EventListItem, IEventData} from '../../components/Displayers/EventListItem';
import {Colors, Fonts, Sizes} from '../../theme/';
import style from './style';

interface IMyEventsScreenComponentProps {
	events: IEventData[];
	onAddNewEvent: (date: Date) => void;
}

interface IMyEventsScreenComponentState {
	currentMonth: string;
	currentDate: Date;
	markedDates: any[];
}

interface IDayObject {
	day: number;
	month: number;
	year: number;
	timestamp: number;
	dateString: string;
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

export default class MyEventsScreenComponent extends Component<
	IMyEventsScreenComponentProps,
	IMyEventsScreenComponentState
> {
	public static getDerivedStateFromProps(nextProps: Readonly<IMyEventsScreenComponentProps>) {
		return {
			markedDates: MyEventsScreenComponent.getMarkedDates(nextProps.events),
		};
	}

	private static getMarkedDates(events: IEventData[]) {
		const ret: any = {};
		events.forEach((event) => {
			const dateKey = moment(event.startDate).format(AGENDA_ITEM_KEY_FORMAT);
			const markedDate = ret.hasOwnProperty(dateKey) ? ret[dateKey] : {dots: []};
			markedDate.dots.push({color: event.color});
			ret[dateKey] = markedDate;
		});
		return ret;
	}

	public state = {
		currentMonth: moment().format(CURRENT_MONTH_FORMAT),
		currentDate: new Date(),
		markedDates: MyEventsScreenComponent.getMarkedDates(this.props.events),
	};

	private initialSelectedDate = moment().format(AGENDA_ITEM_KEY_FORMAT);

	public render() {
		const agendaItems = this.getAgendaItems(this.props.events, this.state.currentDate);
		return (
			<View style={style.container}>
				<Text style={style.currentMonthTitle}>{this.state.currentMonth}</Text>
				<Agenda
					selected={this.initialSelectedDate}
					loadItemsForMonth={this.loadItemsForMonth}
					renderItem={this.renderItem}
					rowHasChanged={this.rowHasChanged}
					items={agendaItems}
					renderDay={this.renderDayHandler}
					theme={AGENDA_THEME} // agenda theme
					firstDay={1}
					style={style.agenda} // agenda container style
					onDayPress={this.dayUpdatedHandler}
					markingType={'multi-dot'}
					markedDates={this.state.markedDates}
					renderEmptyDate={this.renderEmptyDateHandler}
					renderKnob={this.renderKnobHandler}
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
		if (day !== undefined) {
			const dayString =
				this.getDayTextPrefix(day) +
				moment(day.timestamp)
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

	private renderItem = (item: IEventData) => {
		return <EventListItem {...item} />;
	}

	private renderEmptyDateHandler = (day: XDate) => {
		return (
			<View>
				<Text style={style.noEventsText}>{'No events'}</Text>
			</View>
		);
	}

	private renderKnobHandler = () => {
		return (
			<View style={style.knobContainer}>
				<Icon name={'ios-arrow-down'} size={Sizes.smartHorizontalScale(20)} color={Colors.postText} />
			</View>
		);
	}

	private rowHasChanged = (firstItem: IEventData, secondItem: IEventData) => {
		return !isEqual(firstItem, secondItem);
	}

	private loadItemsForMonth = (month: IDayObject) => {
		// console.log('loadItemsForMonth', month.dateString);
	}

	private dayUpdatedHandler = (day: IDayObject) => {
		this.setState({
			currentMonth: moment(day.timestamp).format(CURRENT_MONTH_FORMAT),
			currentDate: new Date(day.timestamp),
		});
	}

	private getDayTextPrefix = (day: IDayObject) => {
		const today = moment()
			.endOf('day')
			.unix();
		const tomorrow = moment()
			.add(1, 'day')
			.endOf('day')
			.unix();
		const yesterday = moment()
			.add(-1, 'day')
			.endOf('day')
			.unix();
		const currentDate = moment(day.timestamp)
			.endOf('day')
			.unix();
		let ret = '';
		if (currentDate === today) {
			ret = 'TODAY, ';
		} else if (currentDate === tomorrow) {
			ret = 'TOMORROW, ';
		} else if (currentDate === yesterday) {
			ret = 'YESTERDAY, ';
		}
		return ret;
	}

	private getAgendaItems = (events: IEventData[], currentDate: Date) => {
		const ret: any = {};
		events.forEach((event) => {
			const dateKey = moment(event.startDate).format(AGENDA_ITEM_KEY_FORMAT);
			const dayEvents: IEventData[] = ret.hasOwnProperty(dateKey) ? ret[dateKey] : [];
			dayEvents.push(event);
			ret[dateKey] = dayEvents;
		});
		const currentDateWithFormat = moment(currentDate).format(AGENDA_ITEM_KEY_FORMAT);
		if (!ret.hasOwnProperty(currentDateWithFormat)) {
			ret[currentDateWithFormat] = [];
		}
		return ret;
	}
}
