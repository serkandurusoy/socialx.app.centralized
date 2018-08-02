import React, {Component} from 'react';
import {InteractionManager} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {ScreenHeaderButton} from 'components';
import {IEventData} from 'components/Displayers/EventListItem';
import {IModalForAddFriendsProps, withModalForAddFriends} from 'hoc';
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

export default withModalForAddFriends(CreateEventScreen);
