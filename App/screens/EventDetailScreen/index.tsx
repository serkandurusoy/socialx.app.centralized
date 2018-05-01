import {IEventData} from 'components/Displayers/EventListItem';
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {EventDetailScreenComponent} from './screen';

export interface IEventDetailScreenNavParams {
	eventData: IEventData;
	onEventDelete: (eventData: IEventData) => void;
}

interface IEventDetailScreenNavScreenProps {
	params: IEventDetailScreenNavParams;
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
				eventData={this.props.navigation.state.params.eventData}
			/>
		);
	}

	private onEventDeleteHandler = () => {
		this.props.navigation.goBack();
		this.props.navigation.state.params.onEventDelete(this.props.navigation.state.params.eventData);
	}
}
