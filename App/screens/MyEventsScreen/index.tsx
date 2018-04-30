import {IEventData} from 'components/Displayers/EventListItem';
import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {IEventDetailScreenNavParams} from '../EventDetailScreen';

import MyEventsScreenComponent from './screen';

const SAMPLE_EVENTS: IEventData[] = [
	{
		title: 'Go for a coffee',
		color: 'red',
		startDate: new Date(2018, 3, 15),
		endDate: new Date(2018, 3, 15),
		allDay: false,
		startTime: new Date(2018, 3, 15, 9, 5),
	},
	{
		title: 'Business Meeting',
		color: 'lime',
		startDate: new Date(2018, 3, 16),
		endDate: new Date(2018, 3, 17),
		allDay: false,
		startTime: new Date(2018, 3, 16, 10, 15),
		endTime: new Date(2018, 3, 17, 15, 30),
		location: 'Junior\'s Cafe',
	},
	{
		title: 'Call David',
		color: 'magenta',
		startDate: new Date(2018, 3, 16),
		endDate: new Date(2018, 3, 16),
		allDay: false,
		startTime: new Date(2018, 3, 16, 10, 15),
		endTime: new Date(2018, 3, 16, 10, 45),
		location: 'Junior\'s Cafe',
	},
	{
		title: 'Luci birthday',
		color: 'yellow',
		startDate: new Date(2018, 3, 17),
		endDate: new Date(2018, 3, 17),
		allDay: true,
	},
	{
		title: '5FDP concert',
		color: 'cyan',
		startDate: new Date(2018, 5, 16),
		endDate: new Date(2018, 5, 16),
		allDay: false,
		startTime: new Date(2018, 5, 16, 20, 45),
		location: 'Central square',
	},
];

interface IMyEventsScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IMyEventsScreenState {
	eventsList: IEventData[];
}

export default class MyEventsScreen extends Component<IMyEventsScreenProps, IMyEventsScreenState> {
	private static navigationOptions = {
		title: 'EVENTS',
	};

	public state = {
		eventsList: SAMPLE_EVENTS,
	};

	public render() {
		return (
			<MyEventsScreenComponent
				onAddNewEvent={this.onAddNewEventHandler}
				events={this.state.eventsList}
				openEventDetailPage={this.openEventDetailPageHandler}
			/>
		);
	}

	private onAddNewEventHandler = (date: Date) => {
		const todayMidNight = new Date();
		todayMidNight.setHours(0, 0, 0);
		if (date < todayMidNight) {
			date = new Date();
		}
		date.setHours(0, 0, 0);
		this.props.navigation.navigate('CreateEventScreen', {date, createNewEvent: this.createNewEvent});
	}

	private createNewEvent = (eventData: IEventData) => {
		// console.log('createNewEvent', eventData); // TODO: GQL call to create the event
		this.setState({eventsList: [...this.state.eventsList, eventData]});
	}

	private openEventDetailPageHandler = (eventData: IEventData) => {
		const navParams: IEventDetailScreenNavParams = {
			eventData,
			onEventDelete: this.onEventDeleteHandler,
		};
		this.props.navigation.navigate('EventDetailScreen', navParams);
	}

	private onEventDeleteHandler = (eventData: IEventData) => {
		// console.log('onEventDeleteHandler', eventData.title); // TODO: GQL call to delete the event
	}
}
