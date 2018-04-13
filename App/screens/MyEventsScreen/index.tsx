import React, {Component} from 'react';
import MyEventsScreenComponent from './screen';

export default class MyEventsScreen extends Component<any, any> {
	private static navigationOptions = {
		title: 'EVENTS',
	};

	public render() {
		return <MyEventsScreenComponent onAddNewEvent={this.onAddNewEventHandler} />;
	}

	private onAddNewEventHandler = (date: string) => {
		alert('TBD: add event for date ' + date);
	}
}
