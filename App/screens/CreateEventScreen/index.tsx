import React, {Component} from 'react';
import {InteractionManager} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {ScreenHeaderButton} from 'components';
import {IEventData} from 'components/Displayers/EventListItem';
import {WithModalForAddFriends} from 'hoc';
import CreateEventScreenComponent from './screen';

export interface ICreateEventScreenNavScreenProps {
	params: {
		date: Date;
		createNewEvent: (eventData: IEventData) => void;
		onSendPress: () => void;
	};
}

export interface ICreateEventScreenProps {
	navigation: NavigationScreenProp<ICreateEventScreenNavScreenProps>;
}

export default class CreateEventScreen extends Component<ICreateEventScreenProps, any> {
	private static navigationOptions = (props: ICreateEventScreenProps) => ({
		title: 'ADD EVENT',
		headerRight: <ScreenHeaderButton iconName={'md-checkmark'} onPress={props.navigation.state.params.onSendPress} />,
	});

	private screenRef: CreateEventScreenComponent | null = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.createEvent});
		});
	}

	public render() {
		return (
			<WithModalForAddFriends>
				{({showAddFriendsModal, addedFriends}) => (
					<CreateEventScreenComponent
						initialDate={this.props.navigation.state.params.date}
						showInviteFriendsModal={showAddFriendsModal}
						invitedFriends={addedFriends}
						ref={(ref) => (this.screenRef = ref)}
					/>
				)}
			</WithModalForAddFriends>
		);
	}

	private createEvent = () => {
		if (this.screenRef !== null) {
			this.props.navigation.state.params.createNewEvent(this.screenRef.getEventData());
			this.props.navigation.goBack();
		}
	};
}
