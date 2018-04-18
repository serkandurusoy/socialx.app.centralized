import React, {Component} from 'react';
import {IEventData} from '../../components/Displayers/EventListItem';
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

export default class MyEventsScreen extends Component {
	private static navigationOptions = {
		title: 'EVENTS',
	};

	public render() {
		return <MyEventsScreenComponent onAddNewEvent={this.onAddNewEventHandler} events={SAMPLE_EVENTS} />;
	}

	private onAddNewEventHandler = (date: Date) => {
		alert('TBD: add event for date ' + date);
	}
}
