import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {IEventData} from '../../components/Displayers/EventListItem';
import EventDetailScreenComponent from './screen';

const SAMPLE_EVENT_DATA: IEventData = {
	title: 'Business Meeting',
	color: 'purple',
	startDate: new Date(2018, 3, 15),
	endDate: new Date(2018, 3, 15),
	allDay: false,
	// startTime: new Date(2018, 3, 15, 9, 5),
	// endTime: new Date(2018, 3, 15, 20, 13),
	location: 'Junior\'s Cafe',
	description:
		'If I can make to this event I will meet with 10 old friends from college. ' +
		'We will have couple beers and exchange visit cards.',
};

export interface IEventDetailScreenNavScreenProps {
	params: {
		eventData: IEventData;
		onEventDelete: (eventData: IEventData) => void;
	};
}

export interface IEventDetailScreenProps {
	navigation: NavigationScreenProp<IEventDetailScreenNavScreenProps>;
}

export default class EventDetailScreen extends Component<IEventDetailScreenProps, any> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'EVENT DETAIL',
		headerRight: <View />,
	};

	public render() {
		return (
			<EventDetailScreenComponent
				onEventDelete={this.onEventDeleteHandler}
				// eventData={this.props.navigation.state.params.eventData}
				eventData={SAMPLE_EVENT_DATA}
			/>
		);
	}

	private onEventDeleteHandler = () => {
		this.props.navigation.goBack();
		this.props.navigation.state.params.onEventDelete(this.props.navigation.state.params.eventData);
	}
}
