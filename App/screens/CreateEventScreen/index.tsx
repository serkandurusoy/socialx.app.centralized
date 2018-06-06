import {IEventData} from 'components/Displayers/EventListItem';
import {IModalForAddFriendsProps, withModalForAddFriends} from 'hoc/WithModalForAddFriends';
import React, {Component} from 'react';
import {Image, InteractionManager, Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {SendPostButton} from '../PhotoScreen/SendPostButton';
import CreateEventScreenComponent from './screen';

export interface ICreateEventScreenNavScreenProps {
	params: {
		date: Date;
		createNewEvent: (eventData: IEventData) => void;
		onSendPress: () => void;
	};
}

export interface ICreateEventScreenProps extends IModalForAddFriendsProps {
	navigation: NavigationScreenProp<ICreateEventScreenNavScreenProps>;
}

class CreateEventScreen extends Component<ICreateEventScreenProps, any> {
	private screenRef: CreateEventScreenComponent | null = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.createEvent});
		});
	}

	public render() {
		return (
			<CreateEventScreenComponent
				initialDate={this.props.navigation.state.params.date}
				showInviteFriendsModal={this.props.showAddFriendsModal}
				invitedFriends={this.props.addedFriends}
				ref={(ref) => (this.screenRef = ref)}
			/>
		);
	}

	private createEvent = () => {
		if (this.screenRef !== null) {
			this.props.navigation.state.params.createNewEvent(this.screenRef.getEventData());
			this.props.navigation.goBack();
		}
	};
}

const navigationOptions = (props: ICreateEventScreenProps) => ({
	title: 'ADD EVENT',
	headerRight: <SendPostButton navParams={props.navigation.state.params} />,
});

export default withModalForAddFriends(CreateEventScreen as any, navigationOptions as any);
