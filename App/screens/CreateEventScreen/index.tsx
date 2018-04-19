import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {IModalForAddFriendsProps, withModalForAddFriends} from '../../hoc/WithModalForAddFriends';
import {SendPostButton} from '../PhotoScreen/SendPostButton';
import CreateEventScreenComponent from './screen';

export interface ICreateEventScreenProps extends IModalForAddFriendsProps {
	navigation: NavigationScreenProp<any>;
}

class CreateEventScreen extends Component<ICreateEventScreenProps, any> {
	private screenRef: CreateEventScreenComponent | null = null;

	public componentDidMount() {
		SplashScreen.close({
			// TODO: in the end delete this!
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
		this.props.navigation.setParams({onSendPress: this.createEvent});
	}

	public render() {
		return (
			<CreateEventScreenComponent
				initialDate={new Date()}
				showInviteFriendsModal={this.props.showAddFriendsModal}
				invitedFriends={this.props.addedFriends}
				ref={(ref) => (this.screenRef = ref)}
			/>
		);
	}

	private createEvent = () => {
		if (this.screenRef !== null) {
			// console.log('createEvent', this.screenRef.getEventData());
		}
	}
}

const navigationOptions = (props: ICreateEventScreenProps) => ({
	title: 'ADD EVENT',
	headerRight: <SendPostButton navParams={props.navigation.state.params} />,
});

export default withModalForAddFriends(CreateEventScreen as any, navigationOptions as any);
